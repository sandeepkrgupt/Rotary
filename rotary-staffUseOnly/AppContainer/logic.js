import withReducers, * as actions from 'state';
import { withConfig } from 'Providers/ConfigProvider';
import { withLang } from 'Providers/LangProvider';
import { withHandlers, compose, mapProps, lifecycle } from 'recompose';
import {
  createHandler,
  getCountryById,
  getCurrencyById,
  getFundById,
  getFrequencyById,
  getFrequencyByInterval,
  getAmountsForCurrency,
  scrollTo,
  getWidgetId,
  getDOMPosition,
  createSubhandlers,
  fetchClubMembersByClubId,
  fetchIdAndStoreClubMembers,
  fetchEcardLinkAndStoreData,
  fetchIfEnabled,
  userIsInPrivilegedSecGroup,
  getUserClubBySecGroups,
  getFoundation,
  getCountryByEnglishName,
} from 'utils';
import { validateSubscriptionEditData } from 'utils/inputValidation';
import { getDefaultCurrency } from 'state/reducerApp';
import * as locale from 'locale';

const Drupal = locale.Drupal;

// argument should be a key in the errorReducer
const scrollToFirstError = reducer => {
  const selectors = {
    requestSourceError: '[for="RequestSource"]',
    paymentTypeError: '[for="PaymentType"]',
    dedicationNameError: '[for="DedicationName"]',
    recipientEmailError: '[for="RecipientEmail"]',
    donorNameError: '[for="DonorName"]',
    grantsError: '[for="Grants"]',
    amountError: '[for="CustomAmount"]',
    frequencyError: '[for="DonationFrequency"]',
    clubMembersNoAmountError: '[For="MemberFormNoAmount"]',
    clubMembersInputError: '[for="MemberForm"]',
    qpqQuantityError: '[for="qpqQuantity"]',
    paymentAmountError: '[for="paymentAmount"]'
  };
  const keyWithErrorAndFirstInDOM = Object.keys(reducer)
    .filter(eachKey => reducer[eachKey].status === true)
    .reduce((pKey, nKey) => {
      const pTop = getDOMPosition(selectors[pKey]).top;
      const nTop = getDOMPosition(selectors[nKey]).top;
      return pTop < nTop ? pKey : nKey;
    });

  const cssSelector = selectors[keyWithErrorAndFirstInDOM];
  if (cssSelector) {
    scrollTo(cssSelector);
  } else {
    console.log('Unable to scroll; no CSS Selector found.');
  }
};

