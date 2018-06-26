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

// export const addGoodsInCategory = (categoryId, goods) => {
//   return {
//     type: actionTypes.addGoodsInCategory,
//     categoryId,
//     goods
//   }
// }

const fetchGoodsInCate = (categoryId) => {
  return async function(dispatch) {
    dispatch(requestGoodsInCategory(categoryId))
    let resData = await Shop.getGoodsInCate(categoryId)

    // 对数据稍加处理
    resData.goods.forEach((goods) => {
      if (goods.original_price && goods.price && goods.price !== goods.original_price) {
        let discount = (goods.price / goods.original_price) * 10
        goods.discount = discount.toFixed(1)
      }
    })
    setTimeout(function() {
      dispatch(resolveGoodsInCategory(categoryId, resData.goods))
    }, 5000)
  }
}

const shouldFetchGoodsInCate = (state, categoryId) => {
  let goodsList = state.goodsInCategory[categoryId]
  
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