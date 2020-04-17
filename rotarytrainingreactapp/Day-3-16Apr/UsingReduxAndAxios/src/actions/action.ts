import { PModel } from "../product.model"

// these are switch case use in reducer
const INCREMENT_LIKES_PRODUCT = 'INCREMENT_LIKES_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const Fetch_Data = 'Fetch_Data'

export function IncreseLike (theIdOfPdtLiked:number ) { 
//IncreseLike should be same as in ListOfProductComponent.tsx
    return {
        type: INCREMENT_LIKES_PRODUCT, theIdOfPdtLiked
        // OR payload : theId
    }
}

export function deleteSelectedProduct (theIdOfPdtToDelete:number) {
    return {
        type: DELETE_PRODUCT, 
        payload: theIdOfPdtToDelete
    }
}

export function addProduct ( ) {
    return {
        type: ADD_PRODUCT
    }
}

export function FetchData ( responseProductData:PModel) {
    return {
        type: Fetch_Data, 
        payload: responseProductData
    }
}