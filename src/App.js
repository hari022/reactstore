import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


import './App.css';
import firebase from './firebase.js';
import Cart from './cart.js';
import Home from './home.js';
import Navbar from "./navbar";

class App extends Component {

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

            <div className='app'>
                <Header />
                <Main />

                {/*<Router>*/}
                    {/*<div>*/}
                        {/*<ul>*/}
                            {/*<li><Link to="/">Home</Link></li>*/}
                            {/*<li><Link to="/cart">Cart</Link></li>*/}
                        {/*</ul>*/}

                        {/*<hr/>*/}

                        {/*/!*<Route exact path="/" component={App}/>*!/*/}
                        {/*<Route path="/cart" component={cart}/>*/}
                    {/*</div>*/}
                {/*</Router>*/}

                {/*<Navbar/>*/}
                {/*<div className='container'>*/}
                    {/*<div className="row">*/}
                        {/*{this.state.iDroidStore.map((item) => {*/}
                            {/*return (*/}
                                {/*<div className="col-sm-6 col-md-4" key={item.name}>*/}

                                    {/*<div className="thumbnail" >*/}
                                        {/*<img className="img_new" src = {item.Img} alt="..."/>*/}
                                        {/*<div className="caption">*/}
                                            {/*<h3>{item.name}</h3>*/}
                                            {/*<p>{item.Description}</p>*/}
                                            {/*<p>OS: {item.OS}</p>*/}
                                            {/*<p>Price: ${item.Price}</p>*/}
                                            {/*<p>{item.cartQuantity}</p>*/}
                                            {/*<p><a className="btn btn-primary"  onClick={() =>this.updateCart(item.name, item.cartQuantity)}>Add to cart</a></p>*/}

                                        {/*</div>*/}
                                    {/*</div>*/}

                                {/*</div>*/}
                            {/*)*/}
                        {/*})}*/}
                    {/*</div>*/}
                {/*</div>*/}

            </div>
        );
    }
}
export default App;
const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/cart' component={Cart}/>

        </Switch>
    </main>
)


// const Home = () => (
//
//     <div>
//         <h1>Welcome to the Tornadoes Website!</h1>
//
//     </div>
// )

// const Cart = () => (
//     <div>
//         <h1>Welcome to the Cart!</h1>
//     </div>
// )

const Header = () => (
    <header>
        <nav>

            <nav className="navbar navbar-inverse ">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand">iDroidStore with React</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/cart'>Cart</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </nav>
    </header>
)



