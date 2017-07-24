import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


import './home.css';
import firebase from './firebase.js';
import Cart from './cart.js';
import Navbar from "./navbar";

class Home extends Component {

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

    componentDidMount() {
        const itemsRef = firebase.database().ref('/iDroidStore');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            console.log(items);
            let newState = [];
            for (let item in items) {
                newState.push({
                    name:item,
                    OS: items[item].OS,
                    Price: items[item].Price,
                    Description: items[item].Description,
                    cartQuantity: items[item].cartQuantity,
                    Img:items[item].Img
                });
            }
            this.setState({
                iDroidStore: newState
            });
        });
    }

    render() {
        return (
            <div className='container'>
                <h1>Home</h1>
                <div className="row">
                    {this.state.iDroidStore.map((item) => {
                        return (

                            <div className="col-sm-6 col-md-4" key={item.name}>

                                <div className="thumbnail" >
                                    <img className="img_new" src = {item.Img} alt="..."/>
                                    <div className="caption">
                                        <h3>{item.name}</h3>
                                        <p>{item.Description}</p>
                                        <p>OS: {item.OS}</p>
                                        <p>Price: ${item.Price}</p>
                                        <p>{item.cartQuantity}</p>
                                        <p><Link to='/cart' ><a  className="btn btn-primary"  onClick={() =>this.updateCart(item.name, item.cartQuantity)}>Add to cart</a></Link></p>

                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>


        );
    }
}
export default Home;
