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
  
  activeCategoryId: null,
  
  categoris: {
    isLoaded: false,
    isLoading: false,
    // ?换成id形式对象更好? 感觉暂时没必要
    cates: null
  },

  goods: {
    // 类别中的商品 其实感觉放categories里更好些吧
    goodsInCategory: {
      // [categoryId]: {
      //   goodsIds: ["id1", "id2"], 
      //   isLoading: false, 加载中, 将其设为true, 
      //   isLoaded: false   加载完成, 将其设为true
      // }
    },

    allGoods: {
      // [goodsId]: {
      // 
      // }
    }
  },

  // 购物车中商品列表
  cart: {
    // goodsInCart: {
    //   [goodsId]: { goodsid, count }
    // }
    
    // goodsIds: []
  }
}

export default initialState