const withActionHandlers = withHandlers({
  setFund: ({ dispatch, behalf, country, currency, config: { currencies, funds, foundations, recurringEnabled }, donationType }) => fund => {
    dispatch(actions.createSetFundAction(fund.id, funds));
    let currencyId = null;
    if (!currency || !currency.id) {
      const defaultCurrency = getDefaultCurrency(currencies, country, recurringEnabled, donationType);
      currencyId = defaultCurrency.id;
    } else {
      currencyId = currency.id;
    }

    const foundation = getFoundation(foundations, country.iso2, currencyId, fund.fundId, null, behalf);
    dispatch(actions.createSetFoundation(foundation));
  },
  setAmount: createHandler(actions.createSetAmountAction),
  setCurrency: ({ dispatch, behalf, country, fund, config: { foundations, currencies, countries }, selectedGrantId }) => currency => {
    dispatch(actions.createSetCurrencyAction(countries, currencies, currency));

    const foundation = getFoundation(foundations, country.iso2, currency.id, fund.fundId, selectedGrantId, behalf);
    dispatch(actions.createSetFoundation(foundation));
  },
  setCountry: ({ dispatch, fund, behalf, config: { currencies, foundations, countries, recurringEnabled }, selectedGrantId, donationType }) => (country, override) => {
    dispatch(actions.createSetCountryAction(donationType, recurringEnabled, currencies, countries, country, override));
    const defaultCurrency = getDefaultCurrency(currencies, country, recurringEnabled, donationType);

    const foundation = getFoundation(foundations, country.iso2, defaultCurrency.id, fund.fundId, selectedGrantId, behalf);
    dispatch(actions.createSetFoundation(foundation));
  },
  setFoundation: ({ dispatch, config: { foundations } }) => (...args) => {
    const foundation = getFoundation(foundations, ...args);
    dispatch(actions.createSetFoundation(foundation));
  },
  setCountryOverridable: createHandler(
    actions.createSetCountryOverridableAction,
  ),
  setPaymentWorkflowRedirect: createHandler(
    actions.createSetPaymentWorkflowRedirectAction,
  ),
  setUser: ({ dispatch, paymentWorkflowRedirect, config: { api_url } }) => user => {
    dispatch(actions.createSetUserAction(user));
    const { sec_groups = [] } = user;
    if (sec_groups.length) {
      const userClub = getUserClubBySecGroups(sec_groups);
      dispatch(actions.createSetClub(userClub));
      fetchClubMembersByClubId(api_url, userClub.club_id).then(members =>
        dispatch(actions.createSetClubMembers(members, paymentWorkflowRedirect)),
      );
    }
  },
  setRaiseNowValidationErrors: createHandler(actions.createSetRaiseNowValidationErrors),
  setRaiseNowWidgetIsLoaded: createHandler(
    actions.createSetRaiseNowWidgetIsLoaded,
  ),
  setRaiseNowWidgetIsLoading: createHandler(
    actions.createSetRaiseNowWidgetIsLoading,
  ),
  setRaiseNowScriptErrorStatus: createHandler(actions.createSetRaiseNowScriptErrorStatus),
  setTransactionData: createHandler(actions.createSetTransactionData),
  setDonationType: createHandler(actions.createSetDonationTypeAction),
  setFrequency: createHandler(actions.createSetRecurringFrequencyAction),
  setInterval: createHandler(actions.createSetRecurringIntervalAction),
  setStartDateDetails: createHandler(actions.createSetRecurringStartDateDetailsAction),
  setAmountError: createHandler(actions.createSetAmountError),
  setFrequencyError: createHandler(actions.createSetFrequencyError),
  setRequestSourceError: createHandler(actions.createSetRequestSourceError),
  setPaymentTypeError: createHandler(actions.createSetPaymentTypeError),
  setPaymentAmountError: createHandler(actions.createSetPaymentAmountError),
  setQpqQuantityError: createHandler(actions.createSetQpqQuantityError),
  previewDedication: ({ dispatch, reducerError }) => () => {
    const hasErrors = Object.values(reducerError).some(
      ({ status }) => status === true,
    );
    if (hasErrors) {
      dispatch(actions.createSetAllErrorsVisibility(true));
      scrollToFirstError(reducerError);
    } else {
      dispatch(actions.createSetDedicationPreviewVisibility(true));
    }
  },
  submitForm: ({
    behalf: {
      behalfType,
      behalfVisibility,
      clubMembers,
      clubMembersInputError,
      clubMembersNoAmountError,
    },
    dedication,
    dispatch,
    config: { api_url, currencies, rates },
    lang,
    raiseNowWidgetId,
    reducerError,
  }) => () => {
    const getWidget = () =>
      // a fn to avoid undefined errs.
      global.rnwWidget.widgets.instances[
      `${raiseNowWidgetId}-default`
      ];
    const errorObj = {
      ...reducerError,
      clubMembersNoAmountError,
      clubMembersInputError,
    };
    const hasErrors = Object.values(errorObj).some(
      ({ status }) => status === true,
    );
    const isDonatingOnBehalfOfClubMembers =
      behalfVisibility && behalfType === 'member';
    const isDedicationNotification = dedication.dedicationNotificationStatus;

    if (hasErrors) {
      dispatch(actions.createSetAllErrorsVisibility(true));
      scrollToFirstError(errorObj);
    } else {
      const dedicationFormData = new global.FormData();
      dedicationFormData.append('dedication_type', dedication.dedicationType === 'memory' ? 1 : 2);
      dedicationFormData.append('notification_type', dedication.notificationType === 'email' ? 1 : 2);
      dedicationFormData.append('dedicated_to', dedication.dedicationName);
      dedicationFormData.append('donor_name', dedication.donorName);

      if (dedication.selectedDedicationImage) {
        dedicationFormData.append('image_fid', dedication.selectedDedicationImage.id);
      }

      dedicationFormData.append('personal_msg', dedication.personalMessage);

      const clubMemberData = new global.FormData();
      clubMemberData.append('clubMembers', JSON.stringify(
        clubMembers.filter(({ amount }) => parseInt(amount, 10) > 0)),
      );

      Promise.all([
        fetchIfEnabled(fetchIdAndStoreClubMembers, isDonatingOnBehalfOfClubMembers, api_url, clubMemberData),
        fetchIfEnabled(fetchEcardLinkAndStoreData, isDedicationNotification, `${api_url}/${lang}`, dedicationFormData),
      ]).then(data => {
        const id = data[0];
        if (id) {
          getWidget().set('stored_list_id', id);
        }
        const ecard = data[1];
        if (ecard) {
          dispatch(actions.createSetEcardLink(ecard.url));
        }

        // Submit transaction by triggering native RN submit button
        getWidget()
          .j('#rnWidget .lema-button-donate')
          .trigger('click');
      })
        .catch(err => {
          console.log(err);
          const msg = Drupal.t(
            'There was a problem saving your data. Please try again later.',
          );
          dispatch(actions.createSetAlert(msg));
        });
    }
  },
  setDonationDetailsVisibility: createHandler(
    actions.createSetDonationDetailsVisibility,
  ),
  setActiveFundTab: createHandler(actions.createSetActiveFundTab),
  setGrantId: ({ dispatch, country, currency, behalf, config: { foundations } }) => grantId => {
    dispatch(actions.createSetGrantId(grantId));

    const foundation = getFoundation(foundations, country.iso2, currency.id, null, 'GRNT_GG', behalf);
    dispatch(actions.createSetFoundation(foundation));
  },
  setPreferredLang: createHandler(actions.createSetPreferredLangAction),
  setCreatedBy: createHandler(actions.createSetCreatedByAction),
  setGrantsError: createHandler(actions.createSetGrantsError),
  setDonorType: createHandler(actions.createSetDonorType),
  setPaymentType: createHandler(actions.createSetPaymentType),
  setPaymentAmount: createHandler(actions.createSetPaymentAmount),
  dedicationHandlers: ({ dispatch }) => () =>
    createSubhandlers(dispatch, {
      setDedicationName: actions.createSetDedicationName,
      setDedicationNameError: actions.createSetDedicationNameError,
      setDedicationType: actions.createSetDedicationType,
      setNotificationType: actions.createSetNotificationType,
      setRecipientEmail: actions.createSetRecipientEmail,
      setRecipientEmailError: actions.createSetRecipientEmailError,
      setDonorName: actions.createSetDonorName,
      setDonorNameError: actions.createSetDonorNameError,
      setPersonalMessage: actions.createSetPersonalMessage,
      toggleDedicationNotificationStatus:
        actions.createSetDedicationNotificationStatus,
      toggleDedicationVisibility: actions.createSetDedicationVisibility,
      setSelectedDedicationImage: actions.createSetSelectedDedicationImage,
      setDedicationPreviewVisibility: actions.createSetDedicationPreviewVisibility,
    }),
  personalDetailsHandlers: ({ dispatch }) => () =>
    createSubhandlers(dispatch, {
      setFirstName: actions.createSetFirstName,
      setLastName: actions.createSetLastName,
      setPhone: actions.createSetPhone,
      setEmail: actions.createSetEmail,
    }),
  billingAddressHandlers: ({ dispatch }) => () =>
    createSubhandlers(dispatch, {
      setStreet: actions.createSetStreet,
      setBillingState: actions.createSetBillingState,
      setZip: actions.createSetZip,
      setCity: actions.createSetCity,
      setInternationalProvince: actions.createSetInternationalProvince,
      setBillingCountry: actions.createSetBillingCountry,
    }),
  behalfHandlers: ({
    config: { currencies, foundations },
    dispatch,
    country,
    currency,
    fund,
    selectedGrantId,
    behalf,
    behalf: { behalfType, clubMembersTotal },
  }) => () => ({
    setBehalfType: selectedType => {
      if (behalfType === 'member') {
        // if switching away from club members, reset amount.
        dispatch(actions.createSetAmountToDefault(currencies));
      }
      const hasNoAmountError = selectedType === 'member' && behalfType !== 'member' && !clubMembersTotal;
      dispatch(actions.createSetClubMembersNoAmountError(hasNoAmountError, false));
      dispatch(actions.createSetBehalfType(selectedType));

      const foundation = getFoundation(foundations, country.iso2, currency.id, fund.fundId, selectedGrantId, { ...behalf, behalfType: selectedType });
      dispatch(actions.createSetFoundation(foundation));
    },
    toggleBehalfVisibility: bool => {
      dispatch(actions.createSetAmountToDefault(currencies)); // if toggling, reset amount.
      dispatch(actions.createToggleBehalfVisibility(bool));

      const foundation = getFoundation(foundations, country.iso2, currency.id, fund.fundId, selectedGrantId, { ...behalf, behalfVisibility: !behalf.behalfVisibility });
      dispatch(actions.createSetFoundation(foundation));
    },
    setMemberAmount: (id, amount) => {
      dispatch(actions.createSetMemberAmount(id, amount));
    },
  }),
  setAlert: createHandler(actions.createSetAlert),
  toggleSignInFormVisibility: createHandler(
    actions.createToggleSignInFormVisibility,
  ),
  setFixedAmount: createHandler(actions.createSetFixedAmount),
  amountHandlers: ({ dispatch }) => () =>
    createSubhandlers(dispatch, {
      setAmount: actions.createSetAmountAction,
      setCustomAmount: actions.createSetCustomAmount,
      showCustomAmount: actions.createSetShowCustomAmount,
      setFixedAmount: actions.createSetFixedAmount,
      setAmountError: actions.createSetAmountError,
    }),
  setRequestSource: createHandler(actions.createSetRequestSource),
  setAnonymous: createHandler(actions.createSetAnonymous),
  setQpqQuantity: createHandler(actions.createSetQpqQuantity),
  setOverrideDate: createHandler(actions.createSetOverrideDate),
  setNotes: createHandler(actions.createSetNotes),
  setRecognitionDestination: createHandler(actions.createSetRecognitionDestination),
  setRecognitionDestinationName: createHandler(actions.createSetRecognitionDestinationName),
  setRecognitionAddressLine1: createHandler(actions.createSetRecognitionAddressLine1),
  setRecognitionAddressLine2: createHandler(actions.createSetRecognitionAddressLine2),
  setRecognitionAddressLine3: createHandler(actions.createSetRecognitionAddressLine3),
  setRecognitionCity: createHandler(actions.createSetRecognitionCity),
  setRecognitionStateProvince: createHandler(actions.createSetRecognitionStateProvince),
  setRecognitionPostalCode: createHandler(actions.createSetRecognitionPostalCode),
  setRecognitionCountry: createHandler(actions.createSetRecognitionCountry),
  setPresentationDate: createHandler(actions.createSetPresentationDate),
  toggleMultipleDonorVisibility: createHandler(actions.createSetToggleMultipleDonorVisibility),
  toggelOverrideCreditOrgVisibility: createHandler(actions.createSetToggelOverrideCreditOrgVisibility),
  setOccasion: createHandler(actions.createSetOccasion),
  setRecipientName: createHandler(actions.createSetRecipientName),
  setAddressLine1: createHandler(actions.createSetAddressLine1),
  setAddressLine2: createHandler(actions.createSetAddressLine2),
  setAddressLine3: createHandler(actions.createSetAddressLine3),
  setCity: createHandler(actions.createSetCity),
  setProvince: createHandler(actions.createSetProvince),
  setPostalCode: createHandler(actions.createSetPostalCode),
  setMailLetterCountry: createHandler(actions.createSetMailLetterCountry)
});

