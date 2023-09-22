import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import http from "./task9http";
import queryString from 'query-string';
import Task9Left from './Task9Left';
class Task9Tble extends Component{
    state={
        mobile:[],
    }
    async fetchData(){
        let queryParams=queryString.parse(this.props.location.search)
        let searchStr=this.makeStr(queryParams)
        let {RAM,ROM,OS,brand}=this.props.match.params;
        let display=this.props.display;
        console.log(searchStr)
        if(display==='mbl'){
        let response=await http.get(`/mobiles?${searchStr}`)
        let {data}=response;
        this.setState({mobile:data})
        console.log(data)}
        else if(display==='ram'){
            let response=await http.get(`/mobiles/${RAM}?${searchStr}`)
        let {data}=response;
        this.setState({mobile:data})
        console.log(data)
        }
        else if(display==='rom'){
            let response=await http.get(`/mobiles/rom/${ROM}?${searchStr}`)
        let {data}=response;
        this.setState({mobile:data})
        console.log(data)
        }
        else if(display==='os'){
            let response=await http.get(`/mobiles/os/${OS}?${searchStr}`)
        let {data}=response;
        this.setState({mobile:data})
        console.log(data)
        }
        else if(display==='brand'){
            let response=await http.get(`/mobiles/brand/${brand}?${searchStr}`)
        let {data}=response;
        this.setState({mobile:data})
        console.log(data)
        }

    }
    async componentDidMount(){
      this.fetchData()
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps!=this.props)
        this.fetchData()
    }
    callURL=(url,options)=>{
        console.log(url,options)
        let searchStr=this.makeStr(options);
        this.props.history.push({
            pathname: url,
            search:searchStr
        })
    }
    handleOptionChange=(options)=>{
        let {brand,ram,rom}=this.props.match.params;
        let display=this.props.display;
        if(display==='mbl')
       this.callURL("/mobile",options)
       else if(display==='ram') this.callURL(`/ram/${ram}`,options)
       else if(display==='rom')  this.callURL(`/rom/${rom}`,options)
       else if(display==='brand')  this.callURL(`/brand/${brand}`,options)
       
    }
    makeStr=(options)=>{
        let {brand,ram,rom,os}=options;
        let searchStr='';
        searchStr=this.addToQueryStr(searchStr,'ram',ram)
        searchStr=this.addToQueryStr(searchStr,'rom',rom)
        searchStr=this.addToQueryStr(searchStr,'os',os)
        searchStr=this.addToQueryStr(searchStr,'brand',brand)
      
       console.log(searchStr)
        return searchStr;
    }
    addToQueryStr=(str,paramName,value)=> (value)? str?`${str}&${paramName}=${value}`:
        `${paramName}=${value}`:str;
    render(){
        const {mobile}=this.state;
        let queryParams=queryString.parse(this.props.location.search)
        console.log(mobile)
        return(<React.Fragment>
            <div className='container'>
                <div className='row'>
                    <div className='col-2'>
                  <Task9Left options={queryParams} onOptionChange={this.handleOptionChange}/>
                    </div>
                    <div className='col-10'>
            <div className="row bg-dark text-white">
                <div className="col-1 border">Name</div>
                <div className="col-2 border">Price</div>
                <div className="col-2 border">Brand</div>
                <div className="col-2 border">RAM</div>
                <div className="col-1 border">ROM</div>
                <div className="col-1 border">OS</div>
                <div className="col-3 border"></div>
            </div>
            {mobile.map((pr)=>{
                return(
                    <div className="row">
                    <div className="col-1 border">{pr.name}</div>
                    <div className="col-2 border">{pr.price}</div>
                    <div className="col-2 border">{pr.brand}</div>
                    <div className="col-2 border">{pr.ram}</div>
                    <div className="col-1 border">{pr.rom}</div>
                    <div className="col-1 border">{pr.os}</div>
                    <div className="col-3 border"><button className="m-2 bg-warning"><Link to={`/newMobile/${pr.name}`}>Edit</Link></button>
                    <button className="m-2 bg-danger"><Link to={`/dlt/${pr.name}`}>delete</Link></button></div>
                </div>
                )
            })}
            </div>
                </div>
            </div>
            </React.Fragment>)
    }
}
export default Task9Tble;