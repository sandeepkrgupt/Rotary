import React from 'react';
import TextInput from 'Form/components/TextInput';
import Select from 'Form/components/Select';
import styled from 'styled-components';
import throbber from '!!url-loader!assets/throbber.gif';
import { typeOptions } from '../../utils/utils.overrideCreditOrg';

const OverrideCreditOrgGridRow = props => {
	const {
		gridRowData,
		onChange,
	} = props;
	return (
		<div className="row-container">
			<div className="oco-row flex-host">
				<div className="oco-col data">
					<Select
						id="type"
						options={typeOptions}
						value={gridRowData.selectedType}
						onChange={(event) => {
							onChange({ selectedType: event.value });
						}}
					/>
				</div>
				<div className="oco-col data">
					<div className="">
						{gridRowData.selectedType ? (
							<TextInput
								maxLength="12"
								value={gridRowData.id}
								type="text"
							/>
						) :
							(<label />)}
					</div>
				</div>
				<div className="oco-col data" title="" style={{ borderRight: '1px solid black' }}>
					<label>{gridRowData.name}</label>
				</div>
			</div>
		</div>
	);
}

export default OverrideCreditOrgGridRow;