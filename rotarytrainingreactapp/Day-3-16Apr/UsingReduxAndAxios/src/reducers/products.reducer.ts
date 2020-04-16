import { PModel } from '../product.model';
export function products(defaultStore: any = [], action: any) { // products

    switch (action.type) {
        case 'ADD_PRODUCT':
            return defaultStore
        case 'INCREMENT_LIKES_PRODUCT':
            var theIndex = defaultStore.findIndex((p: PModel) => p.id === action.theId)
            return [
                ...defaultStore.slice(0, theIndex),
                { ...defaultStore[theIndex], likes: defaultStore[theIndex].likes + 1 },
                ...defaultStore.slice(theIndex + 1)
            ]
        case 'DELETE_PRODUCT':
            console.log('=======>DELETE product reducer!');
            theIndex = defaultStore.findIndex((p: PModel) => p.id === action.theId)
            return [
                ...defaultStore.slice(0, theIndex),
                ...defaultStore.slice(theIndex + 1)
            ]

        case 'Fetch_Data':
            return action.response
        default:
            return defaultStore
    }
    return defaultStore;
}