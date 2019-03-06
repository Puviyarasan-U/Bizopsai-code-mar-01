import { Component, Output, EventEmitter, OnInit, Input, } from '@angular/core';
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
  user_name: any;
  user_id: any;



  constructor(private fb: FormBuilder,) {}

  ngOnInit() {
    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;
       // this.isUser = true;
      }
    }
    

  }
  saveFinancialInfo(){

  }

}
