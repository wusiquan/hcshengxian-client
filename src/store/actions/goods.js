import actionTypes from '../actiontypes'
import { createAction } from 'redux-actions'
import Shop from 'api/shop'

const requestGoodsInCategory = createAction(actionTypes.requestGoodsInCategory, (categoryId) => {
  return {
    categoryId
  }
})

// 首屏商品直接添进分类，所以需要export给actions/category.js
export const resolveGoodsInCategory = createAction(actionTypes.resolveGoodsInCategory, (categoryId, goods) => {
  return {
    categoryId,
    goods
  }
})

const fetchGoodsInCate = (categoryId) => {
  return async function(dispatch) {
    dispatch(requestGoodsInCategory(categoryId))
    let resData = await Shop.getGoodsInCate(categoryId)

    // 对数据稍加处理
    resData.goods.forEach((goodsItem) => {
      let { original_price, price } = goodsItem
      if (original_price && price && price !== original_price) {
        let discount = (price / original_price) * 10
        goodsItem.discount = discount.toFixed(1)
      }
    })
    setTimeout(function() {
      dispatch(resolveGoodsInCategory(categoryId, resData.goods))
    }, 5000)
  }
}

const shouldFetchGoodsInCate = (state, categoryId) => {
  let goodsList = state.goods.goodsInCategory[categoryId]
  
  if (!goodsList) {
    return true
  }
  
  // 其实可以给goodList加状态，比如是否正在请求isFetching, 需要重新加载即让之前的goodsList失效didValidate...
  return false
}

export const fetchGoodsInCateIfNeeded = (categoryId) => {
  return (dispatch, getState) => {
    if (shouldFetchGoodsInCate(getState(), categoryId)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchGoodsInCate(categoryId))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}