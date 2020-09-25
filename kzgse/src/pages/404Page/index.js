import React from 'react';
import '../../App.css';
import '../../App.sass';
import {
    Link,
  } from "react-router-dom";
class ErrorPage extends React.Component{

    render(){
        return(
            <div>
                <div className = 'hero is-primary' >
                    <div className ="container">
                        <div className = "hero-body">
                            <h1 className = "title">
                                QR Kahzum
                            </h1>
                            <h2 className ='subtitle'>
                                Error 404 - Looks like you're lost!
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="container">
                        <div className="buttons">
                            <button className="button is-success"><Link to="/cart/" style={{ textDecoration: 'none' }}> View Cart</Link></button>
                            <button className='button is-link is-light' onClick={() => {alert('Coming soon!')}}>Store login</button>
                        </div>    
                    </div>
         
                </div>
               
            </div>
        )
        
    }

}

export default ErrorPage