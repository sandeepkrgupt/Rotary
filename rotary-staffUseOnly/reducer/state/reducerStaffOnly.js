export const initialStateStaffOnly = {
  requestSource: null,
  isAnonymous: false,
  qpqQuantity: '',
  overrideDate: null,
  notes: '',
  recognitionDestination: null,
  recognitionDestinationName: null,
  recognitionAddressLine1: null,
  recognitionAddressLine2: null,
  recognitionAddressLine3: null,
  recognitionCity: null,
  recognitionStateProvince: null,
  recognitionPostalCode: null,
  recognitionCountry: null,
  presentationDate: null,
  donorType: null,
  multipleDonorVisibility: false,
  occasion: null,
  recipientName: null,
  addressLine1: null,
  addressLine2: null,
  addressLine3: null,
  city: null,
  province: null,
  postalCode: null,
  country: null,
  paymentType: null,
  paymentAmount: null,
  multipleDonorVisibility: false,
  overrideCreditOrgVisibility:false,
};

export const reducerStaffOnly = (state = initialStateStaffOnly, action) => {
  switch (action.type) {
    case 'setAnonymous': {
      const { isAnonymous } = action.payload;
      return { ...state, isAnonymous };
    }
    case 'setQpqQuantity': {
      const { qpqQuantity } = action.payload;
      return { ...state, qpqQuantity };
    }
    case 'setOverrideDate': {
      const { overrideDate } = action.payload;
      return { ...state, overrideDate };
    }
    case 'setNotes': {
      const { notes } = action.payload;
      return { ...state, notes };
    }
    case 'setRequestSource':
      return {
        ...state,
        requestSource: action.payload.requestSource
      }
    case 'setRecognitionDestination':
      const { recognitionDestination } = action.payload;
      return {
        ...state,
        recognitionDestination,
        recognitionDestinationName: null,
        recognitionAddressLine1: null,
        recognitionAddressLine2: null,
        recognitionAddressLine3: null,
        recognitionCity: null,
        recognitionStateProvince: null,
        recognitionPostalCode: null,
        recognitionCountry: null,
        presentationDate: recognitionDestination == null ? null : state.presentationDate
      }

    case 'setRecognitionDestinationName':
      const { recognitionDestinationName } = action.payload;
      return {
        ...state,
        recognitionDestinationName,
      }
    case 'setRecognitionAddressLine1':
      const { recognitionAddressLine1 } = action.payload;
      return {
        ...state,
        recognitionAddressLine1,
      }
    case 'setRecognitionAddressLine2':
      const { recognitionAddressLine2 } = action.payload;
      return {
        ...state,
        recognitionAddressLine2,
      }
    case 'setRecognitionAddressLine3':
      const { recognitionAddressLine3 } = action.payload;
      return {
        ...state,
        recognitionAddressLine3,
      }
    case 'setRecognitionCity':
      const { recognitionCity } = action.payload;
      return {
        ...state,
        recognitionCity,
      }
    case 'setRecognitionStateProvince':
      const { recognitionStateProvince } = action.payload;
      return {
        ...state,
        recognitionStateProvince,
      }

    case 'setRecognitionPostalCode':
      const { recognitionPostalCode } = action.payload;
      return {
        ...state,
        recognitionPostalCode,
      }
    case 'setRecognitionCountry':
      const { recognitionCountry } = action.payload;
      return {
        ...state,
        recognitionCountry,
      }

    case 'setPresentationDate':
      const { presentationDate } = action.payload;
      return {
        ...state,
        presentationDate
      }
    case 'setDonorType': {
      return {
        ...state,
        donorType: action.payload.donorType,
      }
    }
    case 'setPaymentType': {
      return {
        ...state,
        paymentType: action.payload.paymentType,
      }
    }
    case 'setPaymentAmount': {
      return {
        ...state,
        paymentAmount: action.payload.paymentAmount,
      }
    }
    case 'setToggleMultipleDonorVisibility': {
      const { multipleDonorVisibility = !state.multipleDonorVisibility } = action.payload;
      return {
        ...state, 
        multipleDonorVisibility
      };
    }
    case 'setToggelOverrideCreditOrgVisibility': {
      const { overrideCreditOrgVisibility } = action.payload;
      return {...state, overrideCreditOrgVisibility };
    }
    case 'setOccasion': {
      const {occasion} = action.payload;
      return {
        ...state, 
        occasion
      };
    }
    case 'setRecipientName': {
      const {recipientName} = action.payload;
      return {
        ...state, 
        recipientName
      };
    }
    case 'setAddressLine1': {
      const {addressLine1} = action.payload;
      return {
        ...state, 
        addressLine1
      };
    }
    case 'setAddressLine2': {
      const {addressLine2} = action.payload;
      return {
        ...state, 
        addressLine2
      };
    }
    case 'setAddressLine3': {
      const {addressLine3} = action.payload;
      return {
        ...state, 
        addressLine3
      };
    }
    case 'setCity': {
      const {city} = action.payload;
      return {
        ...state, 
        city
      };
    }
    case 'setProvince': {
      const {province} = action.payload;
      return {
        ...state, 
        province
      };
    }
    case 'setPostalCode': {
      const {postalCode} = action.payload;
      return {
        ...state, 
        postalCode
      };
    }
    case 'setMailLetterCountry': {
      const {country} = action.payload;
      return {
        ...state, 
        country
      };
    }

    default:
      return state;
  }
};

