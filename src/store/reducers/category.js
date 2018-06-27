import produce from 'immer'
import { handleAction, handleActions } from 'redux-actions'
import actionTypes from '../actiontypes'
import initialState from './initstate'
// import { createSelector } from 'reselect'

export const categories = handleActions(
  {
    [actionTypes.requestCategories]: (state, action) => {
      return produce(state, (draft) => {
        draft.isLoading = true
      })
    },
    [actionTypes.resolveCategories]: (state, action) => {
      return produce(state, (draft) => {
        let { payload } = action
        draft.isLoaded = true
        draft.cates = payload.cates
      })
    }
  },
  initialState.categoris
)

// 当前商品类别id
export const activeCategoryId = handleAction(
  actionTypes.chooseCategoryId,
  // 由于initialState.activeCategoryId是一个基本值，直接返回了
  (state, action) => {
    let { payload } = action
    return payload.categoryId
  },
  initialState.activeCategoryId
)

// --- selectors ---
export const getCateLoading = (state) => {
  return state.isLoading
}

export const getCateLoaded = (state) => {
  return state.isLoaded
}

export const getCates = (state) => {
  return state.cates
}