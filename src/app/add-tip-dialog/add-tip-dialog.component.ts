import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SportEnum, SportLabel } from "src/domain/sport";
import { OutComeEnum, OutComeLabel } from 'src/domain/outcomeEnum';
import fightersJson from './fighters.json' 
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: "add-tip-dialog",
  templateUrl: "./add-tip-dialog.component.html",
  styleUrls: ["./add-tip-dialog.component.scss"],
})
export class AddTipDialogComponent implements OnInit {
  form: FormGroup;
  editMode = false;
  filteredFighters1: Observable<string[]>;
  filteredFighters2: Observable<string[]>;
  fighters: string[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddTipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    }

  ngOnInit(): void {
    if (this.data) {
      // Editmode
      this.editMode = true;
      this.form = this.fb.group({
        opponent1: [this.data.opponent1, Validators.required],
        opponent2: [this.data.opponent2, Validators.required],
        odds: [
          this.data.odds,
          [Validators.required, Validators.maxLength(3)]
        ],
        date: [this.data.date.toDate()],
        sport: [String(this.data.sport)],
        outcome: [String(this.data.outcome)],
        submitted: [""]
      });
    } else {
      this.form = this.fb.group({
        opponent1: ["", Validators.required],
        opponent2: ["", Validators.required],
        odds: ["1.9", [Validators.required, Validators.maxLength(3)]],
        date: [new Date()],
        sport: ["0"],
        outcome: ["0"],
        submitted: [""]
      });
    } 

    this.fighters = fightersJson.fighters;
    this.filteredFighters1 = this.opponent1.valueChanges
      .pipe(
        startWith(''),
        map(fighter => fighter ? this._filterFighters1(fighter) : this.fighters.slice())
      );

    this.filteredFighters2 = this.opponent2.valueChanges
      .pipe(
        startWith(''),
        map(fighter => fighter ? this._filterFighters1(fighter) : this.fighters.slice())
      );
  }

  private _filterFighters1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.fighters.filter(input => input.toLowerCase().indexOf(filterValue) === 0);
  }

  // Getter for Formgroups
  get opponent1() {
    return this.form.get("opponent1");
  }
  get opponent2() {
    return this.form.get("opponent2");
  }
  get odds() {
    return this.form.get("odds");
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (!this.form.invalid) {
      this.form.controls.submitted.setValue(true);
      this.dialogRef.close(this.form.value);
    } else {
      if (this.opponent1.invalid) document.getElementById("opponent1").focus();
      if (this.opponent2.invalid) document.getElementById("opponent2").focus();
      if (this.odds.invalid) document.getElementById("odds").focus();
      document.getElementById("submitButton").focus();

      // Snackbar
      this.snackbar.open("Please fill out all required fields", "Validation Error", {
        duration: 2000, panelClass: ['mat-toolbar']
      });
    }
  }

  getSportKeys(): string[] {
    let list = Object.keys(SportEnum).filter(o => !isNaN(o as any));
    return list;
  }

  getSportLabel(key): string {
    let label = SportLabel.get(+key);
    return label;
  }

  getOutcomeKeys(): string[] {
    let list = Object.keys(OutComeEnum).filter(o => !isNaN(o as any));
    return list;
  }

  getOutcomeLabel(key): string {
    let label = OutComeLabel.get(+key);
    return label;
  }
}
