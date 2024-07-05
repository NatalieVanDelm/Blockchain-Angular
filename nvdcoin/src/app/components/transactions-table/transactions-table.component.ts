import { Component, Input } from '@angular/core';
import { Transaction } from '../../utils/blockchain';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [NgIf, NgForOf, DatePipe],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css'
})
export class TransactionsTableComponent {

  @Input() public transactions: Transaction[] = [];

  constructor(){}
}
