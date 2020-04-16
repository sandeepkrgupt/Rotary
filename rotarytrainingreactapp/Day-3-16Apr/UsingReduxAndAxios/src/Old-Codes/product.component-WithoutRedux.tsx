import React from 'react';
import { PModel } from '../product.model';

interface IProdProps {
	producrDetails: PModel
	deleteHandler: (theId: number) => void // initialize func as void
}
interface IProdState {
	likecount: number
}

export default class Product extends React.Component<IProdProps, IProdState>{ //<propsType, stateType> mendetory fields
	constructor(props: IProdProps) {
		super(props);
		this.state = {
			likecount: this.props.producrDetails.likes
		}
	}
	static defaultProps = {
		producrDetails: new PModel(0, "unknown", "aa", 0, "https://cdn5.vectorstock.com/i/1000x1000/73/49/404-error-page-not-found-miss-paper-with-white-vector-20577349.jpg", 0, 0)
	}

	likeHandler() {
		console.log('Hi');
		// this.props.producrDetails.likes +=1; error - props are readonly
		this.setState({
			likecount: this.state.likecount + 1
		})
	}
	render() {
		return <div className="col-md-3 ">
			<div className="productStyle">
				<h6>{this.props.producrDetails.id} </h6>
				<h1>{this.props.producrDetails.title}</h1>
				<h3>Rs.{this.props.producrDetails.price}</h3>
				<img src={this.props.producrDetails.imageUrl} height="150" width="200" />
				<button className="btn btn-danger" onClick={() => this.props.deleteHandler(this.props.producrDetails.id)}> {/* OR {this.props.deleteHandler.bind(this)}*/}
					<span>Del</span>
				</button>
				<button className="btn btn-primary" onClick={this.likeHandler.bind(this)}>Likess - {this.state.likecount}</button>
				<b>Ratings - {this.props.producrDetails.rating}</b>
				<p>{this.props.producrDetails.description}</p>
				<button className="btn btn-info">Add to cart</button>
			</div>
		</div>
	}
}