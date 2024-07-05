import { Component, Input } from '@angular/core';
import { Block } from '../../utils/blockchain';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-block-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './block-view.component.html',
  styleUrl: './block-view.component.css'
})
export class BlockViewComponent {

  @Input() public block!: Block;

  constructor() {}
}
