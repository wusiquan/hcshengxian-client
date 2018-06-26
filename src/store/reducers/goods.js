import { combineReducers } from 'redux'
import produce from 'immer'
import { handleAction, handleActions } from 'redux-actions'
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
    // [actionTypes.requestGoodsInCategory]: (state, action) => {
    //   return produce(state, draft => {
    //     draft.isFetching = true
    //   })
    // },
    [actionTypes.resolveGoodsInCategory]: (state, action) => {
      return produce(state, draft => {
        let payload = action.payload
        draft.goodsList = payload.goods
        // payload.goods.forEach((goods) => {
        //   draft.goodsList.push(goods)
        // })
        draft.isLoaded = true
      })
    }
  },
  {
    goodsList: [],
    isLoading: false,
    isLoaded: false
  }
)

const goodsInCateReducer = function(state, action) {
  return produce(state, draft => {
    let payload = action.payload
    let categoryId = payload.categoryId.toString()
    draft[categoryId] = goods(state[categoryId], action)
  })
}

const goodsInCategory = handleActions(
  // combineActions(actionTypes.requestGoodsInCategory, actionTypes.addGoodsInCategory)
  {
    [actionTypes.resolveGoodsInCategory]: goodsInCateReducer
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