import React from 'react';
import UserActions from 'UserActions';
import Country from 'Country';
import Currency from 'Currency';
import FundSelector from 'FundSelector';
import DonationType from 'DonationType';
import DonationFrequency from 'DonationFrequency';
import DonationStart from 'DonationStart';
import Amount from 'Amount';
import RaiseNowWidget from 'RaiseNowWidget';
import SecurityLock from 'SecurityLock';
import DebugPrinter from 'DebugPrinter';
import { DedicationCheckbox, DedicationForm } from 'Dedication';
import MultipleDonorCheckbox from 'MultipleDonor/components/MultipleDonorCheckbox';
import OverrideCreditOrgCheckbox from 'OverrideCreditOrg/components/OverrideCreditOrgCheckbox';
import MultipleDonor from 'MultipleDonor';
import DonationBehalf, { BehalfCheckbox } from 'DonationBehalf';
import withLogic, { getCountrySpecificNote, getCurrencySpecificNote, getFoundationNote } from 'Widget/logic';
import styled from 'styled-components';
import {
  pxToRem,
  donationFields,
  donationStep,
  fieldLabel,
  fontSize,
  color,
  pageWrapper,
  mainWrapper,
  stepTitle,
  button,
  bp,
} from 'styles';
import * as locale from 'locale';
// import RequestSourceSelector from 'RequestSourceSelector';
import StaffUseOnly from 'StaffUseOnly';
import { checkIsRotaryDirectPage, getEndowmentFunds, isGrantNumberSearched } from 'utils';
import funds from 'data/funds';
import fundCategories from 'data/fundCategories';

const Drupal = locale.Drupal;

const StyledWidget = styled.div.attrs({ className: 'widget__container' })`
  ${pageWrapper()}
`;

const StepsWrapper = styled.div.attrs({ className: 'widget-steps' })`
  ${mainWrapper()}
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
`;

const RequiredNote = styled.p.attrs({ className: 'steps__required-note' })`
  ${fieldLabel()}
  font-weight: 400;
  color: ${color.black};
  margin-bottom: ${pxToRem(22)};
  padding: 5% 5% 0;

  ${bp('xs_up')`
    padding: 0;
  `}

  ${bp('s_up')`
    text-align: right;
  `}

  em {
    font-style: italic;
  }
`;

const DonationStep = styled.div.attrs({ className: 'steps__step' })`
  ${donationStep()}
  min-height: 10%;
`;

const FirstDonationStep = styled.div.attrs({ className: 'steps__step--first' })`
  ${donationStep()} // needs
  margin-bottom: 0;
`;

const StepTitle = styled.h2.attrs({ className: 'step__title' })`
  ${stepTitle()}
`;

const DonationFields = styled.div.attrs({
  className: 'step__container fund_selector__btn--callout',
})`
  ${donationFields()}
`;

const CountrySpecificNote = styled.div.attrs({
  className: 'step__country-note',
})`
  ${fontSize(14, 20)}
  span {
    display: block;
    margin: -20px 0 30px;
  }
  a {
    color: ${color.blue};
  }
`;

const CurrencySpecificNote = styled.div.attrs({
  className: 'step__currency-note',
})`
  ${fontSize(14)}
  span {
    display: block;
    margin: -20px 0 30px;
  }
  a {
    color: ${color.blue};
  }
`;

const DonationTypeWrapper = styled.div`
  margin-bottom: ${pxToRem(30)};
`;

const WidgetFooter = styled.div.attrs({ className: 'widget_footer' })`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const DonationDetailsBtn = styled.button.attrs({ className: 'donation_details__btn' })`
  ${button(true)}
  margin: 0 1rem 1rem;
`;

const CloseWidgetBtn = styled.button.attrs({ className: 'close_widget__btn' })`
  ${button(true)}
  margin: 0 1rem 1rem;
`;

const SubmitBtn = styled.button.attrs({ className: 'donation_details__btn' })`
  ${button(true)}
  display: block;
  margin: 0 1rem 1rem;
  width: 100%;
`;

const WidgetWrapper = styled.div`
  text-align: center;
