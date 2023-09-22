import React,{Component} from 'react';
import { Switch,Route } from 'react-router-dom';
import NewTask9 from './newTask9';
import Task9Dlt from './task9Dlt';
import Task9Nav from './task9Nav';
import Task9Tble from './task9Tble';
class Task9 extends Component{
    state={
        brand:['Out of Samsung', 'Xiaomi', 'Realme', 'Apple'],
        RAM:['Out of 3GB', '4GB', '6GB', '8GB'],
        ROM:['Out of 32GB', '64GB', '128GB', '256GB' ],
        OS:['Out of Android', 'iOS'],

    }
    render(){
        const {brand,RAM,ROM,OS}=this.state
        return(
            <React.Fragment>
               <Task9Nav brand={brand} RAM={RAM} ROM={ROM} OS={OS}/>
               <Switch>
                <Route path="/mobile" render={(props)=><Task9Tble {...props} display="mbl"/>}/>
                <Route path="/ram/:RAM" render={(props)=><Task9Tble {...props} display="ram"/>}/>
                <Route path="/rom/:ROM" render={(props)=><Task9Tble {...props} display="rom"/>}/>
                <Route path="/os/:OS" render={(props)=><Task9Tble {...props} display="os"/>}/>
                <Route path="/brand/:brand" render={(props)=><Task9Tble {...props} display="brand"/>}/>
                <Route path="/newMobile/:name" render={(props)=><NewTask9 {...props} brands={brand} RAM={RAM}ROM={ROM} OS={OS}/>}/>
                <Route path="/newMobile" render={(props)=><NewTask9 {...props} brands={brand} RAM={RAM}ROM={ROM} OS={OS}/>}/>
                <Route path="/dlt/:name" render={(props)=><Task9Dlt {...props}/>}/>
               </Switch>
            </React.Fragment>
        )
    }
}
export default Task9;