import { Component, OnInit } from '@angular/core';
import {FireserviceService} from '../fireservice.service'
import {tap,first} from 'rxjs/operators'
import { NgForm,FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
