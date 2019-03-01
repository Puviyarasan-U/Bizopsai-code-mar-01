import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tenant-register',
  templateUrl: './tenant-register.component.html',
  styleUrls: ['./tenant-register.component.scss']
})
export class TenantRegisterComponent implements OnInit {

  @ViewChild('tab') public tabs: NgbTabset;
  checkoutForm: FormGroup;
  constructor(private fb: FormBuilder,) { }

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      fullName: ['']
    })
  }

  formInitialized(name: string, form: FormGroup) {
    this.checkoutForm.setControl(name, form);
  }

  talkBack(e: string) {
  
   console.log(e);
   this.tabs.select(e);
  }

}
