import { Component, OnInit } from '@angular/core';
import {FireserviceService} from '../fireservice.service'
import {tap,first} from 'rxjs/operators'
import { NgForm,FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public fs: FireserviceService,
    private router: Router,
    ) {}

  title = 'BookingTool';
  User = false
  error:string
  register = false

  ngOnInit(){
    this.fs.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          this.User = true
        } else {
        }
      })
    )
    .subscribe()
  }
  emailRegister(f: NgForm){
    this.fs.signup(f.value.email,f.value.pword)
    .then(function(result) {
      console.log(result.user.tenantId)// should be ‘TENANT_PROJECT_ID’.
   })
   .catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log(errorMessage);
     // ...
   });
  }
  emailLogin(f: NgForm){
    this.fs.loginwithEmail(f.value.email,f.value.pword)
    .then((success)=> {
      console.log("User logged in")
      this.router.navigate(['/booking'])
      // should be ‘TENANT_PROJECT_ID’.
   })
   .catch((error)=> {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log(error.message);
     // ...
   });
  }
  RegisterRegister(){
    if (this.register==true) 
    {
      this.register = false;
    }
    else{
      this.register=true;
    }
    
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  out(){
    this.fs.logout()
    .then((success)=> {
      console.log(success)
      this.router.navigate(['/'])
    })
    .catch((error)=> {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.message);
      // ...
    });
  }

 

}
