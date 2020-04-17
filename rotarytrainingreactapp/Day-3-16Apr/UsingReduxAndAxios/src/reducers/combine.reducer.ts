import {products} from './products.reducer';
import {posts} from './posts.reducer';
import {combineReducers} from 'redux';

/**
 => Any Action is dispatched all reducers get notified.
 => Event in React are known as Actions in Redux and every action must have it's reducer.
 So we can have multiple reducers 
 **/
export var rootReducer = combineReducers({ 
    products,
    posts
});
// products:products // Enhance object literals
// posts:posts