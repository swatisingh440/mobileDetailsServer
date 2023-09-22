import React,{Component} from "react";
import http from './task9http';
import { Link } from "react-router-dom";
class NewTask9 extends Component{
    state={
        newMbl:{name:'',price:'',brand:'',ram:'',rom:'',os:''},
        edit:false
    }
    async fetchData(){
        const {name}=this.props.match.params;
        console.log(name)
        if(name){
            let response1=await http.get(`/mobiles/name/${name}`);
            let {data}=response1;
            console.log(data)
            this.setState({newMbl:data[0],edit:true})
            
        }
        else{
        let  newMbl={name:'',price:'',brand:'',ram:'',rom:'',os:''} ;
           this.setState({newMbl:newMbl,edit:false})
        }
    }
    async componentDidMount(){
        this.fetchData()
    }
    async componentDidUpdate(prevProps,prevState){
        if(prevProps!=this.props)
        this.fetchData()
    }
    async putData(url,obj){
        let response=await http.put(url,obj)
        console.log(response)
        this.props.history.push("/mobile");
    }
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let s1={...this.state};
        s1.newMbl[input.name]=input.value;
        this.setState(s1);
    }
    async postData(url,obj){
        let response=await http.post(url,obj)
        console.log(response)
        this.props.history.push("/mobile");
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let {newMbl,edit}=this.state;
        edit?this.putData(`/mobiles/${newMbl.name}`,newMbl):
        this.postData("/mobiles",newMbl)
    }
    makeDropDown=(arr=[],value,name,label)=>{
        return(
            <div className='form-group'>
                <label>{label}</label>
                <select className='form-control'
                name={name}
                value={value} onChange={this.handleChange}>
                    <option value="">{label}</option>
                    {arr.map((opt)=><option>{opt}</option>)}
                </select>
            </div>
        )
    }
    render(){
        const {brands,RAM,ROM,OS}=this.props;
        let {name,price,brand,ram,rom,os}=this.state.newMbl;
        console.log(this.state.newEmp)
        return(
            <div className="container">
                <div className='form-group'>
                    <label>Name</label>
                    <input type="text" className='form-control'
                    id="name" name="name" placeholder='Enter name'
                    value={name} onChange={this.handleChange}/>
                </div>
                <div className='form-group'>
                    <label>Price</label>
                    <input type="text" className='form-control'
                    id="price" name="price" placeholder='Enter price'
                    value={price} onChange={this.handleChange}/>
                </div>
                {this.makeDropDown(brands,brand,'brand','brand')}
                {this.makeDropDown(RAM,ram,'ram','RAM')}
                {this.makeDropDown(ROM,rom,'rom','rom')}
                {this.makeDropDown(OS,os,'os','os')}
              
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}
export default NewTask9;