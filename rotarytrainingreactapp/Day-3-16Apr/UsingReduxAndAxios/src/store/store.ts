import { createStore } from 'redux';
import { rootReducer } from '../reducers/combine.reducer'
var initialStoreData: any = {
  products: [], // product comp data
  posts: [] // posts comp data
}

export var store = createStore(rootReducer, initialStoreData) // sequence is mandatory createStore create new store if Action is triggered