const withFluxStoreMappedToProps = mapProps(
  ({
    config: {
      fundSelectable,
      recurringEnabled,
      oneTimeEnabled,
      countries,
      currencies,
      funds,
      rates,
      isCloseWidgetEnabled,
      dmiMode,
      dmi,
      dpmMode,
      dpm,
    },
    config,
    dispatch,
    lang,
    state,
    state: {
      reducerApp,
      reducerBehalf,
      reducerBehalf: {
        behalfType,
        clubMembersTotal,
      },
      reducerStaffOnly: {
        requestSource,
        isAnonymous,
        qpqQuantity,
        overrideDate,
        notes,
        recognitionDestination,
        recognitionDestinationName,
        recognitionAddressLine1,
        recognitionAddressLine2,
        recognitionAddressLine3,
        recognitionCity,
        recognitionStateProvince,
        recognitionPostalCode,
        recognitionCountry,
        presentationDate,
        donorType,
        multipleDonorVisibility,
        overrideCreditOrgVisibility,
        occasion,
        recipientName,
        addressLine1,
        addressLine2,
        addressLine3,
        city,
        province,
        postalCode,
        country,
        paymentType,
        paymentAmount
      },
      reducerBillingAddress,
      reducerDedication,
      reducerTransaction,
      reducerError,
      reducerError: {
        dedicationNameError,
        donorNameError,
        recipientEmailError,
      },
      reducerPersonalDetails,
      reducerRaiseNow,
      reducerUi,
      reducerUser
    },
  }) => ({
    isCloseWidgetEnabled: isCloseWidgetEnabled,
    dmi,
    dmiMode,
    dpm,
    dpmMode,
    activeFundTab: reducerUi.activeFundTab,
    alert: reducerUi.alert,
    showAlertButton: reducerUi.showAlertButton,
    amount: behalfType === 'member' ? clubMembersTotal : reducerApp.amount,
    amountError: reducerApp.amountError,
    behalf: reducerBehalf,
    billingAddress: reducerBillingAddress,
    config,
    country: getCountryById(countries, reducerApp.countryId),
    currencies,
    currency: getCurrencyById(currencies, reducerApp.currencyId),
    currencyRecurringEnabled: reducerApp.currencyRecurringEnabled,
    customAmount: reducerApp.customAmount,
    customAmountShown: reducerApp.customAmountShown,
    dedication: {
      ...reducerDedication,
      dedicationNameError,
      donorNameError,
      recipientEmailError,
    },
    dispatch,
    donationDetailsEnabled: config.donationDetailsEnabled,
    donationDetailsVisibility: reducerUi.donationDetailsVisibility,
    donationType: (oneTimeEnabled) ? reducerApp.donationType : 'recurring',
    fixedAmount: reducerApp.fixedAmount,
    foundation: reducerApp.foundation,
    preferredLang: reducerApp.preferredLang,
    createdBy: reducerApp.createdBy,
    frequency: getFrequencyById(reducerApp.recurringFrequencyId),
    // endpolio issue
    // fundWhenNotSelectable - is retured as "1" by Drupal
    // hence converting it to number before sending it further
    fund: config.fundSelectable ? getFundById(funds, reducerApp.selectedFundUniqueId) : getFundById(funds, Number(config.fundWhenNotSelectable)),
    fundSelectable,
    grantsError: reducerError.grantsError,
    interval: reducerApp.recurringInterval,
    lang,
    oneTimeEnabled,
    paymentWorkflowRedirect: reducerApp.paymentWorkflowRedirect,
    personalDetails: reducerPersonalDetails,
    raiseNowCustomerToken: reducerRaiseNow.customerToken,
    raiseNowScriptErrorStatus: reducerRaiseNow.scriptErrorStatus,
    raiseNowSubscriptionId: reducerRaiseNow.subscriptionId,
    raiseNowWidgetId: getWidgetId(getCountryById(countries, reducerApp.countryId), getCurrencyById(currencies, reducerApp.currencyId), reducerApp.foundation),
    raiseNowWidgetIsLoaded: reducerRaiseNow.widgetIsLoaded,
    raiseNowWidgetIsLoading: reducerRaiseNow.widgetIsLoading,
    rates,
    recurringEnabled,
    reducerError,
    selectedGrantId: reducerApp.grantId,
    signInFormVisibility: reducerUi.signInFormVisibility,
    startDateDetails: reducerApp.recurringStartDateDetails,
    stateForDebugging: state,
    transactionData: reducerTransaction.transactionData,
    user: {
      ...reducerUser.user,
      guestContinue: reducerUser.guestContinue,
    },
    userIsLeader: userIsInPrivilegedSecGroup(reducerUser.user),
    staffUseOnly: {
      requestSource,
      isAnonymous,
      qpqQuantity,
      overrideDate,
      notes,
      recognitionDestination,
      recognitionDestinationName,
      recognitionAddressLine1,
      recognitionAddressLine2,
      recognitionAddressLine3,
      recognitionCity,
      recognitionStateProvince,
      recognitionPostalCode,
      recognitionCountry,
      presentationDate,
      donorType,
      multipleDonorVisibility,
      occasion,
      recipientName,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      province,
      postalCode,
      country,
      paymentType,
      paymentAmount,
      multipleDonorVisibility,
      overrideCreditOrgVisibility,
    }
  }),
);

