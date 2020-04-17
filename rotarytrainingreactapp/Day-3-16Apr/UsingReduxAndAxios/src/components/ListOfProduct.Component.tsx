import React from 'react';
import { PModel } from '../product.model';
import Product from './product.component';
import axios from 'axios';
interface IPdtListState {
	listofPdt: PModel[]
}
export default class ListOfProduct extends React.Component<any, {}> { // first argument will be props and 2nd state
	componentDidMount() {
		axios.get('./list.json').then(
			(response) => { this.props.FetchData(response.data) },
			(err) => { console.log('Something Went Wrong') }
		)
	}

	render() {
		var allPdts = this.props.allProducts.map((c: PModel) =>
			<Product
				key={c.id}
				producrDetails={c}
				incrementLikeCount={
					(incrementLikeId: number) => this.props.IncreseLike(incrementLikeId) //IncreseLike should be same as in action.ts
				}
				deleteProduct={
					(delPdtId: number) => this.props.deleteSelectedProduct(delPdtId) // this is an action for redux
				} />)
		// {...this.props} Pass every thing to Product Comp directly
		return (
			<div className="row">{allPdts}</div>
		)
	}
}
