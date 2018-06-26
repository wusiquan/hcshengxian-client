import wepy from 'wepy'
import { baseUrl } from './config'
import Request from 'utils/request'

export default class Shop {
  // static getMenu() {
  //   const menuUrl = `${baseUrl}/v1/menu`
  //   const getMenu = Request.get(menuUrl)
  //   return getMenu().then((data) => {
  //     return data
  //   })
  // }
  
  // 获取商品类别及首屏类别的商品列表
  static getCategories(data = null) {
    const url = baseUrl + '/v1/category'
    return (Request.get(url))(data).then((resData) => {
      return resData
    })
  }

  // 获取某商品类别下对应的商品列表
  static getGoodsInCate(categoryId, data = null) {
    const url = baseUrl + '/v1/category/' + categoryId
    return (Request.get(url))(data).then((resData) => {
      return resData
    })
  }
}