import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { tap, first, map, take } from 'rxjs/operators'
import { Router } from "@angular/router";
import { Books, IDictionary } from './Booking';
@Injectable({
  providedIn: 'root'
})

export class FireserviceService {

  item$: Observable<any[]>;
  items$: Observable<any[]>;
  itemRef: AngularFireObject<any>;
  itemRef2: AngularFireList<any>;
  user: Observable<User>;
  Times$: Observable<Books>;
  date: string = new Date().toLocaleDateString();
  ShopName: string = "Blessed Kutz"

  constructor(
    public afauth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase
  ) {
    this.itemRef = db.object(this.date);
  }
  isLoggedIn() {
    return this.afauth.authState.pipe(first())
  }
  signup(email: string, password: string) {
    return this.afauth.auth.createUserWithEmailAndPassword(email, password)

  }
  loginwithEmail(email: string, password: string) {
    return this.afauth.auth.signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }
  login() {
    return this.afauth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    return this.afauth.auth.signOut()

  }
  go() {
    this.router.navigate(['/Booking']);
  }
  getFullList(): Observable<Books[]> {
    var _time
    let d = this.date.split("/")
    let _m = d[0]
    let _d = d[1]
    if (_m.length < 2) {
      _m = '0' + _m
    }
    if (_d.length < 2) {
      _d = '0' + _d
    }
    let fdate = _m + _d + d[2]
    return this.db.list("Blessed Kutz/" + fdate).valueChanges()
  }
  getFilteredTime() {
    var _time
    return this.getFullList().pipe(map(
      booking => booking.filter((n) => {
        _time = Object.entries(n)[0][1].time
        //console.log(`The book ${JSON.stringify(booking)}`)
        return _time
      })
    ))
  }
  save(_data: object, name: string, date: string) {
    date = date.replace(/[^\w\s]/gi, "")
    this.itemRef2 = this.db.list(this.ShopName + "/" + date + "/" + name);
    this.itemRef2.push(_data);
  }
  update(newSize: string, object: any) {
    this.itemRef = this.db.object(object)
    this.itemRef.update({
      size: newSize
    });
  }
  delete() {
    this.itemRef.remove();
  }
  takenSlotz(date: string) {
    return this.itemRef2 = this.db.list("Blessed Kutz/" + date);

  }
}
