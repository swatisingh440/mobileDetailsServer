import React,{Component} from 'react';
import http from "./task9http"
class Task9Dlt extends Component{
    async componentDidMount(){
        const {name}=this.props.match.params;
        console.log(name)
        let response=await http.deleteApi(`/mobiles/${name}`);
        console.log(response)
        this.props.history.push("/mobile")
       
    }
    render(){
        return ""
    }
}
export default Task9Dlt;