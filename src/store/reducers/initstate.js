/*
addresList

address
{
  location: ''
  ...
}
*/
const initialState = {
  useragent: {},
  // 购物车中商品列表
  goodsInCart: [

  ],

  goodsInCategory: {
    // [categoryId]: { 
    //   goodsList: [id: xx, name: xx], 
    //   isLoading: false, 
    //   isLoaded: false
    // }
  },
  activeCategoryId: null,
  
  categoris: {
    isLoaded: false,
    isLoading: false,
    cates: []
  }
}

export default initialState