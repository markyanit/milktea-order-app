import React from "react";
import DrinkItem from "./components/DrinkItem";

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

export default class OrderApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeScreen: "mainMenu",
      selectedItem: undefined,
      order: [],
      totalPrice: 0,
      totalItems: 0,

    };
  }

  clearOrder = () => {
    this.setState({ activeScreen: "mainMenu", order: [], totalPrice: 0, totalItems: 0 });
  };

  deleteItem = (drink) => {
    this.setState({ selectedItem: drink });

    this.state.order.forEach((i) => {
      if (i === drink) {
        if (i[5].includes("2.75")) {
          this.setState({ totalPrice: this.state.totalPrice - 2.75 });
        } else {
          this.setState({ totalPrice: this.state.totalPrice - 2.5 });
        }
        this.state.order.splice(i, 1);
        this.setState({ totalItems: this.state.totalItems - 1 });
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
            <DrinkItem {...this.state.selectedItem} ref={ref => (this.child = ref)} setState={order => this.setState(order)}></DrinkItem>
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
            {this.state.order.map((drink) => (
              <button onClick={() => this.deleteItem(drink)}>{drink}</button>
            ))}

            <h1>TOTAL: ${this.state.totalPrice.toFixed(2)}</h1>
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
            {this.state.order.map((drink) => (
              <p>{drink}</p>
            ))}
            <h3>TOTAL: ${this.state.totalPrice.toFixed(2)}</h3>
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
      <div className="App">
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
            BAG <b id="bag">({this.state.totalItems}) | ${this.state.totalPrice.toFixed(2)}</b>
          </button>
        </nav>
        <br />
        <br />
        {screen}
      </div>
    );
  }
}