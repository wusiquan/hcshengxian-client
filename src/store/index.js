// redux-thunk redux-promise-middleware redux-logger reselect
import { createStore, applyMiddleware } from 'redux'
import { setStore, getStore } from 'wepy-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
// TODO: 非生产环境
import { createLogger } from 'redux-logger'


// actions
export * from './actions'

//  TODO: 其实官方不推荐这样，除非你确定你不会用到redux的server render
// https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559
export const rawStore = createStore(
  rootReducer,
  applyMiddleware(thunk, createLogger())
)

setStore(rawStore)

export const store = getStore()