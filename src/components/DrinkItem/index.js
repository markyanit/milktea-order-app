// References:
// - Updating Parent Component State from Child Component: https://chafikgharbi.com/react-update-parent-child-state/
// - Pushing elements into the order(state) array: https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array

import React from "react";

export default class DrinkItem extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        ice: undefined,
        sweetness: undefined,
        toppings: undefined,
      };
    }
  
    addItem() {
      let addedItem = [];
  
      addedItem.push(
        this.props.name,
        this.state.ice,
        this.state.sweetness,
        this.state.toppings,
        "$" + this.props.price.toFixed(2)
        ); // Adds the specifications for item using the state of each button clicked
        
        this.props.setState(prevState => ({ order: prevState.order.concat([addedItem.join("/")]) })) // Adds specified item to order list

        this.addToTotalPrice(); // Adds price of item to total price

        this.addToTotalItems(); // Increments number of total items in the bag
          
        this.resetItem(); // resets the specificiations states for item selection
    }

    addToTotalPrice() {
        this.props.setState(prevState => ({ totalPrice: prevState.totalPrice + this.props.price}))
    }

    addToTotalItems() {
        this.props.setState(prevState => ({ totalItems: prevState.totalItems + 1}))
    }
  
    resetItem() {
      this.setState({
        ice: undefined,
        sweetness: undefined,
        toppings: undefined,
      });
    }
  
    render() {

      return (
        <div className="drinkitem">
          <h1>{this.props.name}</h1>
          <h2>${this.props.price.toFixed(2)}</h2>
  
          <h6>SPECIFICATIONS: </h6>
          <p>{this.state.ice}</p>
          <p>{this.state.sweetness}</p>
          <p>{this.state.toppings}</p>
  
          <h3>
            ---------------------------------------
              </h3>
          
          <h3>ICE:</h3>
  
          <button onClick={() => this.setState({ ice: "Ice" })}>Ice</button>
  
          <button onClick={() => this.setState({ ice: "No Ice" })}>No Ice</button>
  
          <h3>SWEETNESS:</h3>
  
          <button onClick={() => this.setState({ sweetness: "100% Sweetness" })}>
            100%
          </button>
  
          <button onClick={() => this.setState({ sweetness: "75% Sweetness" })}>
            75%
          </button>
  
          <button onClick={() => this.setState({ sweetness: "50% Sweetness" })}>
            50%
          </button>
  
          <button onClick={() => this.setState({ sweetness: "25% Sweetness" })}>
            25%
          </button>
  
          <h3>TOPPINGS:</h3>
  
          <button onClick={() => this.setState({ toppings: "Boba" })}>
            Boba
          </button>
  
          <button onClick={() => this.setState({ toppings: "Mini Boba" })}>
            Mini Boba
          </button>
  
          <button onClick={() => this.setState({ toppings: "Popping Boba" })}>
            Popping Boba
          </button>
  
          <button onClick={() => this.setState({ toppings: "Lychee Jelly" })}>
            Lychee Jelly
          </button>
  
          <button onClick={() => this.setState({ toppings: "Coffee Jelly" })}>
            Coffee Jelly
          </button>
  
          <button onClick={() => this.setState({ toppings: "Tropical Juice Popper" })}>
          Tropical Juice Popper
          </button>
  
          <h3>
                ---------------------------------------
              </h3>
  
              <button onClick={() => this.addItem()} className="bigButton">ADD TO BAG</button>
        </div>
      );
    }
  }