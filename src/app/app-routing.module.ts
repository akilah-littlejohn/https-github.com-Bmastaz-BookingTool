import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { PayComponent } from './pay/pay.component';
import { AdminComponent } from './admin/admin.component'
import {LoginComponent} from './login/login.component'
import {RegComponent} from './reg/reg.component'
const routes: Routes = [
  { path: 'booking', component: BookingComponent },
  { path: 'pay', component: PayComponent },
  { path: 'admin', component: AdminComponent,},
  { path: 'login', component: LoginComponent,},
  { path: 'register', component:RegComponent},
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing:false,
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
