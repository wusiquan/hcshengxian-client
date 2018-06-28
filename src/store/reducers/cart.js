import { combineReducers } from 'redux' 
import produce from 'immer'
import { handleAction, handleActions } from 'redux-actions'
import actionTypes from '../actiontypes'
import initialState from './initstate'

// export const goodsInCart = handleAction(
//   actionTypes.addItemToCart,
//   (state, action) => {
//     return produce(state, draft => {
//       let payload = action.payload
//       console.log('--->', payload)
//     }
//   },
//   cart
// )

// const goodsInCart = function(state = {}, action) {
//   let payload = action.payload
//   let goodsId = payload.goodsId
//   let count = 1
//   if (state[goodsId]) {
//     count = state[goodsId].count + 1
//   }

//   return {
//     ...state,
//     [goodsId]: {
//       goodsId: count
//     }
//   }
// }

const subtractItem = function(state, goodsId) {
  return produce(state, draft => {
    let goods = draft[goodsId]
    if (goods) {
      if (goods.count > 1) {
        draft[goodsId].count -= 1
      } else {
        delete draft[goodsId]
      }
    }
  })
}

const addItem = function(state, goodsId) {
  return produce(state, draft => {
    if (draft[goodsId]) {
      draft[goodsId].count += 1
    } else {
      draft[goodsId] = { goodsId: goodsId, count: 1 }
    }
  })
}

const createItemReducer = function(helperFunction) {
  return (state, action) => {
    let payload = action.payload
    let goodsId = payload.goodsId

    return helperFunction(state, goodsId)
  }
}

const goodsInCart = handleActions(
  {
    [actionTypes.addItemToCart]: createItemReducer(addItem),
    [actionTypes.subtractItemFromCart]: createItemReducer(subtractItem)
    // 原先的代码， 想加一个subtract都感觉不知道，如何重用...
    // (state, action) => {
    //   return produce(state, draft => {
    //     let payload = action.payload
    //     let goodsId = payload.goodsId
    //     let goodsInCart = draft.goodsInCart

    //     if (!goodsInCart) {
    //       draft.goodsInCart = goodsInCart = {}
    //     }
        
    //     if (goodsInCart[goodsId]) {
    //       goodsInCart[goodsId].count += 1
    //     } else {
    //       goodsInCart[goodsId] = { goodsId: goodsId, count: 1 }
    //     }
    //   })
    // },
    // 
  },
  {}
)

export const cart = combineReducers({
  goodsInCart
})

export const getGoodsInCart = function(state) {
  return state.goodsInCart
}