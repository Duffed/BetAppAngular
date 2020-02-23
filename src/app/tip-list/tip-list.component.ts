import { Component, OnInit } from '@angular/core';
import { Tip } from 'src/domain/tip';
import { TipService } from '../tip.service';

@Component({
  selector: 'app-tip-list',
  templateUrl: './tip-list.component.html',
  styleUrls: ['./tip-list.component.scss']
})
export class TipListComponent implements OnInit {
  tips: Tip[];

  constructor(private tipService: TipService) {}

  ngOnInit(): void {
    this.tips = this.tipService.getTips();
  }

}
