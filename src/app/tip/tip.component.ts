import { Component, OnInit, Input } from '@angular/core';
import { Tip } from 'src/domain/tip';
import { TipService } from '../tip.service';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {
  @Input() tip: Tip;
  constructor(private tipService: TipService) { }

  ngOnInit(): void {
  }

  clickWinToggle(tip) {
    this.tipService.toggleMarkedAsWin(tip);
  }

  deleteTip(tip) {
    this.tipService.removeTip(tip);
  }

}
