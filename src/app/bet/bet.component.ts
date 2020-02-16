import { Component, OnInit, Input } from '@angular/core';
import { Bet } from 'src/domain/bet';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit {

  @Input() bet: Bet;
  
  constructor() { }

  ngOnInit(): void {
  }

}
