import { Component, OnInit, Input } from '@angular/core';
import { TipService } from '../tip.service';

@Component({
  selector: 'saved-tips',
  templateUrl: './saved-tips.component.html',
  styleUrls: ['./saved-tips.component.scss']
})
export class SavedTipsComponent {
  @Input() userID: string

  constructor(private tipService: TipService) { }

  saveCurrentSetOfTips(collectionName: HTMLInputElement) {
    this.tipService.saveCurrentSetOfTips(this.userID, collectionName.value);
  }

}
