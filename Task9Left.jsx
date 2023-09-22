import React,{Component} from "react";
class Task9Left extends Component{
    state={brands:['Out of Samsung', 'Xiaomi', 'Realme', 'Apple'],
    RAM:['Out of 3GB', '4GB', '6GB', '8GB'],
    ROM:['Out of 32GB', '64GB', '128GB', '256GB' ],
}
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let options=this.props.options
        options[input.name]=this.updateCB(options[input.name],input.
            checked,input.value);
    this.props.onOptionChange(options)
    }
    updateCB=(inpValue,checked,value)=>{
        console.log(inpValue)
        let inpAr=inpValue?inpValue.split(','):[];
        if(checked) inpAr.push(value);
        else{
            let index=inpAr.findIndex(ele=>ele===value);
            if(index>=0)inpAr.splice(index,1);
        }
        console.log(inpAr)
        return inpAr.join(',');
    }
    makeCB=(arr,label,values,name) =>{
    return(<React.Fragment>
        <label className="form-check-label">{label}</label>
                    {arr.map((pr)=>{
                        return(<div className="form-check">
                        <input className="form-check-input" 
                        type="checkbox"
                        name={name} value={pr}
                        checked={values.find((val)=>val===pr)} onChange={this.handleChange}/>
                        <label className="form-check-label">{pr}</label>
                    </div>)
                    })}
    </React.Fragment>)
   }
    render(){
        let {brands,RAM,ROM}=this.state;
        let {brand='',ram='',rom=''}=this.props.options;
        return(
            <div className="container">
             {this.makeCB(brands,'Brands',brand.split(','),'brand')}
             {this.makeCB(RAM,'ram',ram.split(','),'ram')}
             {this.makeCB(ROM,'rom',rom.split(','),'rom')}
            </div>
        )
    }
}
export default Task9Left;