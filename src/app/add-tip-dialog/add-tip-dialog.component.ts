import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
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

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddTipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tip
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      opponent1: ["", Validators.required],
      opponent2: ["", Validators.required],
      odds1: ["1", [Validators.required, Validators.maxLength(3)]],
      odds2: ["0", [Validators.required, Validators.maxLength(3)]],
      date: [""],
      sport: [""],
      outcome: [""],
      odds: [""],
      submitted: [""]
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (!this.form.invalid) {
      this.form.controls.submitted.setValue(true);
      let predecimal = Number(this.form.controls.odds1.value);
      let decimal = this.form.controls.odds2.value / 10;
      this.form.controls.odds.setValue(predecimal + decimal);
      this.dialogRef.close(this.form.value);
    }
  }

  sportListKeys(): string[] {
    return Object.keys(this.sportList);
  }

  outComesKeys(): string[] {
    return Object.keys(this.outComeList);
  }
}
