import React from 'react';
import { PModel } from './product.model';

interface IProdProps {
    producrDetails:PModel
}

export default class Product extends React.Component<IProdProps>{
    static defaultProps = {
        producrDetails:new PModel("unknown",0,"https://cdn5.vectorstock.com/i/1000x1000/73/49/404-error-page-not-found-miss-paper-with-white-vector-20577349.jpg",0,0) 
      }
    render () {
        return <div className="col-md-3 ">
            <div className="productStyle">
                <h1>{this.props.producrDetails.name} 
                price - {this.props.producrDetails.price}</h1>
                <img src={this.props.producrDetails.imageUrl} height="150" width="200" />
                <button className="btn btn-primary">Likes - {this.props.producrDetails.likes}</button>
                <b>|</b>
                <b>Ratings - {this.props.producrDetails.rating}</b>
            </div>
        </div>
        
    }
}