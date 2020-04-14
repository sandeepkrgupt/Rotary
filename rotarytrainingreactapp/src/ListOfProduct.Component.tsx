import React from 'react';
import { PModel } from './product.model';
import Product from './product.component';

export default class ListOfProduct extends React.Component {
	private listofPdt: PModel[] = [];
	constructor(props: any) { // class member
		super(props);
		this.listofPdt = [
			new PModel("MI", 5999999, "https://images.samsung.com/is/image/samsung/in-qledtv-q60r-qa49q60rakxxl-frontblack-152405789?$PD_GALLERY_L_JPG$", 100, 20),
			new PModel("Samsung", 70099990, "https://images.samsung.com/is/image/samsung/sg-uhd-nu7090-ua50nu7090kxxs-frontblack-115100207?$PD_GALLERY_L_JPG$", 200, 20),
			new PModel("LG", 809999099, "https://images.samsung.com/is/image/samsung/sg-uhd-nu7090-ua50nu7090kxxs-frontblack-115100207?$PD_GALLERY_L_JPG$", 200, 20)
		]
	}
	render() {
		// const pdtArray:PModel[] = [
		//     new PModel("MI", 59999000, "https://images.samsung.com/is/image/samsung/in-qledtv-q60r-qa49q60rakxxl-frontblack-152405789?$PD_GALLERY_L_JPG$",100, 20),
		//     new PModel("Samsung", 70099990, "https://images.samsung.com/is/image/samsung/sg-uhd-nu7090-ua50nu7090kxxs-frontblack-115100207?$PD_GALLERY_L_JPG$",200, 20),
		//     new PModel("LG", 8099990, "https://images.samsung.com/is/image/samsung/sg-uhd-nu7090-ua50nu7090kxxs-frontblack-115100207?$PD_GALLERY_L_JPG$",200, 20)
		//     ]
		var allPdts = this.listofPdt.map(c => <Product producrDetails={c} />)
		return (
			<div className="row">{allPdts}</div>
		)
	}
}
