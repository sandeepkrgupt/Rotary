import ProductModel from "../product.model";


export function products(defStore: any = [], action: any) {
   
    switch(action.type){
     
        case 'INCREMENT_LIKES':
            // console.log('Inside INCREMENT_LIKES case.. (products reducer)');
        
            // biz logic to increment the likes !
            // store is immutable !!
        var theIndex = defStore.findIndex(
            (p:ProductModel)=>p.id === action.theId);
            return [
                ...defStore.slice(0,theIndex),
                {...defStore[theIndex],likes:defStore[theIndex].likes + 1},
                ...defStore.slice(theIndex+1)
            ];        
        case 'DELETE_PRODUCT':
            theIndex = defStore.findIndex(
                (p:ProductModel)=>p.id === action.theId);
                return [
                    ...defStore.slice(0,theIndex),                   
                    ...defStore.slice(theIndex+1)
                ];  
        case 'FETCH_PRODUCTS':  
            return action.response; //  new store !
      default:      
          return defStore;
    }
}