// Set default values from an existing subscription.
const withExistingSubscriptionData = lifecycle({
  componentDidMount() {
    if (!this.props.config.subscriptionEdit) {
      return;
    }

    // Do some loose checking of the data to avoid setting up weird state.
    const dataValidated = validateSubscriptionEditData(this.props.config.countries, this.props.config.currencies, this.props.config.subscriptionData);
    if (dataValidated !== true) {
      console.error('Invalid subscription data provided, falling back to create mode');
      console.error('Error: ', dataValidated);
      return;
    }

    const {
      config: { subscriptionData, funds, countries, currencies, dmiMode, dpmMode },
      dispatch,
      behalf,
      setFund,
      setCountry,
      setCurrency,
      setDonationType,
      setFrequency,
      setFrequencyError,
      setInterval,
      setFixedAmount,
      setRequestSourceError,
      setRequestSource,
      setPreferredLang,
      setCreatedBy,
      setFoundation,
    } = this.props;

    const country = getCountryById(countries, subscriptionData.country.id);
    const currency = getCurrencyById(currencies, subscriptionData.currency.id);
    const fund = getFundById(funds, subscriptionData.fund.id);
    const frequency = getFrequencyByInterval(subscriptionData.frequencyInterval);
    const amounts = getAmountsForCurrency(currency.id);

    setFund(subscriptionData.fund);
    setCountry(country);
    setCurrency(currency);
    setFoundation(country.iso2, currency.id, fund.fundId, null, behalf);

    if (dmiMode || dpmMode) {
      if (subscriptionData.user.preferred_language) {
        setPreferredLang(subscriptionData.user.preferred_language);
      }
      if (subscriptionData.user.created_by) {
        setCreatedBy(subscriptionData.user.created_by);
      }
    }

    // Recurring defaults
    setDonationType(currencies, 'recurring');
    setFrequency(currencies, frequency);
    setFrequencyError(false, false);
    setInterval(subscriptionData.frequencyInterval);
    setRequestSource(subscriptionData.selectedRequestSource);
    setRequestSourceError(false, false);

    // Amount
    const defaultAmounts = amounts.recurring[frequency.id].options;
    if (defaultAmounts.includes(subscriptionData.amount)) {
      setFixedAmount(subscriptionData.amount);
    } else {
      dispatch(actions.createSetCustomAmount(subscriptionData.amount));
    }


    // RaiseNow IDs
    dispatch(actions.createSetRaiseNowSubscriptionId(subscriptionData.subscriptionId));
    dispatch(actions.createSetRaiseNowCustomerToken(subscriptionData.customerToken));

    dispatch(actions.createSetUserAction(subscriptionData.user));
  },
});

