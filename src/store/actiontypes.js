// action types
const actionTypes = {
  editLocaiton: 'EDIT_ADDR_LOCATION',
  getUA: 'GET_UA',
  // --- shop ---
  requestCategories: 'REQUEST_CATEGORIES',
  resolveCategories: 'RESOLVE_CATEGORIES',
  chooseCategoryId: 'CHOOSE_CATEGORYID',

  requestGoodsInCategory: 'REQUEST_GOODS_IN_CATEGORY',
  // 请求成功，添加商品在某个类别
  resolveGoodsInCategory: 'RESOLVE_GOODS_IN_CATEGORY',

  // --- cart ---
  // 添加一件货物进货物车
  addItemToCart: 'ADD_Item_TO_CART'
}

export default actionTypes