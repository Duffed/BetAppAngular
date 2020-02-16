import { Component, OnInit, Input } from '@angular/core';
import { Bet } from 'src/domain/bet';
import { BetService } from '../bet.service';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit {

  @Input() bet: Bet;
  
  constructor(private betService: BetService) { }

  ngOnInit(): void {
  }

  removeBet(bet: Bet) {
    this.betService.removeBet(bet);
  }

}
