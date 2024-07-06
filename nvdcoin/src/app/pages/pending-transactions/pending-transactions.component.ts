import { Component } from '@angular/core';
import { Transaction } from '../../utils/blockchain';
import { BlockchainService } from '../../services/blockchain.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pending-transactions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pending-transactions.component.html',
  styleUrl: './pending-transactions.component.css'
})
export class PendingTransactionsComponent {

  public pendingTransactions: Transaction[] = [];

  constructor(private blockchainService: BlockchainService) {
    this.pendingTransactions = blockchainService.getPendingTransactions();
  }

  minePendingTransactions() {
    this.blockchainService.minePendingTransactions();
  }
}
