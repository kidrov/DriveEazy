import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarlistComponent } from './carlist/carlist.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { cardescriptionComponent } from './cardescription/cardescription.component';
import { AddCarComponent } from './add-car/add-car.component';
import { HomeComponent } from './home/home.component';
import { MycarsComponent } from './Components/mycars/mycars.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ForgotVerificationComponent } from './Components/forgot-verification/forgot-verification.component';
import { NewPasswordCreationComponent } from './Components/new-password-creation/new-password-creation.component';
import { AcknoledgmentComponent } from './Components/acknoledgment/acknoledgment.component';
import { AuthGuard } from './auth.guard';
// import { RegisterComponent } from './User/register/register.component.spec';
import { RegisterComponent } from './User/register/register.component';
import { EditCarComponent } from './edit-car/edit-car.component';




const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path:'cars', component:CarlistComponent, canActivate:[AuthGuard]},
  {path:'cardescription/:carId',component:cardescriptionComponent, canActivate:[AuthGuard]},
  {path:'booking', component:BookingHistoryComponent, canActivate:[AuthGuard]},
  // {path:'payment',component:PaymentComponent},
  {path:'login', component:LoginComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'forgot-verification', component:ForgotVerificationComponent},
  {path:'new-password-creation', component:NewPasswordCreationComponent},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'addcar', component:AddCarComponent, canActivate:[AuthGuard]},
  {path:'mycars', component:MycarsComponent, canActivate:[AuthGuard]},
  {path:'home', component:HomeComponent},
  // {path:'**', component:HomeComponent},
  {path:'', component:HomeComponent},
  {path:'ackno-booking', component:AcknoledgmentComponent, canActivate:[AuthGuard]},
  {path:'ackno-booking/:carId', component:AcknoledgmentComponent, canActivate:[AuthGuard]},
  {path:'edit/:carId', component:EditCarComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
