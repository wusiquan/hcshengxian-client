import { combineReducers } from 'redux'
import produce from 'immer'
import { handleAction, handleActions, combineActions } from 'redux-actions'
import actionTypes from '../actiontypes'
import initialState from './initstate'
import { createSelector } from 'reselect'
// export function goodsInCategory(state = initialState.goodsInCategory, action) {
//   return produce(state, draft => {
//     if (action.type === actionTypes.addGoodsInCategory) {
//       let goodsList = action.goodsList
//       let categoryId = action.categoryId.toString()
//       draft[categoryId] = goodsList
//     }
//   })
// }

const goodsInCategory = handleActions(
  {
    [actionTypes.requestGoodsInCategory]: (state, action) => {
      return produce(state, draft => {
        draft.isLoading = true
      })
    },
    [actionTypes.resolveGoodsInCategory]: (state, action) => {
      return produce(state, draft => {
        let payload = action.payload
        payload.goods.forEach((goodsItem) => {
          draft.goodsIds.push(goodsItem.goodsid)
        })
        draft.isLoading = false
      })
    }
  },
  {
    goodsIds: [],
    isLoading: false
  }
)

const allGoods = handleAction(actionTypes.resolveGoodsInCategory, (state, action) => {
  return produce(state, draft => {
    let payload = action.payload
    payload.goods.forEach((goods) => {
      if (!draft[goods.goodsid]) {
        draft[goods.goodsid] = goods
      }
    })
  })
}, {})

// export reducer
export const goods = handleAction(
  combineActions(actionTypes.requestGoodsInCategory, actionTypes.resolveGoodsInCategory),
  (state, action) => {
    return produce(state, draft => {
      let payload = action.payload
      let categoryId = payload.categoryId.toString()
      draft.goodsInCategory[categoryId] = goodsInCategory(state[categoryId], action)
      draft.allGoods = allGoods(state.allGoods, action)
    })
  },
  initialState.goods
)

// selectors
const getGoodsInCategory = (state, categoryId) => {
  return state.goodsInCategory && state.goodsInCategory[categoryId]
}

const getAllGoods = (state) => {
  return state.allGoods
}

export const getGoodsLoading = createSelector(
  getGoodsInCategory,
  (goodsInCategory) => {
    if (goodsInCategory) {
      return goodsInCategory.isLoading
    }
  }
)

export const getGoodsListInCategory = createSelector(
  [getGoodsInCategory, getAllGoods],
  (goodsInCategory, allGoods) => {
    if (goodsInCategory) {
      let goodsIds = goodsInCategory.goodsIds
      return goodsIds.map((goodsId) => {
        return allGoods[goodsId]
      })
    }
  }
)

