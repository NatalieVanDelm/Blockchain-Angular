const {Blockchain, Transaction} = require('./blockchain.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('2622a74d0841d8bf868c3a22d7aa73a37ab39855d97bbc971905c7635dd10447');
const myWalletAddress = myKey.getPublic('hex');

let nvdCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'anotherPublicKey', 10);
tx1.signTransaction(myKey);
nvdCoin.addTransaction(tx1);

nvdCoin.minePendingTransactions(myWalletAddress);

console.log('Balance of 1: ' + nvdCoin.getBalanceOfAddress(myWalletAddress));