export const createSetAnonymous = isAnonymous => ({
  type: 'setAnonymous',
  payload: { isAnonymous },
});

export const createSetQpqQuantity = qpqQuantity => ({
  type: 'setQpqQuantity',
  payload: { qpqQuantity },
});

export const createSetOverrideDate = overrideDate => ({
  type: 'setOverrideDate',
  payload: { overrideDate },
});

export const createSetNotes = (notes) => ({
  type: 'setNotes',
  payload: { notes },
})

export const createSetRequestSource = requestSource => ({
  type: 'setRequestSource',
  payload: { requestSource },
});

export const createSetRecognitionDestination = recognitionDestination => ({
  type: 'setRecognitionDestination',
  payload: { recognitionDestination },
});

export const createSetRecognitionDestinationName = recognitionDestinationName => ({
  type: 'setRecognitionDestinationName',
  payload: { recognitionDestinationName },
});
export const createSetRecognitionAddressLine1 = recognitionAddressLine1 => ({
  type: 'setRecognitionAddressLine1',
  payload: { recognitionAddressLine1 },
});
export const createSetRecognitionAddressLine2 = recognitionAddressLine2 => ({
  type: 'setRecognitionAddressLine2',
  payload: { recognitionAddressLine2 },
});
export const createSetRecognitionAddressLine3 = recognitionAddressLine3 => ({
  type: 'setRecognitionAddressLine3',
  payload: { recognitionAddressLine3 },
});
export const createSetRecognitionCity = recognitionCity => ({
  type: 'setRecognitionCity',
  payload: { recognitionCity },
});
export const createSetRecognitionStateProvince = recognitionStateProvince => ({
  type: 'setRecognitionStateProvince',
  payload: { recognitionStateProvince },
});
export const createSetRecognitionPostalCode = recognitionPostalCode => ({
  type: 'setRecognitionPostalCode',
  payload: { recognitionPostalCode },
});
export const createSetRecognitionCountry = recognitionCountry => ({
  type: 'setRecognitionCountry',
  payload: { recognitionCountry },
});

export const createSetPresentationDate = presentationDate => ({
  type: 'setPresentationDate',
  payload: { presentationDate },
});

export const createSetDonorType = donorType => ({
  type: 'setDonorType',
  payload: { donorType },
})

export const createSetPaymentType = paymentType => ({
  type: 'setPaymentType',
  payload: { paymentType }
})

export const createSetPaymentAmount = paymentAmount => ({
  type: 'setPaymentAmount',
  payload: { paymentAmount }
})
export const createSetToggleMultipleDonorVisibility = () => ({
  type: 'setToggleMultipleDonorVisibility',
  payload: {}
});

export const createSetToggelOverrideCreditOrgVisibility = overrideCreditOrgVisibility => ({
  type: 'setToggelOverrideCreditOrgVisibility',
  payload: { overrideCreditOrgVisibility }
});

export const createSetOccasion = (occasion) => ({
  type: 'setOccasion',
  payload: {occasion}
});

export const createSetRecipientName = (recipientName) => ({
  type: 'setRecipientName',
  payload: {recipientName}
});

export const createSetAddressLine1 = (addressLine1) => ({
  type: 'setAddressLine1',
  payload: {addressLine1}
});

export const createSetAddressLine2 = (addressLine2) => ({
  type: 'setAddressLine2',
  payload: {addressLine2}
});

export const createSetAddressLine3 = (addressLine3) => ({
  type: 'setAddressLine3',
  payload: {addressLine3}
});

export const createSetCity = (city) => ({
  type: 'setCity',
  payload: {city}
});

export const createSetProvince = (province) => ({
  type: 'setProvince',
  payload: {province}
});

export const createSetPostalCode = (postalCode) => ({
  type: 'setPostalCode',
  payload: {postalCode}
});

export const createSetMailLetterCountry = (country) => ({
  type: 'setMailLetterCountry',
  payload: {country}
});

export default reducerStaffOnly;