import produce from 'immer'
import { actionTypes } from './actions'

const initialState = {
  useragent: {},
  // 购物车中商品列表
  goodsInCart: [
    // goods
    // { id: xx, name: xx }
  ],

  goodsInCategory: {
    // 
  }
}

// reducer 命名几乎与initialState中键一致
export function ua(state = initialState.useragent, action) {
  return produce(state, draft => {
    if (action.type === actionTypes.getUA) {
      let system = action.system
      draft.system = system 
    }
  })
}

// export function goodsInCart(state = initialState.goodsInCart, action) {
//   return produce(state, draft => {
//     if (action.type === actionTypes.addItemToCart) {
//       let item = action.item
//       draft.push(item)
//     }
//   })
// }

export function goodsInCategory(state = initialState.goodsInCategory, action) {
  return produce(state, draft => {
    if (action.type === actionTypes.addGoodsToCategory) {
      let goodsList = action.goodsList
      let categoryId = action.categoryId.toString()
      draft[categoryId] = goodsList
    }
  })
}