import { Component, OnInit, Input } from '@angular/core';
import { TipService, SaveCollectionOutput } from '../tip.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'saved-tips',
  templateUrl: './saved-tips.component.html',
  styleUrls: ['./saved-tips.component.scss']
})
export class SavedTipsComponent implements OnInit {
  @Input() userID: string
  savedCollections$: Observable<any>
  numberOfCollections: number;

  constructor(private tipService: TipService, private snackbar: MatSnackBar) { }

  async ngOnInit() {
    this.savedCollections$ = this.tipService.getSavedCollections(this.userID);
    this.tipService.getNumberSavedCollections(this.userID).subscribe(observer => 
      this.numberOfCollections = observer);
  }

  async saveCurrentSetOfTips(collectionName: HTMLInputElement) {
    let output = await this.tipService.saveCurrentSetOfTips(this.userID, collectionName.value);

    if (output === SaveCollectionOutput.nameInUse) {
      this.snackbar.open("Collection has been overwritten", "Success", {
        duration: 2000, panelClass: ['mat-toolbar']
      });
    } else if (output === SaveCollectionOutput.noNameProvided) {
      this.snackbar.open("Please enter a name for your collection", "Error", {
        duration: 2000, panelClass: ['mat-toolbar']
      });
    } else if (output === SaveCollectionOutput.noTips) {
      this.snackbar.open("Can't save zero tips - add some :)", "Error", {
        duration: 2000, panelClass: ['mat-toolbar']
      });
    } else {
      this.snackbar.open("Collection has been saved!", "Success", {
        duration: 2000, panelClass: ['mat-toolbar']
    })}
  }

  getCollectionSize(id: string): Promise<number> {
    return this.tipService.getCollectionSize(this.userID, id);
  }

  loadCollection(collectionID: string) {
    this.tipService.loadCollection(this.userID, collectionID);
  }

  deleteCollection(collectionID: string) {
    this.tipService.deleteSavedCollection(this.userID, collectionID);
  }

}
