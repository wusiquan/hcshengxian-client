
// action types
export const actionTypes = {
  editLocaiton: 'EDIT_ADDR_LOCATION',
  getUA: 'GET_UA',
  // 添加一件货物进货物车
  addItemToCart: 'ADD_Item_TO_CART',
  // 添加goods(多个)进类别
  addGoodsToCategory: 'ADD_GOODS_TO_CATEGORY'
}

// action creator
export const editAddrLocaiton = text => {
  return {
    type: actionTypes.addrLocaiton,
    text
  }
}

export const getUA = (system) => {
  return {
    type: actionTypes.getUA,
    system
  }
}

export const addGoodsToCategory = (categoryId, goodsList) => {
  return {
    type: actionTypes.addGoodsToCategory,
    categoryId,
    goodsList
  }
}

export const addItemToCart = (item) => {
  return {
    type: actionTypes.addItemToCart,
    item
  }
}