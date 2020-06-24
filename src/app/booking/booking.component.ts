import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../fireservice.service'
import { NgForm } from '@angular/forms';
import { tap, first, map, take } from 'rxjs/operators'
import * as lo from 'lodash.difference'
import {PayComponent} from '../pay/pay.component'



export interface Client {
  name: string,
  service: string,
  date: string
  time: string
}

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {
  User = false
  currentlist = []
  Name
  Date
  Time
  Service
  ref
  client: Client
  errorMessage
  TS = [
    '8:00 AM',
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 AM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
  ]
  complete
  NotAvailbletimes = []
  AvailableTimes = []
  selectedValue: string;
  selectedCar: string;
  readyForPay = false

  // TODO change ngOnit func to Observable varible and call from html Dom *ngIf = ref$ | async so we get auto unsubscribe
  ref$

  constructor(public fs: FireserviceService) { }

  ngOnInit() {
    this.getdata()
    console.log(lo(''));
  }

  getdata() {
    this.ref = this.fs.getFullList()
      .pipe(
        first(),
        tap(booking => booking.filter((n) => this.NotAvailbletimes.push(Object.entries(n)[0][1].time))
        ))
      .subscribe(
        data => data,
        err => this.errorMessage = err,
        () => {
          this.setFinalList();
          this.complete = true;
        }
      )
    console.log(this.NotAvailbletimes)
  }
  submit(f: NgForm) {
    this.client = f.value;
    let month = f.value.date._i.month+1;
    let day = f.value.date._i.date;
    let year = f.value.date._i.year;
    // let datestring = f.value.date._i.toString();
    // datestring = datestring.split('/');
    // if (datestring[0].length === 1) {
    //   datestring[0] = '0' + datestring[0];
    // }
    // if (datestring[1].length == 1) {
    //   datestring[1] = '0' + datestring[1]
    // }
    //this.Date = datestring[0] + '/' + datestring[1] + '/' + datestring[2];
    if(month.toString().length<2){
      month = '0'+month
    }
    if (day.toString().length<2)
    {
      day = '0'+day
    }
    this.Date = `${month}/${day}/${year}`;
    this.client.date = this.Date;
    console.log(this.client);
    this.fs.save(this.client, f.value.name, this.client.date);
    this.client = null;
  }
  setFinalList() {
    this.AvailableTimes = lo(this.TS, this.NotAvailbletimes);
  }

}
