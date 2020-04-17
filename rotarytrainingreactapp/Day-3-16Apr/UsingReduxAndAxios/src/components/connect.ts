import {connect} from 'react-redux';
import {Dispatch, bindActionCreators} from 'redux';
import RotaryProductApp from './App'; //Comp exported as default can be imported with any name
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
export var WrapperApp = connect(mapStateToProps, mapDispatchToProps)(RotaryProductApp); // this is same as below
{/* 
function X() {
    return function (a) {
        console.log(a);
    }
}
X()(10)
*/}