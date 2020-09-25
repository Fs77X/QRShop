import React from 'react';
import '../../App.css';
import '../../App.sass';
import {
    Link,
  } from "react-router-dom";
import {MdPhoneIphone, MdStore, MdPeople} from 'react-icons/md'
class HomePage extends React.Component{
    render(){
        return(
            <div>
                <div className = 'hero is-primary' >
                    <div className ="container">
                        <div className = "hero-body">
                            <h1 className = "title">
                                QRShop
                            </h1>
                            <h2 className ='subtitle'>
                                A new shopping experience for the present and future
                            </h2>
                        </div>
                    </div>
                </div>
                <div className = 'section'>
                    <div className = 'container'>
                        <div className="columns">
                            <div className="column">
                                <div className='box level-item has-text-centered'>
                                    <MdStore size={70}/>
                                    <h1>
                                        Our app allows you to transform your store into a showroom experience
                                    </h1>
                                </div>
                            </div>
                            <div className="column">
                                <div className='box level-item has-text-centered'>
                                    <MdPhoneIphone size={70}/>
                                    <h1>
                                        QR codes allow us to present more detail and allow to save or checkout from cart
                                    </h1>
                                </div>
                            </div>
                            <div className="column">
                                <div className='box level-item has-text-centered'>
                                    <MdPeople size={70}/>
                                    <h1>
                                        Every purchase made notifies both customer and business to make sure orders get ready as soon as possible
                                    </h1>
                                </div>
                            </div>
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

export default HomePage