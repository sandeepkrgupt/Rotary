// these are switch case use in reducer
const INCREMENT_LIKES_PRODUCT = 'INCREMENT_LIKES_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
export function IncreseLike ( ) {
    return {
        type: INCREMENT_LIKES_PRODUCT
    }
}

export function deleteProduct ( ) {
    return {
        type: DELETE_PRODUCT
    }
}

export function addProduct ( ) {
    return {
        type: ADD_PRODUCT
    }
}