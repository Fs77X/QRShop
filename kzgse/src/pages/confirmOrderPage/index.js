import React from 'react';
import '../../App.css';
import '../../App.sass';
import {
  Link,
} from "react-router-dom";

class confirmationPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          itemList: [],
        }
    
    }

    componentDidMount(){
      try{
        console.log('passed props: ', this.props.location.state.id)
        this.setState({itemList: this.props.location.state.id})

      }catch{
        alert("you're not supposed to be here, redirecting you to cart!")
        this.props.history.push('/cart/')
      }

    }

    aggregate(arr){
      let agg = {}
      arr.forEach((item)=>{
        var store = item.store
        agg[store] ? agg[store].push(item) : agg[store] = [item]
        
      })
      
      return agg;
    
    }

    render(){
        return(
          <div>
            <div className = 'hero is-primary' >
              <div className ="container">
                <div className = "hero-body">
                      <h1 className = "title">Items Purchased
                    </h1>
                      <h2 className ='subtitle'>Items and Information Sent to Store Owner</h2>
                </div>
              </div>
            </div>
            <div className = 'section'>
              <div className = 'container'>
                <div className = "columns">
                    <div className = 'column'>
                      
                      {this.state.itemList.length > 0 ?
                      Object.keys(this.aggregate(this.state.itemList)).map((store) =>{
                        var agg = this.aggregate(this.state.itemList);
                        var storeIts = agg[store];
                        return (
                          <div className='box' key={store}>
                            
                            <h2 className ="is-size-2">{store}</h2> {/*<button className="delete is-large" onClick={()=>this.deleteStore(store)}></button>  don't think we need to delete a store?*/}
                            {storeIts.map((item) =>{
                            return (
                              <div className = "content" key={item.key}>
                                
                                  <h3>{item.name} </h3>
                                  <h4>${item.price}</h4>
                              </div>                  
                            )})}

                          </div>
                      
                    )
                  }
                  ): <h1>Looks like you're not suppoosed to be here!</h1> 
                  }
                
                    
                  </div>
                </div>  
              </div>
            </div>
            <div className="section">
              <div className="container">
                  <div className="buttons">
                    <button className="button is-success"><Link to="/cart/" style={{ textDecoration: 'none' }}> View Cart</Link></button>
                  </div>    
              </div>
            </div>
          </div>

        
      
        )
    }
}


export default confirmationPage