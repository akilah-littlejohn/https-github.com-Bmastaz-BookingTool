import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FireserviceService } from '../fireservice.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public fs: FireserviceService) { }

  ngOnInit(): void {
  }
  submit(f: NgForm) {

  }
}
