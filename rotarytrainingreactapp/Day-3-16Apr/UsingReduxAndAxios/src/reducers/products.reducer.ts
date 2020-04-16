import { PModel } from '../product.model';
export function products(defaultStore: any = [], action: any) { // products

    switch (action.type) {
        case 'ADD_PRODUCT':
            return defaultStore
        case 'DELETE_PRODUCT':
            console.log('=======>DELETE product reducer!');
            // let theId = defaultStore.findIndex((p:PModel) => p.id === action.id)
            return [
               //  ...defaultStore.slice(0, theId),
               //  ...defaultStore.slice(theId+1)
            ]
        case 'INCREMENT_LIKES_PRODUCT':
            let theId = defaultStore.findIndex((p: PModel) => p.id === action.theId)
            return [
                ...defaultStore.slice(0, theId),
                { ...defaultStore[theId], likes: defaultStore[theId].likes + 1 },
                ...defaultStore.slice(theId + 1)
            ]
        case 'Fetch_Data' :
            return action.response
        default:
            return defaultStore
    }
    return defaultStore;
}