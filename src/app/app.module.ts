import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { PayComponent } from './pay/pay.component';
import { RegComponent } from './reg/reg.component';

//* Firebase *//
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';


//** 3rd Party Design **//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxPayPalModule } from 'ngx-paypal';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

 
@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    PayComponent,
    AdminComponent,
    LoginComponent,
    RegComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatMomentDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatSlideToggleModule,
    NgxPayPalModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
