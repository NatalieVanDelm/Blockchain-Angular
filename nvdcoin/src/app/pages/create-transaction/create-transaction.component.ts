import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../utils/blockchain';
import { BlockchainService } from '../../services/blockchain.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css'
})
export class CreateTransactionComponent implements OnInit{
 
  public newTx: Transaction = new Transaction();
  public walletKey;

  constructor(private blockchainService: BlockchainService) {
    this.walletKey = blockchainService.walletKeys[0]; //just take first one, can implement multiple keys
  }

  ngOnInit(): void {
    this.newTx = new Transaction();
  }

  createTransaction() {
    this.newTx.fromAddress = this.walletKey.publicKey;
    this.newTx.signTransaction(this.walletKey.keyObj);

    this.blockchainService.addTransaction(this.newTx);

    this.newTx = new Transaction();
  }
}
