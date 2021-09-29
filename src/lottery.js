import web3 from "./web3";
import Lottery from "./abi/lottery.js";

const address = "0xB1c5Cf994f259f90e3b14842181253293d69926b";
const abi = Lottery.abi;

export default new web3.eth.Contract(abi, address);
