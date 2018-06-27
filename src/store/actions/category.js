import actionTypes from '../actiontypes'
import { createAction } from 'redux-actions'
import Shop from 'api/shop'
import { resolveGoodsInCategory } from './goods'

const requestCategories = createAction(actionTypes.requestCategories)
const resolveCategories = createAction(actionTypes.resolveCategories, (categories) => {
  return {
    cates: categories
  }
})

export const chooseCategoryId = createAction(actionTypes.chooseCategoryId, (categoryId) => {
  return {
    categoryId: categoryId
  }
})

export const fetchCategories = () => {
  return async function(dispatch) {
    dispatch(requestCategories())
    let resData = await Shop.getCategories()
    let firstCategory = resData[0]
    
    // TODO: 其实只要cate去掉goods即可, delete?functional?
    let cates = resData.map((cate) => {
      return {
        categoryid: cate.categoryid,
        name: cate.name,
        icon_url: cate.icon_url
      }
    })
    dispatch(resolveCategories(cates))
    // 至少得有一个类别，不然开什么店。。。
    dispatch(chooseCategoryId(firstCategory.categoryid))
    dispatch(resolveGoodsInCategory(firstCategory.categoryid, firstCategory.goods))
  }
}

