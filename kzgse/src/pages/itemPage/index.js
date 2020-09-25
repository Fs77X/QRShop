import React from 'react';
import '../../App.css';
import '../../App.sass';
import axios from 'axios'
import {
    Redirect,
  } from "react-router-dom";
import { uuid } from 'uuidv4';



class ItemPage extends React.Component{
    constructor(props){
        // const host = window.location.hostname;
        super(props);
        this.state = {
            store:'',
            itemID:'',
            name:'',
            imageURL:'',
            desc:'',
            price:0,
            color:'',
            size:'',
            otherInfo:[],
            redirect:false,
        }

        //this allows for the access of this.props
        this.addCart = this.addCart.bind(this)
        this.handleChangeColor = this.handleChangeColor.bind(this)
        this.handleChangeSize = this.handleChangeSize.bind(this)
    }

    checkCart(){
        const store = this.props.match.params.store
        if(localStorage.hasOwnProperty('cart')){
            let data = JSON.parse(localStorage.cart)
            if(data[0].store !== store){
                localStorage.removeItem('cart')
            }

        }

    }
    

    async getData(){
        //set store and itemID in app state then fetch data 
        await this.setState({store:this.props.match.params.store, itemID: this.props.match.params.itemID})
        const url = 'https://cn3qjkxqxj.execute-api.us-west-2.amazonaws.com/production/get_item?store=' + this.state.store + '&itemID=' + this.state.itemID
        axios.get(url).then((res) => {
            //do the get request using axios and then check if res.data isn't empty
            if(res.data.hasOwnProperty('Item')){
                const infoObj = res.data.Item.info
                for(let key in infoObj){
                    //each product will have name, image and price for sure and the rest of the information is in the default case which is stored in the otherInfo array
                    switch(key){
                        case "name":
                            this.setState({name: infoObj[key]})
                            break
                        case "image":
                            this.setState({imageURL: infoObj[key]})
                            break
                        case "price":
                            this.setState({price: infoObj[key]})
                            break
                        case "desc":
                            this.setState({desc: infoObj[key]})
                            break
                        default:
                            console.log(key)
                            const name = key
                            console.log(infoObj[key])
                            let listOfExtras = this.state.otherInfo
                            let objItem = {
                                [name]: infoObj[key],
                            }
                            listOfExtras.push(objItem)
                            console.log(listOfExtras)
                            this.setState({otherInfo: listOfExtras})
                            break
                    }
                }
            }else{
                alert('uh oh this url is bad whoops, redirecting you to the cart!')
                // this.setState({redirect:true})
                this.props.history.push('/cart/')
            }
        }).catch(function (error) {
            console.log(error);
        })

    }

    componentDidMount(){
        console.log(this.props.match.params.store)
        console.log(this.props.match.params.itemID)
        // this.checkCart()
        this.getData()
    }

    handleChangeColor(e){
        const newColor = e.currentTarget.value
        this.setState({color: newColor})

    }

    handleChangeSize(e){
        this.setState({size: e.currentTarget.value})
    }


    //adds item to local storage and then changes to cart
    addCart(e){
        e.preventDefault()
        //obj is the object stored in localStorage which has information
        let isGood = true
        this.state.otherInfo.map((item) => {
            const key = Object.keys(item)
            if(key[0] === 'Colors'){
                if(this.state.color === ''){
                    alert('Select color please')
                    isGood = false
                }
            }
            else if(key[0] === 'Size'){
                if(this.state.size === ''){
                    alert("Select Size please")
                    isGood = false
                }
            }
            return null
        })

        if(isGood){
            if(localStorage.hasOwnProperty('cart')){
                console.log('cart detected')
                let oldData = JSON.parse(localStorage.cart)
                console.log('oldData ', oldData)
                let data = []
                // data = oldData
                if(!Array.isArray(oldData)){
                    console.log('no array reee')
                    data.push(oldData)
    
                }else{
                    data = oldData
                }
                console.log('data here is ', data)
                const obj = {
                    count:1,
                    url: this.state.imageURL,
                    price: this.state.price,
                    name: this.state.name,
                    store: this.state.store,
                    key: uuid()
                }
                if(this.state.color !== ''){
                    obj.color = this.state.color
                }
                if(this.state.size !== ''){
                    obj.size = this.state.size
                }
                data.push(obj)
                localStorage.setItem("cart", JSON.stringify(data))
    
            } else{
                console.log('cart not detected adding cart')
                const obj = {
                    count:1,
                    url: this.state.imageURL,
                    price: this.state.price,
                    name: this.state.name,
                    store: this.state.store,
                    key: uuid()
        
                }
                if(this.state.color !== ''){
                    obj.color = this.state.color
                }
                if(this.state.size !== ''){
                    obj.size = this.state.size
                }
                let data = []
                data.push(obj)
                localStorage.setItem("cart", JSON.stringify(data))
    
            }
            //redirects to /cart page
            this.props.history.push('/cart/')
            // this.setState({redirect:true})

        }

       
    }

    render(){
        //displays information and button which you can click on
        if(this.state.redirect){
            return(
                <Redirect to= {{
                    pathname:'/cart/',
                }} />
              )
                
        }
        return(
            <div className = 'section'>
                <div className="columns" style={{paddingBottom:'100px'}}>
                    <div className = "column is-4 ">
                        <div className="content">
                            <h1  className='is-size-1'>{this.state.store}</h1>
                            <p className='is-size-4'>{this.state.name}</p>
                            <p className='is-size-5'> ${this.state.price}</p>
                            <p className='is-size-6'> {this.state.desc}</p>
                            {this.state.otherInfo ? this.state.otherInfo.map((item) => {
                                const key = Object.keys(item)
                                if(key[0] === 'Colors'){
                                    return(
                                        <div key={key}>
                                            <p>{key}</p>
                                            <div className='select'>
                                                <select onChange={this.handleChangeColor}
                                                value={this.state.color}
                                                >   
                                                    <option value='' key= ''></option>
                                                    {item[key].map((items) => {
                                                        return(
                                                            <option value={items} key={items}>{items}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        
                                        )
                                    
                                    
                                }else if(key[0] === 'Size'){
                                    return(
                                        <div key={key}>
                                            <p>{key}</p>
                                            <div className='select'>
                                                <select onChange={this.handleChangeSize}
                                                value={this.state.size}
                                                >   <option value='' key= ''></option>
                                                    {item[key].map((items) => {
                                                        return(
                                                            <option value={items} key={items}>{items}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        
                                        )

                                }

                                return null


                                
                                // <div className='select'>
                                //     <p></p>

                                // </div>
                            }): null}
                        </div>
                        
                    </div>
                    <div className="column is-3">
                        <figure className="image is-128x128">
                            <img src={this.state.imageURL} alt={this.state.name}/>  
                            
                        </figure>
               
                    </div>
                    
                </div>
                <button className="button is-primary is-large mt-6" onClick={this.addCart}>Add To Cart</button>

                
              
            </div>
    
            
            
            
        )
    }


}

export default ItemPage;