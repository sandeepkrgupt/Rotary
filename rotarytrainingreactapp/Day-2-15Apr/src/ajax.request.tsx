import React from 'react';
import axios from 'axios';

export default class PostRequestcall extends React.Component<{},any> {
    constructor(props:any) {
        super(props);
        this.state = {
            allPosts:[]
        }
    }
    componentDidMount() {
        console.log('--------------')
        let apicall = axios.post('https://jsonplaceholder.typicode.com/posts')
        apicall.then(
            (resp)=>{
            console.log('-->', resp.data);
            this.setState({
                allPosts: resp.data
            })
        },
        (err) =>{
            console.log(err);
        })
    }
    
    render () {
        var allPostsList = this.state.allPosts.map((p:any) => <li>{p.title}</li>);
        return (
        <div>{allPostsList}</div>
        )
    }
} 
