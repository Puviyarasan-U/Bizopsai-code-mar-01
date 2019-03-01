import { Component, Output, EventEmitter, OnInit, AfterContentInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-financial-info-form',
  templateUrl: './financial-info-form.component.html',
  styleUrls: ['./financial-info-form.component.scss']
})
export class FinancialInfoFormComponent implements  OnInit {

  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() talk: EventEmitter<string> = new EventEmitter<string>();

  financialForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.financialForm = this.fb.group({
      cardNumber: null,
      cvv: null,
      expirationMonth: null,
      expirationYear: null
    });
   
    this.formReady.emit(this.financialForm);
  }

  saveFinancialInfo(){

  }

}
