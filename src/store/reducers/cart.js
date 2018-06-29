import { combineReducers } from 'redux'
import produce from 'immer'
import { handleActions } from 'redux-actions'
import actionTypes from '../actiontypes'
import { createSelector } from 'reselect'


const subtractItem = function(state, action) {
  return produce(state, draft => {
    let payload = action.payload
    let goodsId = payload.goodsId
    let goods = state[goodsId]
    if (goods) {
      if (goods.count > 1) {
        draft[goodsId].count -= 1
      } else {
        delete draft[goodsId]
      }
    }
  })
}

const addItem = function(state, action) {
  return produce(state, draft => {
    let payload = action.payload
    let goodsId = payload.goodsId
    if (state[goodsId]) {
      draft[goodsId].count += 1
    } else {
      draft[goodsId] = { count: 1 }
    }
  })
}

const goodsInCart = handleActions(
  {
    [actionTypes.addItemToCart]: addItem,
    [actionTypes.subtractItemFromCart]: subtractItem
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
  }, {})

// const addGoodsId = function(state, action, goodsInCartState) {
//   return produce(state, draft => {
//     let payload = action.payload
//     let goodsId = payload.goodsId
//     if (goodsInCartState[goodsId].count == 1) {
//       draft.push(goodsId)
//     }
//   })
// }

// const removeGoodsId = function(state, action, goodsInCartState) {
//   return produce(state, draft => {
//     let payload = action.payload
//     let goodsId = payload.goodsId
//     if (!goodsInCartState[goodsId]) {
//       let index = state.indexOf(goodsId)
//       draft.splice(index, 1)
//     }
//   })
// }

// const goodsIds = function(state = [], action, goodsInCartState) {
//   switch(action.type) {
//     case actionTypes.addItemToCart:
//       return addGoodsId(state, action, goodsInCartState)
//       break;
//     case actionTypes.subtractItemFromCart:
//     return removeGoodsId(state, action, goodsInCartState)
//       break;
//     default:
//       return state
//   }
// }

// 演示一波, 从不同的reducer分支取数据
// export const cart = function(state = {}, action) {
//   let goodsInCartState = goodsInCart(state.goodsInCart, action)
//   let goodsIdsState = goodsIds(state.goodsIds, action, goodsInCartState)
//   return {
//     goodsInCart: goodsInCartState,
//     goodsIds: goodsIdsState
//   }
// }


export const cart = combineReducers({
  goodsInCart
})

export const getGoodsInCart = function(state) {
  return state.goodsInCart
}

// FIXME: 为了它，搞一个goodsIds的reducer没什么必要，直接用computed derived data即可
export const getGoodsInCartIds = function(state) {
  return Object.keys(state.goodsInCart)
}

export const getGoodsTotalInCart = createSelector(
  getGoodsInCart,
  (goodsInCart) => {
    let totalNum = 0
    for(let goodsId in goodsInCart) {
      totalNum += goodsInCart[goodsId].count
    }
    return totalNum
  }
)