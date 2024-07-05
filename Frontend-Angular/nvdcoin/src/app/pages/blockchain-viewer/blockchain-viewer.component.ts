import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { BlockViewComponent } from '../../components/block-view/block-view.component';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';
import { Block } from '../../utils/blockchain';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-blockchain-viewer',
  standalone: true,
  imports: [BlockViewComponent, NgForOf, TransactionsTableComponent],
  templateUrl: './blockchain-viewer.component.html',
  styleUrl: './blockchain-viewer.component.css'
})
export class BlockchainViewerComponent implements OnInit {
  public blocks: Block[] = [];
  public selectedBlock: Block;

  constructor(private blockchainService: BlockchainService) {
    this.blocks = blockchainService.getBlocks();
    this.selectedBlock = this.blocks[0];
  }

  ngOnInit(): void {
      
  }

  showTransactions(block: Block) {
    this.selectedBlock = block;
  }
}
