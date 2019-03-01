import { Component, Output, EventEmitter, OnInit, AfterContentInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { LandlordService } from '../../services/landlord.service';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements  OnInit {

  @Output() formReady = new EventEmitter<FormGroup>()
  @Output() talk: EventEmitter<any> = new EventEmitter<any>();

  @Input('personal') public personal: FormGroup;

  
  personalInfoForm: FormGroup;
  submitted=false;
  user_name: any;
  user_id: any;
  isInitiated= false;

  constructor(private fb: FormBuilder, private landlord:LandlordService) { }

  ngOnInit() {

    if (sessionStorage.length) {
      if (sessionStorage.getItem("Bizops_User")) {
        let userdata = JSON.parse(sessionStorage.getItem("Bizops_User"));
        this.user_name = userdata.USER_FIRSTNAME;
        this.user_id = userdata.ID;      
      }
    } 
  }

  get f() {
    return this.personal.controls;
  }

  savePersonalInfo(){
    this.submitted = true;
    if(this.personal.invalid ) {
      alert('Please Fill All The Fields !!!');
      return;
    } else {
      this.personal.patchValue({
        UserID:this.user_id,
        UserType: 3
      })
      this.landlord.insertPersonalInfo(this.personal.value).subscribe(
        data => {                 
          var res = data;
          if (res > 0) { 
            this.talk.emit('1');
          }
        },
        error => {
          alert("Server Error Please Try After Sometime!!!");
          console.log(error);
        }
      );
    }   
  }

}
