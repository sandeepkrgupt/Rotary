import React from 'react';
import TextInput from '../Form/components/TextInput';
import TextArea from '../Form/components/TextArea';

import Anonymous from './anonymous';
import RecognitionFields from './recognitionFields'
import DatePicker from './datepicker';
import styled from 'styled-components';
import OverrideCreditOrgCheckbox from 'OverrideCreditOrg/components/OverrideCreditOrgCheckbox';
import OverrideCreditOrg from 'OverrideCreditOrg';

const setOverrideDateStyle = {
  width: '48%',
  marginRight: '2%',
  display: 'inline-block',
  float: 'left',
}

const setQuidProQuoStyle = {
  width: 'calc((100% - 5px)/2)',
  display: 'inline-block',
}

const RecognitionFieldsWrapper = styled.div`
     .field--rcgfAddressLine2, .field--rcgfCity,.field--rcgfPostalCode {
      width: 49%;
      float: left;
     }
     .field--rcgfAddressLine3, .field--rcgfStateProvince, .field--rcgfCountry {
      width: 49%;
      float: right;
     }
 `;

const dpmDonationComponents = ({
  staffUseOnly,
  setAnonymous,
  setQpqQuantity,
  setOverrideDate,
  setQpqQuantityError,
  qpqQuantityError,
  setNotes,
  setRecognitionDestination,
  setPresentationDate,
  setRecognitionDestinationName,
  setRecognitionAddressLine1,
  setRecognitionAddressLine2,
  setRecognitionAddressLine3,
  setRecognitionCity,
  setRecognitionStateProvince,
  setRecognitionPostalCode,
  setRecognitionCountry,
  toggelOverrideCreditOrgVisibility,
}) => {
  return (
    <div>
      <div>
        <div style={setOverrideDateStyle}>
          <DatePicker {...{
            id: 'OverrideDate',
            labelText: 'Override date',
            selectedDate: staffUseOnly.overrideDate,
            onDateChange: setOverrideDate
          }}></DatePicker>

        </div>
        <div style={setQuidProQuoStyle}>
          <TextInput
            id="qpqQuantity"
            value={staffUseOnly.qpqQuantity}
            onChange={(e) => {
              setQpqQuantity(e.target.value)
              if (/^[0-9]*$/.test(staffUseOnly.qpqQuantity) == false) {
                setQpqQuantityError(true, true);
              } else {
                setQpqQuantityError(false, false);
              }
            }}
            label={'Quid pro quo'}
            error={/^[0-9]*$/.test(staffUseOnly.qpqQuantity) == false}
            errorMessages={[
              "Please enter numbers only.",
            ]}
          />
        </div>
      </div>
      <RecognitionFieldsWrapper style={{marginBottom: '30px'}}>
        <RecognitionFields
          {...{           
            setRecognitionDestination,
            setRecognitionDestinationName,
            setRecognitionAddressLine1,
            setRecognitionAddressLine2,
            setRecognitionAddressLine3,
            setRecognitionCity,
            setRecognitionStateProvince,
            setRecognitionPostalCode,
            setRecognitionCountry,
            recognitionDestination: staffUseOnly.recognitionDestination,
            recognitionDestinationName: staffUseOnly.recognitionDestinationName,
            recognitionAddressLine1: staffUseOnly.recognitionAddressLine1,
            recognitionAddressLine2: staffUseOnly.recognitionAddressLine2,
            recognitionAddressLine3: staffUseOnly.recognitionAddressLine3,
            recognitionCity: staffUseOnly.recognitionCity,
            recognitionStateProvince: staffUseOnly.recognitionStateProvince,
            recognitionPostalCode: staffUseOnly.recognitionPostalCode,
            recognitionCountry: staffUseOnly.recognitionCountry,
            setPresentationDate,
            presentationDate: staffUseOnly.presentationDate
          }} />
      </RecognitionFieldsWrapper>
      <div>
        <TextArea
          label={'Notes'}
          id="StaffNotes"
          value={staffUseOnly.notes}
          characterLimit="250"
          charactersRemaining={staffUseOnly.notes ? (250 - staffUseOnly.notes.length) : 250}
          onChange={(e) => {
            setNotes(e.target.value)
          }}
          maxLength="250"
        />
      </div>
      <div className="Anonymous">
        <Anonymous
          checked={staffUseOnly.isAnonymous}
          onChange={(e) => {
            setAnonymous(e.target.checked)
          }} />
      </div>
      <div className="OverrideCreditOrgCheckbox">
        <OverrideCreditOrgCheckbox
          checked={staffUseOnly.overrideCreditOrgVisibility}
          onChange={(e) => {
            toggelOverrideCreditOrgVisibility(e.target.checked)
          }}
        />
      </div>
      {staffUseOnly.overrideCreditOrgVisibility &&
        <div>
          <OverrideCreditOrg />
        </div>
      }
    </div>
  )
}

export default dpmDonationComponents;