import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar'
import ProductTable from './ProductTable'
import Home from './Home'
import User from './User'
import About from './About'

import { BrowserRouter, Route, Link, NavLink, Redirect} from 'react-router-dom'

class FilterableProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      loggedIn: false
    };
  
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.loginHandle = this.loginHandle.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  loginHandle(){
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <NavLink to="/" exact activeStyle={{color:'green'}}> Home </NavLink>
        <NavLink to="/about" exact activeStyle={{color:'green'}}> About </NavLink>
        <NavLink to="/search" exact activeStyle={{color:'green'}}> Search </NavLink>
        <NavLink to="/User/Brittany" exact activeStyle={{color:'green'}}> User </NavLink>
        <input type="button" value={this.state.loggedIn ? 'Log Out' : "Log In" } onClick={this.loginHandle} />

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Thinking In React</h1>
          </header>

            <Route  path="/" exact strict component={Home} />

            <Route  path="/about" exact strict component={About} />
         
            <Route path='/search' exact strict render={
              () => {
                return (
                this.state.loggedIn ? (
                <div> 
                  <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                  />
                  <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                  />
                  </div>) : (<Redirect to="/"/>))
              }
            }/>

            <Route  path="/user/:username" exact strict render={({match}) => (
              this.state.loggedIn ? (<User username= {match.params.username}/> ) : (<Redirect to="/"/>) 
            )} />
      
        </div>
      </BrowserRouter>
    );
  }
}

export default FilterableProductTable;
