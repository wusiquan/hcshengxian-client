import { store, actionTypes } from 'store/index'

let { ua } = store.getState()
let system = ua.system
if (!system) {
  let systemInfo = wx.getSystemInfoSync()
  system = systemInfo.system
  store.dispatch({
    type: actionTypes.getUA,
    system: system
  })
}
const isIOS = (system && /iphone|ipad|ipod|ios/i.test(system))


function noop() {}

const callbacks = []
let pending = false

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
let microTimerFunc
let macroTimerFunc
let useMacroTask = false

macroTimerFunc = () => {
  setTimeout(flushCallbacks, 0)
}

const p = Promise.resolve()
microTimerFunc = () => {
  p.then(flushCallbacks)
  // in problematic UIWebViews, Promise.then doesn't completely break, but
  // it can get stuck in a weird state where callbacks are pushed into the
  // microtask queue but the queue isn't being flushed, until the browser
  // needs to do some other work, e.g. handle a timer. Therefore we can
  // "force" the microtask queue to be flushed by adding an empty timer.
  if (isIOS) setTimeout(noop)
}


/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true
    const res = fn.apply(null, arguments)
    useMacroTask = false
    return res
  })
}

function nextTick (cb, ctx) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        console.error('nextTick error')
        // handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

export default nextTick