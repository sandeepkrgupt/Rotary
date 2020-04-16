import React from 'react';
import { PModel } from './product.model';

interface IProdProps {
	producrDetails: PModel
	deleteHandler: (theId: number) => void // initialize func as void return type
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
		// producrDetails: new PModel(0,"unknown", 0, "https://cdn5.vectorstock.com/i/1000x1000/73/49/404-error-page-not-found-miss-paper-with-white-vector-20577349.jpg", 0, 0)
	}

	likeHandler() {
		console.log('Hi');
		// this.props.producrDetails.likes +=1; error - props are readonly
		this.setState({
			likecount: this.state.likecount + 1
		})
	}
	render() {
		console.log('====', this.props.producrDetails)
		return <div className="col-md-3 ">
			<div className="productStyle">
				<h1>{this.props.producrDetails.id} </h1>
				<span>Rs.{this.props.producrDetails.title}</span>
				<img src={this.props.producrDetails.imageUrl} height="150" width="200" />
				<button className="btn btn-danger" onClick={() => this.props.deleteHandler(this.props.producrDetails.id)}> {/* OR {this.props.deleteHandler.bind(this)}*/}
					<span>Del</span>
				</button>
				<button className="btn btn-primary" onClick={this.likeHandler.bind(this)}>Likess - {this.state.likecount}</button>
				<b>|</b>
				<b>Ratings - {this.props.producrDetails.rating}</b>
				<p>{this.props.producrDetails.description}</p>
			</div>
		</div>
	}
}
