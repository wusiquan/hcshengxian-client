import { combineReducers } from 'redux'
import * as fromCategory from './category'
import * as fromGoods from './goods'
import * as fromCart from './cart'

// reducer 命名几乎与initialState中键一致
// export function ua(state = initialState.useragent, action) {
//   return produce(state, draft => {
//     if (action.type === actionTypes.getUA) {
//       let system = action.system
//       draft.system = system 
//     }
//   })
// }

// export function goodsInCart(state = initialState.goodsInCart, action) {
//   return produce(state, draft => {
//     if (action.type === actionTypes.addItemToCart) {
//       let item = action.item
//       draft.push(item)
//     }
//   })
// }

const rootReducer = combineReducers({
  // ua,
  activeCategoryId: fromCategory.activeCategoryId,
  categories: fromCategory.categories,
  goods: fromGoods.goods,
  cart: fromCart.cart
})

// export selectors...
export const getActiveCategoryId = state => state.activeCategoryId

// fromCategory
export const getCateLoading = state => fromCategory.getCateLoading(state.categories)
export const getCateLoaded = state => fromCategory.getCateLoaded(state.categories)
export const getCategories = state => fromCategory.getCates(state.categories)

// fromGoods
export const getGoodsListInCategory = (state, categoryId) => {
  return fromGoods.getGoodsListInCategory(state.goods, categoryId)
}
export const getGoodsListLoading = (state, categoryId) => fromGoods.getGoodsListLoading(state.goods, categoryId)
export const getGoodsListLoaded = (state, categoryId) => fromGoods.getGoodsListLoaded(state.goods, categoryId)

// fromCart
export const getGoodsInCart = state => fromCart.getGoodsInCart(state.cart)
export const getGoodsInCartIds = state => fromCart.getGoodsInCartIds(state.cart)
export const getGoodsTotalInCart = state => fromCart.getGoodsTotalInCart(state.cart)

export default rootReducer