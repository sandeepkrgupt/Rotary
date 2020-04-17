import React, { useEffect, useState } from "react";
import axiox from 'axios'
import Axios from "axios";

const EffectHookComp = () => {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('Loading..')
    useEffect(()=> {
        Axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(
            (response) => {
                setPosts(response.data);
                setMessage("");
            },
            (err) => {console.log(err)}
        )
       
    },[]) // [] used for subscription
    var data = posts.map((i:any)=> <li>{i.title}</li>)
    return (
        <div>
            <h1>{message}</h1>
            <ul>{data}</ul>
        </div>
    )
}

export default EffectHookComp;