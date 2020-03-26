import React from 'react';
import OverrideCreditOrgHeader from './Header';
import OverrideCreditOrgGridRow from './GridRow';
import {
	color,
	pxToRem
} from 'styles';
import GlobalStyles from 'globalStyles';
import * as locale from 'locale';

const OverrideCreditOrgGrid = props => {
	const {
		gridData,
		onChange
	} = props;
	return (
		<div className="oco-container flex-host" style={{ margin: "0 0 0 4%" }}>
			<OverrideCreditOrgHeader />
			<div className="oco-body">
				<OverrideCreditOrgGridRow
					gridRowData={gridData}
					onChange={(change) => {
						onChange(change);
					}}
				/>
			</div>
		</div>
	);
}

export default OverrideCreditOrgGrid;
