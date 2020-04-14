import React from 'react';
interface FstBasicInterface {
   msg:string     
}
export default class BasicComponent extends React.Component<FstBasicInterface> {
   
    static defaultProps = {
        msg: 'default!!'
    }
    render () {
        return <div>
            Hi {this.props.msg}
        </div>
    }
}