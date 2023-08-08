require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify")
require("@nomicfoundation/hardhat-network-helpers")
//to check the coverage to which we have tested the code include "solidty-coverage"
require("solidity-coverage")
// require("@nomicfoundation/hardhat-chai-matchers")
require ("dotenv").config()
require("./custom_tasks/task")

const RPC_URL=process.env.RPC_URL;
const PRIVATE_KEY=process.env.PRIVATE_KEY;
const API_KEY=process.env.ETHERSCAN_API_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{},
    sepolia:{
      url:RPC_URL,
      accounts:[PRIVATE_KEY],
      chainId:11155111,
    },
    localhost:{
      url:"http://127.0.0.1:8545/",
      chainId:31337,
      //accounts:[] is not  req as hardhat automatically locates its private key from the node that we are running locally


    },

},
  solidity: "0.8.8",
  etherscan:{
    apiKey:API_KEY,
  },
};
