import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


import './cart.css';
import firebase from './firebase.js';
import Navbar from "./navbar"; // <--- add this line

class Cart extends Component {

    constructor() {
        super();
        this.state = {
            iDroidStore:[]
        }
        this.updateCart = this.updateCart.bind(this);
    }

    updateCart(name, cartQuantity){
        cartQuantity++
        const itemsRef = firebase.database().ref('/iDroidStore/'+name);
        const item = {
            cartQuantity: cartQuantity
        }
        itemsRef.update(item);
    }
    reduceQuantity(name, cartQuantity){
        cartQuantity--
        const itemsRef = firebase.database().ref('/iDroidStore/'+name);
        const item = {
            cartQuantity: cartQuantity
        }
        itemsRef.update(item);
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('/iDroidStore');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            console.log(items);
            let newState = [];
            for (let item in items) {
                if (items[item].cartQuantity>0){
                    newState.push({
                        name:item,
                        OS: items[item].OS,
                        Price: items[item].Price,
                        Description: items[item].Description,
                        cartQuantity: items[item].cartQuantity,
                        Img:items[item].Img
                    });
                }

            }
            this.setState({
                iDroidStore: newState
            });
        });
    }

    render() {
        return (
            <div className='container'>
                <h1>Cart</h1>
                <div className="row">
                    {this.state.iDroidStore.map((item) => {
                        return (

                            <ul>
                                <li>
                                    <div key={item.name}>
                                        {/*<div className="col-md-4" >*/}
                                            {/*<img className="img_cart" src = {item.Img} alt="..."/>*/}
                                        {/*</div>*/}
                                        <div >

                                            <h3>{item.name}</h3>
                                            <p>{item.Description}</p>
                                            <p>OS: {item.OS}</p>
                                            <p>Price: ${item.Price}</p>
                                            <p>{item.cartQuantity}</p>
                                            <p><a className="btn btn-primary"  onClick={() =>this.updateCart(item.name, item.cartQuantity)}>+ Quantity</a></p>
                                            <p><a className="btn btn-danger"  onClick={() =>this.reduceQuantity(item.name, item.cartQuantity)}>- Quantity</a></p>



                                        </div>




                                    </div></li>
                            </ul>

                        )
                    })}
                </div>
            </div>

        );
    }
}
export default Cart;



