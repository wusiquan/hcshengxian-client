import { combineReducers } from 'redux'
import * as fromCategory from './category'
import * as fromGoods from './goods'

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
  categories: fromCategory.categories,
  goodsInCategory: fromGoods.goodsInCategory,
  activeCategoryId: fromCategory.activeCategoryId
})

// export selectors...
export const getActiveCategoryId = state => state.activeCategoryId

// fromCategory
export const getCateLoading = state => fromCategory.getCateLoading(state.categories)
export const getCateLoaded = state => fromCategory.getCateLoaded(state.categories)
export const getCategories = state => fromCategory.getCates(state.categories)

// fromGoods
export const getGoodsListInCategory = (state, categoryId) => {
  return fromGoods.getGoodsListInCategory(state.goodsInCategory, categoryId)
}
export const getGoodsLoading = state => fromGoods.getGoodsLoading(state.goodsInCategory)

export default rootReducer