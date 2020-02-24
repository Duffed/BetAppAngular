import { Component, OnInit } from '@angular/core';
import { Tip } from 'src/domain/tip';
import { TipService } from '../tip.service';
import { CombinationbetService } from '../combinationbet.service';
import { CombinationBet } from 'src/domain/combinationBet';

@Component({
  selector: 'app-tip-list',
  templateUrl: './tip-list.component.html',
  styleUrls: ['./tip-list.component.scss']
})
export class TipListComponent implements OnInit {
  tips: Tip[];
  combinations: CombinationBet[];

  constructor(private tipService: TipService) {}

  ngOnInit(): void {
    this.tips = this.tipService.getTips();
    this.combinations = this.tipService.calculateWinnings(this.tips, 100);
  }

  onClickAdd() {
    
  }

}
