import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ValidationErrors } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Tip, OutComeEnum } from "src/domain/tip";
import { Sport } from "src/domain/sport";

@Component({
  selector: "add-tip-dialog",
  templateUrl: "./add-tip-dialog.component.html",
  styleUrls: ["./add-tip-dialog.component.scss"]
})
export class AddTipDialogComponent implements OnInit {
  tip: Tip;
  sportList = Sport;
  outComeList = OutComeEnum;
  form: FormGroup;
  edit = false;

  constructor(
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddTipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
      if (this.data) {
        this.form = this.fb.group({
          opponent1: [this.data.opponent1, Validators.required],
          opponent2: [this.data.opponent2, Validators.required],
          odds: [
            this.data.odds,
            [Validators.required, Validators.maxLength(3)]
          ],
          date: [this.data.date],
          sport: [this.data.sport],
          outcome: [this.data.outcome],
          submitted: [""]
        });
      } else {
        this.edit = true;
        this.form = this.fb.group({
          opponent1: ["", Validators.required],
          opponent2: ["", Validators.required],
          odds: ["1.9", [Validators.required, Validators.maxLength(3)]],
          date: [new Date()],
          sport: [""],
          outcome: [""],
          submitted: [""]
        });
      }
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

  sportListKeys(): string[] {
    return Object.keys(this.sportList);
  }

  outComesKeys(): string[] {
    return Object.keys(this.outComeList);
  }
}
