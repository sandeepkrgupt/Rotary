import React from 'react';
import logo from './logo.svg';
import '../App.css';
import Product from './product.component';
import { PModel } from '../product.model';
import ListOfProduct from './ListOfProduct.Component';
import PostRequestcall from '../ajax.request';

import ProductFooter from './Footer.Component';
class AppOne extends React.Component {
  render() {
    return (
      <div className="App">
        <hr />
        {/* <PostRequestcall /> */}
        <ListOfProduct {...this.props} />
        <ProductFooter />
      </div>
    );
  }
}

export default AppOne;
