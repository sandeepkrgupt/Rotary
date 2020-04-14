import React from 'react';
import logo from './logo.svg';
import './App.css';
import BasicComp from './BasicComponent';
import Product from './product.component';
import { PModel } from './product.model';
import ListOfProduct from './ListOfProduct.Component';

class AppOne extends React.Component {
  render () {
    // const pdtArray:PModel[] = [
    // new PModel("MI", 59999000, "https://images.samsung.com/is/image/samsung/in-qledtv-q60r-qa49q60rakxxl-frontblack-152405789?$PD_GALLERY_L_JPG$",100, 20),
    // new PModel("Samsung", 7000, "https://images.samsung.com/is/image/samsung/sg-uhd-nu7090-ua50nu7090kxxs-frontblack-115100207?$PD_GALLERY_L_JPG$",200, 20),
    // new PModel("LG", 8000, "https://images.samsung.com/is/image/samsung/sg-uhd-nu7090-ua50nu7090kxxs-frontblack-115100207?$PD_GALLERY_L_JPG$",200, 20)
    // ]
    
// var allProductCreated = pdtArray.map ( c => <Product producrDetails={c} />)
    return (
      <div className="App">
        <BasicComp msg="this is msg"/>
        <BasicComp msg="this is msg-222"/>
        <BasicComp />
        {/* {allProductCreated} */}
        {/* <Product producrDetails={pdtDtl1}/>
        <Product producrDetails={pdtDtl2} />
        <Product/> */}
        <hr/>
        <ListOfProduct/>
      </div>
    );
  }
}

export default AppOne;
