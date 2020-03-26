import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from '../../../StaffUseOnly/checkbox';

const OverrideCreditOrgCheckbox = props => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id="OverrideCreditOrgCheckbox"
          checked={props.checked}
          onChange={props.onChange}
        />
      }
      label="Override credit org"
    />
  );
}

export default OverrideCreditOrgCheckbox;