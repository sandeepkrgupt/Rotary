import React from 'react';
import { PModel } from '../product.model';
import Product from './product.component-WithoutRedux';
import axios from 'axios';
interface IPdtListState {
	listofPdt: PModel[]
}
export default class ListOfProduct extends React.Component<{}, IPdtListState> { // first argument will be props and 2nd state
	constructor(props: any) {
		// class member
		super(props);
		this.state = {
			listofPdt: []
		}
		//https://extendsclass.com/api/json-storage/bin/eceffeb
	}
	componentWillMount() {
		console.log('componentWillMount');
	}
	componentDidMount() {
		// 100%sure DOM is ready
		console.log('componentDidMount');
		axios.get('./list.json').then(
			(resp) => {
				this.setState({
					listofPdt: resp.data
				})
			},
			(err) => {
				console.log("Something went wrong", err)
			}
		)
	}
	shouldComponentUpdate() { // it will automatically get called when state chages.
		console.log('arg-->', arguments);
		if (arguments[1].listofPdt.length == 0) {
			return false // will not update the state and DOM .
		} else {
			return true
		}
	}
	componentWillUpdate() {
		console.log('componentWillUpdate');
	}
	componentDidUpdate() {
		console.log('componentDidUpdate')
	}
	deleteProd(theId: number) {
		console.log('Delete', this)
		let newListArr = this.state.listofPdt.filter(p => p.id !== theId);
		this.setState({
			listofPdt: newListArr
		})
	}

	render() {
		var allPdts = this.state.listofPdt.map(c => <Product key={c.id} producrDetails={c} deleteHandler={(id:any) => this.deleteProd(id)}/>) //OR {this.deleteProd.bind(this)}
		return (
			<div className="row">{allPdts}</div>
		)
	}
}
