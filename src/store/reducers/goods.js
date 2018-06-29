import { combineReducers } from 'redux'
import produce from 'immer'
import { handleAction, handleActions, combineActions } from 'redux-actions'
import actionTypes from '../actiontypes'
import initialState from './initstate'
import { createSelector } from 'reselect'

// 最开始的reducer写法
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
        draft.isLoaded = true
      })
    }
  },
  {
    goodsIds: [],
    isLoading: false,
    isLoaded: false
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
      // 这时state.goodsInCategory[categoryId] 不是为 undefined 吗?
      draft.goodsInCategory[categoryId] = goodsInCategory(state.goodsInCategory[categoryId], action)
      draft.allGoods = allGoods(state.allGoods, action)
    })
  },
  initialState.goods
)

// selectors
const getGoodsStateInCategory = (state, categoryId) => {
  return state.goodsInCategory && state.goodsInCategory[categoryId]
}

const getAllGoods = (state) => {
  return state.allGoods
}

export const getGoodsListLoading = createSelector(
  getGoodsStateInCategory,
  (goodsStateInCategory) => {
    if (goodsStateInCategory) {
      return goodsStateInCategory.isLoading
    }
  }
)

export const getGoodsListLoaded = createSelector(
  getGoodsStateInCategory,
  (goodsStateInCategory) => {
    if (goodsStateInCategory) {
      return goodsStateInCategory.isLoaded
    }
  }
)

export const getGoodsListInCategory = createSelector(
  [getGoodsStateInCategory, getAllGoods],
  (goodsStateInCategory, allGoods) => {
    if (goodsStateInCategory) {
      let goodsIds = goodsStateInCategory.goodsIds
      return goodsIds.map((goodsId) => {
        return allGoods[goodsId]
      })
    }
  }
)

