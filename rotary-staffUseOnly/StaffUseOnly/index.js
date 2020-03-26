import React from 'react';
import RequestSourceSelector from './RequestSourceSelector';
import styled from 'styled-components';
import TextInput from '../Form/components/TextInput';
import * as locale from 'locale';
import DPMDonationOnly from './dpmDonationComponents'
import DPMPaymentOnly from './paymentTypeSelector';

const Drupal = locale.Drupal;

const StaffOnlyUseContainer = styled.div`
    background-color: #EDF4F8;
    padding: 1.875rem 7vw;
    margin-bottom: 3.125rem;
    font-color: #263b4c;
    border: 1px solid #ccc;
`;

const StaffOnlyUseTitle = styled.div`
    font-size: 1.5rem;
    padding-bottom: 1rem;
    font-weight: 300;
    margin-bottom: 1rem;
    border-bottom: 1px solid;
`;


const StaffUseOnlyContainer = ({ config, requestSourceProps, dpmOnlyProps, staffUseOnly }) => {
  return (<StaffOnlyUseContainer>
    <StaffOnlyUseTitle>{Drupal.t('Staff Use Only')}</StaffOnlyUseTitle>
    <RequestSourceSelector
      selectedRequestSource={staffUseOnly.requestSource}
      setRequestSource={requestSourceProps.setRequestSource}
      setRequestSourceError={requestSourceProps.setRequestSourceError}
      requestSourceError={requestSourceProps.requestSourceError}
      required={requestSourceProps.required}
    />
    {config.dpmMode && config.dpm && config.dpm.btnMode === 'addPayment' &&
      <DPMPaymentOnly 
        config={config}
        staffUseOnly={staffUseOnly}
        setPaymentType={dpmOnlyProps.setPaymentType}
        setPaymentTypeError={dpmOnlyProps.setPaymentTypeError}
        paymentTypeError={dpmOnlyProps.paymentTypeError}
        setNotes= {dpmOnlyProps.setNotes}
      />
    }
    {config &&
      <DPMDonationOnly
        staffUseOnly={staffUseOnly}
        setAnonymous={dpmOnlyProps.setAnonymous}
        toggelOverrideCreditOrgVisibility={dpmOnlyProps.toggelOverrideCreditOrgVisibility}
        setQpqQuantity={dpmOnlyProps.setQpqQuantity}
        setOverrideDate={dpmOnlyProps.setOverrideDate}
        setQpqQuantityError={dpmOnlyProps.setQpqQuantityError}
        qpqQuantityError={dpmOnlyProps.qpqQuantityError}
        setNotes={dpmOnlyProps.setNotes}
        setRecognitionDestination={dpmOnlyProps.setRecognitionDestination}
        setPresentationDate={dpmOnlyProps.setPresentationDate}
        setRecognitionDestinationName={dpmOnlyProps.setRecognitionDestinationName}
        setRecognitionAddressLine1={dpmOnlyProps.setRecognitionAddressLine1}
        setRecognitionAddressLine2={dpmOnlyProps.setRecognitionAddressLine2}
        setRecognitionAddressLine3={dpmOnlyProps.setRecognitionAddressLine3}
        setRecognitionCity={dpmOnlyProps.setRecognitionCity}
        setRecognitionStateProvince={dpmOnlyProps.setRecognitionStateProvince}
        setRecognitionPostalCode={dpmOnlyProps.setRecognitionPostalCode}
        setRecognitionCountry={dpmOnlyProps.setRecognitionCountry}
        dpm={config.dpm} />
    }

  </StaffOnlyUseContainer>)
}

export default StaffUseOnlyContainer;