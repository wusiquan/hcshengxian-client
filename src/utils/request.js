import wepy from 'wepy'

function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  }
}

// function curry(fn, arity = fn.length) {
//   return (function nextCurried(prevArgs) {
//     return function curried(...nextArg) {
//       var args = [...prevArgs, ...nextArg];

//       if (args.length >= arity) {
//         return fn(...args);
//       } else {
//         return nextCurried(args);
//       }
//     };
//   })([]);
// }

export default class Request {
  static get(url) {
    return partial(Request.request, 'GET', url)
  }
  
  static async request(method, url, data) {
    const param = {
      url: url,
      method: method
    }
    if (data) {
      param.data = data
    }
    console.info(`[http]request url=${url}`)
    let res = await wepy.request(param)
    
    if (Request.isSuccess(res)) {
      return res.data.data
    } else {
      Request.requestException(res)
    }
  }

  /**
   * 判断请求是否成功
   */
  static isSuccess(res) {
    const wxCode = res.statusCode
    // 微信请求错误
    if (wxCode !== 200) {
      return false
    }
    const serverData = res.data
    return serverData && serverData.code === 0
  }

  /**
   * 异常
   */
  static requestException(res) {
    const error = {}
    error.wxStatusCode = res.statusCode
    error.wxMessage = res.message
    const wxData = res.data
    const serverData = wxData.data
    if (serverData) {
      error.serverCode = serverData.code
      error.message = serverData.message
      error.serverData = serverData
    }
    // 暂时直接抛出错误
    throw error
  }
}
