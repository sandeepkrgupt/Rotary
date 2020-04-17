import { createStore } from 'redux';
import { rootReducer } from '../reducers/combine.reducer'
var initialStoreData: any = {
  products: [],
  posts: []
}

export var store = createStore(rootReducer, initialStoreData) // sequence is mandatory createStore create new store if Action is triggered