`;

const CheckboxListContainer = styled.div.attrs({
  className: 'checkbox_list__container',
})`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: ${pxToRem(50)} 0 0 0;
  padding: 0 7vw;
  ${bp('xs_up')`
    padding: 0;
  `}
  .steps__step {
    margin-left: -7vw;
    margin-right: -7vw;
    ${bp('xs_up')`
      margin-left: 0;
      margin-right: 0;
    `}
  }
`;
const Widget = ({
  preferredLang,
  createdBy,
  isCloseWidgetEnabled,
  activeFundTab,
  amount,
  amountHandlers,
  behalf,
  behalfHandlers,
  config,
  country,
  currency,
  currencyRecurringEnabled,
  customAmount,
  customAmountShown,
  dedication,
  dedicationHandlers,
  donationDetailsEnabled,
  donationType,
  fixedAmount,
  foundation,
  frequency,
  fund,
  fundSelectable,
  grantsError,
  interval,
  lang,
  oneTimeEnabled,
  paymentWorkflowRedirect,
  previewDedication,
  raiseNowCustomerToken,
  raiseNowScriptErrorStatus,
  raiseNowSubscriptionId,
  raiseNowWidgetId,
  raiseNowWidgetIsLoaded,
  raiseNowWidgetIsLoading,
  recurringEnabled,
  reducerError,
  selectedGrantId,
  setActiveFundTab,
  setAlert,
  setCountry,
  setCountryOverridable,
  setCurrency,
  setDonationDetailsVisibility,
  setDonationType,
  setFrequency,
  setFrequencyError,
  setFund,
  setGrantId,
  setGrantsError,
  setInterval,
  setRaiseNowScriptErrorStatus,
  setRaiseNowValidationErrors,
  setRaiseNowWidgetIsLoaded,
  setRaiseNowWidgetIsLoading,
  setStartDateDetails,
  setTransactionData,
  setUser,
  signInFormVisibility,
  stateForDebugging,
  submitForm,
  toggleSignInFormVisibility,
  user,
  userIsLeader,
  setRequestSource,
  setRequestSourceError,
  staffUseOnly,
  setAnonymous,
  setQpqQuantity,
  setOverrideDate,
  setQpqQuantityError,
  setNotes,
  setRecognitionDestination,
  setRecognitionDestinationName,
  setRecognitionAddressLine1,
  setRecognitionAddressLine2,
  setRecognitionAddressLine3,
  setRecognitionCity,
  setRecognitionStateProvince,
  setRecognitionPostalCode,
  setRecognitionCountry,
  setPresentationDate,
  toggleMultipleDonorVisibility,
  toggelOverrideCreditOrgVisibility,
  setOccasion,
  setRecipientName,
  setAddressLine1,
  setAddressLine2,
  setAddressLine3,
  setCity,
  setProvince,
  setPostalCode,
  setMailLetterCountry,
  setPaymentType,
  setPaymentTypeError,
  setPaymentAmount,
  setPaymentAmountError
}) =>
  (<StyledWidget>
    <StepsWrapper>
      <RequiredNote
        dangerouslySetInnerHTML={{
          __html: Drupal.t('All fields are required unless marked <em>optional</em>.'),
        }}
      />
      {config &&
        <StaffUseOnly
          config={config}
          staffUseOnly={staffUseOnly}
          requestSourceProps={{
            setRequestSource,
            setRequestSourceError,
            requestSourceError: reducerError.requestSourceError,
            required: true
          }}
          dpmOnlyProps={{
            setAnonymous,
            toggelOverrideCreditOrgVisibility,
            setQpqQuantity,
            setOverrideDate,
            setQpqQuantityError,
            qpqQuantityError: reducerError.qpqQuantityError,
            setNotes,
            setRecognitionDestination,
            setRecognitionDestinationName,
            setRecognitionAddressLine1,
            setRecognitionAddressLine2,
            setRecognitionAddressLine3,
            setRecognitionCity,
            setRecognitionStateProvince,
            setRecognitionPostalCode,
            setRecognitionCountry,
            setPresentationDate,
            setPaymentType,
            paymentTypeError: reducerError.paymentTypeError,
            setPaymentTypeError
          }}>
        </StaffUseOnly>

      }
      {fundSelectable &&
        <FirstDonationStep>
          <StepTitle>
            {Drupal.t('Choose what you would like to support')}
          </StepTitle>
          <DonationFields>
            <FundSelector
              setFund={setFund}
              fund={fund}
              userRoles={user.roles}
              activeFundTab={activeFundTab}
              setActiveFundTab={setActiveFundTab}
              selectedGrantId={selectedGrantId}
              setGrantId={setGrantId}
              grantsError={reducerError.grantsError}
              setGrantsError={setGrantsError}
              currency={currency}
              setDonationType={setDonationType}
            />
          </DonationFields>
        </FirstDonationStep>}
      <CheckboxListContainer>
        {config.dedicationEnabled &&
          <DedicationCheckbox
            dedicationImages={config.dedicationImages}
            isDisabled={donationType === 'recurring'}
            dedication={dedication}
            dedicationHandlers={dedicationHandlers}
          />}
        {config &&
          <MultipleDonorCheckbox 
            multipleDonorVisibility={staffUseOnly.multipleDonorVisibility}
            toggleMultipleDonorVisibility={toggleMultipleDonorVisibility} 
          />}
        {dedication.dedicationVisibility &&
          <DonationStep>
            <StepTitle>{Drupal.t('Dedication')}</StepTitle>
            <DonationFields>
              <DedicationForm
                config={config}
                allDedicationImages={config.dedicationImages}
                dedication={dedication}
                dedicationHandlers={dedicationHandlers}
                previewDedication={previewDedication}
                staffUseOnly={staffUseOnly}
                dpmMailLetterHandlers= {{
                  setOccasion,
                  setRecipientName,
                  setAddressLine1,
                  setAddressLine2,
                  setAddressLine3,
                  setCity,
                  setProvince,
                  setPostalCode,
                  setMailLetterCountry
                }}
              />
            </DonationFields>
          </DonationStep>
        }
        {config.behalfEnabled && userIsLeader &&
          <BehalfCheckbox
            isDisabled={donationType === 'recurring'}
            behalfVisibility={behalf.behalfVisibility}
            behalfHandlers={behalfHandlers}
          />
        }
      </CheckboxListContainer>
      <DonationStep>
        <StepTitle>
          {(checkIsRotaryDirectPage(config)) ? Drupal.t('Enrollment details') : Drupal.t('Donation')}
        </StepTitle>
        <DonationFields>
          <Country
            config={config}
            country={country}
            setCountry={setCountry}
            setCountryOverridable={setCountryOverridable}
          />
          <Currency
            donationType={donationType}
            recurringEnabled={config.recurringEnabled}
            currency={currency}
            country={country}
            setCurrency={setCurrency}
            currencies={config.currencies}
          />
          <CountrySpecificNote>
            {getCountrySpecificNote(country, foundation, lang, currency, fund.id, getEndowmentFunds(config), behalf, isGrantNumberSearched(grantsError.visibility, selectedGrantId))}
          </CountrySpecificNote>
          <CurrencySpecificNote>
            {getCurrencySpecificNote(currency)}
          </CurrencySpecificNote>
          {behalf.behalfVisibility &&
            <DonationBehalf
              currency={currency}
              behalf={behalf}
              behalfHandlers={behalfHandlers}
              user={user}
            />
          }
          {recurringEnabled &&
            currencyRecurringEnabled &&
            fund.recurring &&
            !behalf.behalfVisibility &&
            !dedication.dedicationVisibility &&
            !selectedGrantId &&
            !grantsError.status &&
            <DonationTypeWrapper>
              {oneTimeEnabled && recurringEnabled &&
                <DonationType config={config} type={donationType} setType={setDonationType} oneTimeEnabled={oneTimeEnabled} />
              }
              {donationType === 'recurring' &&
                <DonationFrequency
                  currencies={config.currencies}
                  frequency={frequency}
                  setFrequency={setFrequency}
                  setFrequencyError={setFrequencyError}
                  frequencyError={reducerError.frequencyError}
                  setInterval={setInterval}
                />}
              {donationType === 'recurring' &&
                frequency &&
                <DonationStart
                  key={frequency.id}
                  frequency={frequency}
                  interval={interval}
                  setInterval={setInterval}
                  setStartDateDetails={setStartDateDetails}
                  label={config.subscriptionEdit &&
                    Drupal.t('Choose next charge date') ||
                    Drupal.t('Choose start date')}
                />}
            </DonationTypeWrapper>}
          {behalf.behalfType !== 'member' && !staffUseOnly.multipleDonorVisibility &&
            <Amount
              config={config}
              staffUseOnly={staffUseOnly}
              setPaymentAmount={setPaymentAmount}
              setPaymentAmountError={setPaymentAmountError}
              paymentAmountError={reducerError.paymentAmountError}
              currencies={config.currencies}
              rates={config.rates}
              key={`${currency.id}:${frequency ? frequency.id : 'one-time'}`}
              currency={currency}
              frequency={frequency}
              amount={amount}
              amountError={reducerError.amountError}
              fixedAmount={fixedAmount}
              amountHandlers={amountHandlers}
              customAmountShown={customAmountShown}
              customAmount={customAmount}
            />}
          {staffUseOnly.multipleDonorVisibility &&
            <MultipleDonor 
              currency={currency}
              config={config}
            />
          }
        </DonationFields>
      </DonationStep>
      {(!config.dmiMode || !config.dpmMode) && <UserActions
        country={country}
        currency={currency}
        user={user}
        setUser={setUser}
        setAlert={setAlert}
        behalfVisibility={behalf.behalfVisibility}
        signInFormVisibility={signInFormVisibility}
        toggleSignInFormVisibility={toggleSignInFormVisibility}
      />}
      {(user.authenticated || user.guestContinue || (config.dmiMode || config.dpmMode)) &&
        <WidgetWrapper>
          <RaiseNowWidget
            {...{
              preferredLang,
              createdBy,
              amount,
              behalf,
              country,
              currency,
              dedication,
              donationType,
              frequency,
              fund,
              interval,
              paymentWorkflowRedirect,
              raiseNowCustomerToken,
              raiseNowScriptErrorStatus,
              raiseNowSubscriptionId,
              raiseNowWidgetId,
              raiseNowWidgetIsLoaded,
              raiseNowWidgetIsLoading,
              selectedGrantId,
              setAlert,
              setCurrency,
              setRaiseNowScriptErrorStatus,
              setRaiseNowValidationErrors,
              setRaiseNowWidgetIsLoaded,
              setRaiseNowWidgetIsLoading,
              setFund,
              setTransactionData,
              setActiveFundTab,
              user,
              //selectedRequestSource,
              staffUseOnly,
              config,
              amountHandlers,
              dedicationHandlers,
              behalfHandlers,
              setGrantId
            }}
          />
          {raiseNowWidgetIsLoaded && (
            <WidgetFooter>
              {donationDetailsEnabled &&
                (<DonationDetailsBtn
                  onClick={() => setDonationDetailsVisibility(true)}
                >
                  {config.subscriptionEdit &&
                    Drupal.t('Review my changes') ||
                    ((checkIsRotaryDirectPage(config) === true) ? Drupal.t('REVIEW MY ENROLLMENT') : Drupal.t('Review my donation'))}
                </DonationDetailsBtn>
                )}
              <SubmitBtn id="submit-btn" primary onClick={submitForm}>
                {config.subscriptionEdit &&
                  Drupal.t('Submit changes') ||
                  Drupal.t('Submit')}
              </SubmitBtn>
              {/* This is intentionally commented because we need good way of handling this.
              // for now it is being handled from DMI because DMI will load RDW as modal popup
              { isCloseWidgetEnabled &&
                <CloseWidgetBtn onClick={() => {
                  //TODO
                }}>{Drupal.t('Close Widget')}</CloseWidgetBtn>
              } */}
              <SecurityLock {...{ country, currency }} />
            </WidgetFooter>
          )}
        </WidgetWrapper>}
    </StepsWrapper>
    <DebugPrinter title="Widget" state={stateForDebugging} />
  </StyledWidget>);

export default withLogic(Widget);