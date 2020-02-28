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
  ) {
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

  ngOnInit(): void {
    this.form.get("sport").setValue(this.sportList[0]); // not working
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
    }
  }

  sportListKeys(): string[] {
    return Object.keys(this.sportList);
  }

  outComesKeys(): string[] {
    return Object.keys(this.outComeList);
  }
}
