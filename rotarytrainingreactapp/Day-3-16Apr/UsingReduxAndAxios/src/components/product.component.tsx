import React from 'react';
import { PModel } from '../product.model';

interface IProdProps {
	producrDetails: PModel,
	incrementLikeCount:(theId:number)=>any,
	deleteProduct:(theId:number)=>any
}

export default class Product extends React.Component<IProdProps>{ //<propsType, stateType> mendetory fields
	constructor(props: IProdProps) {
		super(props);
	}
	static defaultProps = {
		producrDetails: new PModel(0, "unknown", "aa", 0, "https://cdn5.vectorstock.com/i/1000x1000/73/49/404-error-page-not-found-miss-paper-with-white-vector-20577349.jpg", 0, 0)
	}
	
	render() {
		return <div className="col-md-3 ">
			<div className="productStyle">
				<h6>{this.props.producrDetails.id} </h6>
				<h1>{this.props.producrDetails.title}</h1>
				<h3>Rs.{this.props.producrDetails.price}</h3>
				<img src={this.props.producrDetails.imageUrl} height="150" width="200" />
				<button className="btn btn-danger"onClick={() => this.props.deleteProduct(this.props.producrDetails.id)}>
					<span>Del</span>
				</button>
				<button className="btn btn-primary" onClick={()=> this.props.incrementLikeCount(this.props.producrDetails.id)}>Likess - {this.props.producrDetails.likes}</button>
				<b>Ratings - {this.props.producrDetails.rating}</b>
				<p>{this.props.producrDetails.description}</p>
				<button className="btn btn-info">Add to cart</button>
			</div>
		</div>
	}
}