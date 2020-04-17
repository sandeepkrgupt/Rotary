import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import App from './App';
import * as AllActions from '../actions/action';

function mapStateToProps(storeDataFromProvider:any) {
    return {
        allProducts: storeDataFromProvider.products,
        allPosts: storeDataFromProvider.posts
    }
}

function mapDispatchToProps(dispatcher:Dispatch) {
return bindActionCreators(AllActions, dispatcher)
}
export var WrapperApp = connect(mapStateToProps, mapDispatchToProps)(App); // this is same as below
{/* 
function X() {
    return function (a) {
        console.log(a);
    }
}
X()(10)
*/}