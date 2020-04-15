import React from 'react';
import { PModel } from './product.model';
import Product from './product.component';
import axios from 'axios';
interface IPdtListState {
	listofPdt:PModel[]
}
export default class ListOfProduct extends React.Component<{},IPdtListState> {
	// private listofPdt: PModel[] = [
	// 	new PModel("MI", 5999999, "https://images.samsung.com/is/image/samsung/in-qledtv-q60r-qa49q60rakxxl-frontblack-152405789?$PD_GALLERY_L_JPG$", 100, 20),
	// 	new PModel("Samsung", 70099990, "https://images.samsung.com/is/image/samsung/sg-uhd-nu7090-ua50nu7090kxxs-frontblack-115100207?$PD_GALLERY_L_JPG$", 200, 20),
	// 	new PModel("LG", 809999099, "https://images-na.ssl-images-amazon.com/images/I/81t2A6uhm4L._SX355_.jpg", 200, 20)
	// ]; // member variable
	constructor(props: any) { // class member
		super(props);
		// this.listofPdt = [
		// 	new PModel("MI", 5999999, "https://images.samsung.com/is/image/samsung/in-qledtv-q60r-qa49q60rakxxl-frontblack-152405789?$PD_GALLERY_L_JPG$", 100, 20),
		// 	new PModel("Samsung", 70099990, "https://images.samsung.com/is/image/samsung/sg-uhd-nu7090-ua50nu7090kxxs-frontblack-115100207?$PD_GALLERY_L_JPG$", 200, 20),
		// 	new PModel("LG", 809999099, "https://images-na.ssl-images-amazon.com/images/I/81t2A6uhm4L._SX355_.jpg", 200, 20)
		// ]
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
			(resp) => this.setState({
					listofPdt: resp.data
				}),
			(err) => console.log(err)
		)
	}
	shouldComponentUpdate() {
		console.log('arg', arguments);
		if(arguments[1].listofPdt.length == 0) {
			return false
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
	deleteProd(theId:number) {
		console.log('Delete',this)
		let newListArr = this.state.listofPdt.filter(p => p.id!== theId);
		this.setState({
			listofPdt: newListArr
		})
	}

	render() {
		// const pdtArray:PModel[] = [
		//     new PModel("MI", 59999000, "https://images.samsung.com/is/image/samsung/in-qledtv-q60r-qa49q60rakxxl-frontblack-152405789?$PD_GALLERY_L_JPG$",100, 20),
		//     new PModel("Samsung", 70099990, "https://images.samsung.com/is/image/samsung/sg-uhd-nu7090-ua50nu7090kxxs-frontblack-115100207?$PD_GALLERY_L_JPG$",200, 20),
		//     new PModel("LG", 8099990, "https://images.samsung.com/is/image/samsung/sg-uhd-nu7090-ua50nu7090kxxs-frontblack-115100207?$PD_GALLERY_L_JPG$",200, 20)
		//     ]
		var allPdts = this.state.listofPdt.map(c => <Product key={c.id} producrDetails={c} deleteHandler={(id) => this.deleteProd(id)}/>) //OR {this.deleteProd.bind(this)}
		return (
			<div className="row">{allPdts}</div>
		)
	}
}
