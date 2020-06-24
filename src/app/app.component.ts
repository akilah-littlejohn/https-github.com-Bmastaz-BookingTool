import { Component, OnInit } from '@angular/core';
import {FireserviceService} from './fireservice.service'
import {tap,first} from 'rxjs/operators'
import { NgForm,FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    public fs: FireserviceService,
    private router: Router,
    ) {}
  title = 'BookingTool';
  ngOnInit(){}

  out(){
    this.fs.logout()
    .then((success)=> {
      console.log(success)
      this.router.navigate(['/login'])
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
