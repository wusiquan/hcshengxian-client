import actionTypes from '../actiontypes'
import { createAction } from 'redux-actions'
import Shop from 'api/shop'
import { addGoodsInCate } from './goods'

const requestCategories = createAction(actionTypes.requestCategories)
const resolveCategories = createAction(actionTypes.resolveCategories, (categories) => {
  return {
    cates: categories
  }
})

export const selectCategoryId = createAction(actionTypes.selectCategoryId, (categoryId) => {
  return {
    categoryId: categoryId
  }
})

export const fetchCategories = () => {
  return async function(dispatch) {
    dispatch(requestCategories())
    let resData = await Shop.getCategories()
    let firstCategory = resData[0]
    
    // TODO: 其实只要cate去除goods即可, functional?
    let cates = resData.map((cate) => {
      return {
        id: cate.id,
        name: cate.name,
        icon_url: cate.icon_url
      }
    })
    dispatch(resolveCategories(cates))
    // 至少得有一个类别，不然开什么店。。。
    dispatch(selectCategoryId(firstCategory.id))
    dispatch(addGoodsInCate(firstCategory.id, firstCategory.goods))
  }
}

