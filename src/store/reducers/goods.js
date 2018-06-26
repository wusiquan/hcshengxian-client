import { combineReducers } from 'redux'
import produce from 'immer'
import { handleAction, handleActions, combineActions } from 'redux-actions'
import actionTypes from '../actiontypes'
import initialState from './initstate'

// export function goodsInCategory(state = initialState.goodsInCategory, action) {
//   return produce(state, draft => {
//     if (action.type === actionTypes.addGoodsInCategory) {
//       let goodsList = action.goodsList
//       let categoryId = action.categoryId.toString()
//       draft[categoryId] = goodsList
//     }
//   })
// }

const goods = handleActions(
  {
    [actionTypes.requestGoodsInCategory]: (state, action) => {
      return produce(state, draft => {
        draft.isLoading = true
      })
    },
    [actionTypes.resolveGoodsInCategory]: (state, action) => {
      return produce(state, draft => {
        let payload = action.payload
        draft.goodsList = payload.goods
        // payload.goods.forEach((goods) => {
        //   draft.goodsList.push(goods)
        // })
        draft.isLoading = false
      })
    }
  },
  {
    goodsList: [],
    isLoading: false
  }
)

const goodsInCategory = handleAction(
  combineActions(actionTypes.requestGoodsInCategory, actionTypes.resolveGoodsInCategory),
  (state, action) => {
    return produce(state, draft => {
      let payload = action.payload
      let categoryId = payload.categoryId.toString()
      draft[categoryId] = goods(state[categoryId], action)
    })
  },
  initialState.goodsInCategory
)

// export reducers
export {
  goodsInCategory
}

// export selectors
export const getGoodsListInCategory = (state, categoryId) => {
  return state[categoryId] && state[categoryId].goodsList
}

export const getGoodsLoading = (state, categoryId) => {
  return state[categoryId] && state[categoryId].isLoading
}