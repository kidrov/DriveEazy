import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarlistComponent } from './carlist/carlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './User/register/register.component';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NavbarComponent } from './navbar/navbar.component'; 
import { cardescriptionComponent } from './cardescription/cardescription.component';
import { ConfirmationDialogComponent } from './User/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageCardComponent } from './User/image-card/image-card.component';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';
import { MatMenuModule } from '@angular/material/menu'
import { AuthDbService } from './services/auth-db.service';
import { AddCarComponent } from './add-car/add-car.component';
import { HomeComponent } from './home/home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MycarsComponent } from './Components/mycars/mycars.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ForgotVerificationComponent } from './Components/forgot-verification/forgot-verification.component';
import { NewPasswordCreationComponent } from './Components/new-password-creation/new-password-creation.component';
import {MatNativeDateModule} from '@angular/material/core';
import { AddreviewComponent } from './addreview/addreview.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { AcknoledgmentComponent } from './Components/acknoledgment/acknoledgment.component';
import { AuthGuard } from './auth.guard';
import { TimePipe } from './time.pipe';
import { EditCarComponent } from './edit-car/edit-car.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CarlistComponent,
    BookingHistoryComponent,
    PaymentComponent,
    NavbarComponent,
    cardescriptionComponent,
    ConfirmationDialogComponent,
    ImageCardComponent,
    CarlistComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ForgotVerificationComponent,
    NewPasswordCreationComponent,
    AddreviewComponent,
    ProfileComponent,
    HomeComponent,
    MycarsComponent,
    AcknoledgmentComponent,
    AddCarComponent,
    TimePipe,
    EditCarComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatListModule,
    RouterModule,
    NgxPaginationModule,
    MatMenuModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
  

  ],
  providers: [HttpClient, AuthDbService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
