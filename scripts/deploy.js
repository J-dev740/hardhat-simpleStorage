// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const {ethers, run, network } = require("hardhat");
require("dotenv").config()

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log(`deploying contract ... please wait`)
  const contract = await simpleStorageFactory.deploy()
  await contract.waitForDeployment()
  let address = await contract.getAddress()
  console.log( `contract deployed to  address:${address}`)

  if(network.config.chainId===11155111 && process.env.PRIVATE_KEY )
{ 
  console.log(`waiting for block conformations...`)
  //it shows some error as we are not waiting enough time for etherscan to getupdated with our transactions even though we have asked to wait for 40 block conformations
  await contract.deploymentTransaction().wait(40)
  console.log(`verifying contract at address:${address}....`)
  await verify(address,[])
}
await contract.store(10)
let current_fav_no=await contract.retrieve()
console.log(`current_fav_no:${current_fav_no}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const verify = async (contract_address,Constructor_args)=>{
  try {
    //params of run : <task:subtask>, {positional_arguments...},...
    await run("verify:verify",{address:contract_address,constructor_args:Constructor_args},)
      } catch (e) {
          if(e.message.toLowerCase().includes("already verified"))
          console.log("Already verified !")
          else 
          console.log(e)
        
                  }
}



main()
.then(()=>process.exit(0))
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
