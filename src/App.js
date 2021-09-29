import React from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  state = { manager: "", players: [], balance: "", value: "", message: "" };
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }
  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Waiting for transaction..." });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({ message: "You have been entered in  the lottery!" });
  };
  pickWinner = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Waiting for transaction..." });
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    this.setState({ message: "Winner has been picked!" });
  };
  render() {
    return (
      <div>
        <h2>Lottery contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>Amount of players: {this.state.players.length}</p>
        <p>
          Current pricepool: {web3.utils.fromWei(this.state.balance, "ether")}{" "}
          ETH
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
            <button>Enter</button>
          </div>
        </form>
        <hr />
        <h4>Time to pick a winner?</h4>
        <button onClick={this.pickWinner}>Pick a winner!</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
