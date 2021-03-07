import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common-serv.service';

import {Dropdown} from '../../interfaces/dropdown';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  states: Dropdown[];
  gender: Dropdown[];
  profileForm: FormGroup = this.fb.group({
    name: [''],
    age: [null, Validators.compose([Validators.required, this.validateAge.bind(this)])],
    selectedState: [null, Validators.required],
    selectedGender: [null, Validators.required]
  });  ;

  constructor(private router: Router, private fb: FormBuilder, private serv: CommonService) {
    this.states = [
      {name: 'Andhra Pradesh', code: 'AP'},
      {name: 'Gujarat', code: 'GJ'},
      {name: 'Karnataka', code: 'KA'},
      {name: 'Kerala', code: 'KL'},
      {name: 'Maharashtra', code: 'MH'},
      {name: 'Telangana', code: 'TL'},
      {name: 'West Bengal', code: 'WB'}
    ];
    this.gender = [
      {name: 'Male', code: 'M'},
      {name: 'Female', code: 'F'}
    ];
  }

  ngOnInit(): void {
  }
  validateAge(control: FormControl){
    if(control.value <= 0 || control.value > 100){  
      return {'ageValid': true};
    }
    return null;
  }

  submit(){
    if(this.profileForm.valid){
      let userObj = {
        age: this.profileForm.value['age'],
        gender: this.profileForm.value['selectedGender'],
        state: this.profileForm.value['selectedState']
      }
      this.serv.dataShare.next({'user': userObj});
      this.router.navigate(['/taxcalculator']);
    }
  }

}
