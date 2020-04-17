import React, {useState} from 'react';
interface ICounter {
    initialCount:number
}
const CountComp = (props:ICounter) => {
    const [count, setCount] = useState(props.initialCount);
    return (
        <div>
            <button onClick={()=> setCount(count+1)}>{count}</button>
        </div>
    )
}

export default CountComp;