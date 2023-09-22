import React,{Component} from 'react';
import {Link} from "react-router-dom"
class Task9Nav extends Component{
    render(){
        const {brand,RAM,ROM,OS}=this.props;
        return(
            <React.Fragment>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            
            <li className="nav-item">
              <Link className="nav-link" to="/mobile">
                Mobiles
              </Link>
            </li>
            <li className="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Brand
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {brand.map((pr)=>{
            return (<Link className="dropdown-item" to={`/brand/${pr}`}>{pr}</Link>)
          })}
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          RAM
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {RAM.map((pr)=>{
            return (<Link className="dropdown-item" to={`/ram/${pr}`}>{pr}</Link>)
          })}
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ROM
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {ROM.map((pr)=>{
            return (<Link className="dropdown-item" to={`/rom/${pr}`}>{pr}</Link>)
          })}
        </div>
        </li>
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          OS
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {OS.map((pr)=>{
            return (<Link className="dropdown-item" to={`/os/${pr}`}>{pr}</Link>)
          })}
        </div>
      </li>
      <li className="nav-item">
              <Link className="nav-link" to="/newMobile">
                New Mobiles
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    
            </React.Fragment>
        )
    }
}
export default Task9Nav;