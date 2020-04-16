export function posts (defaultStore:any = [], action:any) {
    switch(action.type) {
        case 'INCREMENT_LIKES_PRODUCT' :
            return defaultStore
        default:
            return defaultStore
    }
    return defaultStore;
}