/**
 * The RN widget has a method of taking payments which involves redirecting
 * the user away from the page and then back again. The RN widget must be
 * loaded in order to interpret the data on the return journey. For a variety
 * of reasons, we intentionally do not load the RN widget until it's needed so
 * in a redirect workflow, we must force a load.
 */
const withRedirectPaymentWorkflow = lifecycle({
  componentDidMount() {
    const queryString = global.location.search;
    const isPaymentRedirected = new RegExp(/epp_transaction_id/);

    if (!isPaymentRedirected.test(queryString)) {
      return;
    }

    const {
      config: { countries, currencies },
      user,
      setPaymentWorkflowRedirect,
      setCountry,
      setCountryOverridable,
      setCurrency,
      setUser,
      setAlert
    } = this.props;
    const msg = Drupal.t(
      'Please wait...',
    );
    const showAlertButton = false;
    setAlert(msg, showAlertButton)

    setPaymentWorkflowRedirect(true);

    // Detect country/currency from localstorage since this is redirect workflow
    let ct = getCountryById(countries, global.localStorage.getItem('countryId'))
    let cc = getCurrencyById(currencies, global.localStorage.getItem('currencyId'))
    setCountry(ct);
    setCountryOverridable(false);
    setCurrency(cc);

    // Whether the user is actually logged in or not doesn't matter, we just
    // need to get the RN widget loaded.
    setUser({ ...user, guestContinue: true });
  },
});

export default (config, App) => {
  const recomposed = compose(
    withConfig,
    withLang,
    withReducers(config),
    withFluxStoreMappedToProps,
    withActionHandlers,
    withExistingSubscriptionData,
    withRedirectPaymentWorkflow,
  );
  return recomposed(App);
};