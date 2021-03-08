import React from "react";

let drinkItems = [
  { name: "Original Milk Tea", price: 2.5 },
  { name: "Taro Milk Tea", price: 2.75 },
  { name: "Earl Grey Milk Tea", price: 2.5 },
  { name: "Strawberry Milk Tea", price: 2.75 },
  { name: "Hazelnut Milk Tea", price: 2.5 },
  { name: "Thai Milk Tea", price: 2.5 },
  { name: "Honey Milk Tea", price: 2.5 },
  { name: "Mango Milk Tea", price: 2.75 },
  { name: "Tiramisu Milk Tea", price: 2.75 },
  { name: "Jasmine Milk Tea", price: 2.5 },
  { name: "Honeydew Milk Tea", price: 2.75 },
  { name: "Purple Yam Milk Tea", price: 2.75 },
  { name: "Coconut Milk Tea", price: 2.5 },
  { name: "Caramel Milk Tea", price: 2.5 },
];

var order = [];
var totalPrice = 0;

export default class OrderApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeScreen: "mainMenu",
      selectedItem: undefined,
    };
  }

  clearOrder = () => {
    this.setState({ activeScreen: "mainMenu" });
    order.length = 0;
    totalPrice = 0;
  };

  deleteItem = (drink) => {
    this.setState({ selectedItem: drink });

    order.forEach((i) => {
      if (i === drink) {
        if (i.includes("2.75")) {
          totalPrice = totalPrice - 2.75;
        } else {
          totalPrice = totalPrice - 2.5;
        }
        order.splice(i, 1);
      }
    });
  };

  render() {
    let screen;
    switch (this.state.activeScreen) {
      case "mainMenu":
        screen = (
          <div>
            <h1>MILK TEA</h1>
            {drinkItems.map((item) => (
              <button
                onClick={() =>
                  this.setState({
                    activeScreen: "drinkItem",
                    selectedItem: item,
                  })
                }
              >
                {item.name} | ${item.price.toFixed(2)}
              </button>
            ))}
          </div>
        );
        break;
      case "drinkItem":
        screen = (
          <div>
            <DrinkItem {...this.state.selectedItem}></DrinkItem>
            <button onClick={() => this.setState({ activeScreen: "mainMenu" })}>
              Back
            </button>
          </div>
        );
        break;
      case "currentOrder":
        screen = (
          <div>
            <h1>BAG</h1>
            <h6>* CLICK ON ITEM TO REMOVE *</h6>
            <h3>
              ---------------------------------------
            </h3>
            {order.map((drink) => (
              <button onClick={() => this.deleteItem(drink)}>{drink}</button>
            ))}

            <h1>TOTAL: ${totalPrice.toFixed(2)}</h1>
            <button
              onClick={() => this.setState({ activeScreen: "orderConfirm" })}
             class = "bigButton">
              Place Order
            </button>

            <br />

            <button onClick={() => this.clearOrder()}>Cancel Order</button>
          </div>
        );
        break;
      case "orderConfirm":
        screen = (
          <div class="orderconfirm">
            <h1>ORDER CONFIRMED</h1>
            <h3>Order #{Math.floor(Math.random() * 1001)}</h3>
            {order.map((drink) => (
              <p>{drink}</p>
            ))}
            <h3>TOTAL: ${totalPrice.toFixed(2)}</h3>
            <h3>
              ---------------------------------------
            </h3>
            <p>
              Thank you for ordering. Please pick up your order at the counter.
            </p>
            <button onClick={() => this.clearOrder()}>New Order</button>
          </div>
        );
        break;
      default:
        screen = undefined;
    }

    return (
      <div class="App">
        <nav>
          <button
            onClick={() => {
              this.setState({ activeScreen: "mainMenu" });
            }}
          >
            MENU
          </button>
          <button
            onClick={() => {
              this.setState({ activeScreen: "currentOrder" });
            }}
          >
            BAG
          </button>
        </nav>

        {screen}
      </div>
    );
  }
}

export class DrinkItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ice: undefined,
      sweetness: undefined,
      toppings: undefined,
      active: true,
    };
  }

  addItem() {
    let addedItem = [];

    totalPrice = totalPrice + this.props.price;

    addedItem.push(
      this.props.name,
      this.state.ice,
      this.state.sweetness,
      this.state.toppings,
      "$" + this.props.price.toFixed(2)
    );

    order.push(addedItem.join("/"));

    this.resetItem();
  }

  resetItem() {
    this.setState({
      ice: undefined,
      sweetness: undefined,
      toppings: undefined,
      active: false,
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
          {" "}
          Mini Boba
        </button>

        <button onClick={() => this.setState({ toppings: "Popping Boba" })}>
          Popping Boba
        </button>

        <button onClick={() => this.setState({ toppings: "Lychee Jelly" })}>
          {" "}
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

        <button onClick={() => this.addItem()} class="bigButton">ADD TO BAG</button>
      </div>
    );
  }
}
