import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-helpcenter',
  standalone: false,
  templateUrl: './helpcenter.component.html',
  styleUrls: ['./helpcenter.component.css']
})
export class HelpcenterComponent implements OnInit {
  helpCenterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.helpCenterForm = this.formBuilder.group({
      question: new FormControl(''),
      numOptions: new FormControl('1'),
      option1: new FormControl(''),
      option2: new FormControl(''),
      option3: new FormControl(''),
      status: new FormControl('')
    });
  }

  get optionsCount() {
    return parseInt(this.helpCenterForm.get('numOptions').value, 10);
  }

  get optionFields() {
    return Array(this.optionsCount).fill(0).map((_, index) => `option${index + 1}`);
  }

  onSubmit() {
    console.log(this.helpCenterForm.value);
  }
}
