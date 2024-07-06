import { Component } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';
import { Blockchain } from '../../utils/blockchain';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  public blockchain: Blockchain;

  constructor(private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchainInstance;
  }

}
