import {products} from './products.reducer';
import {posts} from './posts.reducer';
import {combineReducers} from 'redux';

export var rootReducer = combineReducers({ 
    products,
    posts
});
// products:products // Enhance object literals
// posts:posts