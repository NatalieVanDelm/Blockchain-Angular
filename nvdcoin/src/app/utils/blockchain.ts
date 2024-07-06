import SHA256 from 'crypto-js/sha256';
import { ec, SignatureInput } from 'elliptic';
const secp = new ec('secp256k1');

export class Transaction {
    public fromAddress: string;
    public toAddress: string;
    public amount: number;
    public timestamp: string;
    public signature: SignatureInput = '';

    constructor(fromAddress: string = '', toAddress: string = '', amount: number = 0) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = '07/05/2024';
    }

    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey: ec.KeyPair) {
        if(signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign a transaction for other wallets!');
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'based64'); // sign hash
        this.signature = sig.toDER('hex');
    }

    isValid() {
        if(this.fromAddress === '') return true; // mining reward transaction!

        if(!this.signature || this.signature === '') {
            throw new Error('No signature in this transaction.');
        }

        const publicKey = secp.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

export class Block {
    timestamp: string;
    data: Array<Transaction>;
    previousHash: string;
    hash: string;
    nonce: number;

    constructor (timestamp: string, data: Array<Transaction>, previousHash = '') {
       this.timestamp = timestamp;
       this.data = data;
       this.previousHash = previousHash;
       this.hash = this.calculateHash();
       this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty: number) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }

    hasValidTransactions() {
        for(const tx of this.data) {
            if(!tx.isValid()) {
                return false;
            }
        }

        return true;
    }
}

export class Blockchain {
    chain: Array<Block>;
    difficulty: number;
    pendingTransactions: Array<Transaction>;
    miningReward: number;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block("23/06/2024", [], '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress: string) {
        const rewardTx = new Transaction('', miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now().toString(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        
        console.log("Block succesfully mined!");
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    addTransaction(transaction: Transaction) {
        if(!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address.');
        }

        if(!transaction.isValid()) {
            throw new Error('Transaction must be valid.');
        }

        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address: string) {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.data) {
                if(trans.fromAddress === address) {
                    balance -= trans.amount;
                } else if(trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hasValidTransactions()) {
                return false;
            }

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}