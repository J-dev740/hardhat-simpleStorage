// const { network } = require("hardhat")
//import task method to define the task and give params to .setAction(async (taskArgs,hre))
const {task}= require("hardhat/config")

task("getBlockNumber","get the last mined block_no: in a chain").setAction(async (taskArgs,hre)=> {
    const ChainId=hre.network.name
    
    const block_no=await hre.ethers.provider.getBlockNumber()
console.log(`current network name:${ChainId}`)
console.log(`\n current block number : ${block_no}`)



})