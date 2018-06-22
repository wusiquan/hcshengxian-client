// redux-thunk redux-promise-middleware redux-logger reselect
import { createStore, combineReducers } from 'redux'
import { 
  getUA,
  addGoodsToCategory
} from './actions'
import {
  ua,
  goodsInCategory
} from './reducers'

/*
addresList

address
{
  location: ''
  ...
}
*/
export {
  getUA,
  addGoodsToCategory
}
export const store = createStore(
  combineReducers({
    ua,
    goodsInCategory
  })
)

