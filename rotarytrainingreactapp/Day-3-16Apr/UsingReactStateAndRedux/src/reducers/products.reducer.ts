export function products (defaultStore:any = [], action:any) {
    console.log('post reducer!')
    switch (action.type) {
        case 'ADD_PRODUCT':
            return defaultStore
        case 'DELETE_PRODUCT':
            return defaultStore
        default :
        console.log('default')
        return defaultStore
    }
    return defaultStore;
}