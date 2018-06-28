import actionTypes from '../actiontypes'
import { createAction } from 'redux-actions'

// +1
export const addItemToCart = createAction(actionTypes.addItemToCart, (goodsId) => {
  return {
    goodsId
  }
})

// -1
export const subtractItemFromCart = createAction(actionTypes.subtractItemFromCart, (goodsId) => {
  return {
    goodsId
  }
})