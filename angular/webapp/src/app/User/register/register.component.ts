import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/User/user.service';
import { User } from 'src/app/User/Usermodel/user.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/User/confirmation-dialog/confirmation-dialog.component';

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && (control.invalid && (control.touched || isSubmitted)));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  @ViewChild('registrationForm') registrationForm!: NgForm;

  hidePassword = true;
  hideConfirmPassword = true;

  usernameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  matcher = new CustomErrorStateMatcher();
  isSubmitted = false; // Flag to track form submission

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  registerUser() {
    const userData = {
      userName: this.usernameFormControl.value!,
      emailId: this.emailFormControl.value!,
      password: this.passwordFormControl.value!,
      confirmPassword: this.confirmPasswordFormControl.value!,
      phoneNo:1111111111,
      userId:0,
      imageData:null
    };

    // Send the JSON data to your API
    this.userService.registerUser(userData).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.showSuccessNotification('Registration successful!'); // Show success notification
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }

  submitButton() {
    const allFieldsValid = // Check if all fields are valid
      this.usernameFormControl.valid &&
      this.emailFormControl.valid &&
      this.passwordFormControl.valid &&
      this.confirmPasswordFormControl.valid;

    if (allFieldsValid && !this.isSubmitted) {
      // Show a confirmation dialog
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '450px',
        data: {
          message: 'Are you sure you want to submit the registration?',
          confirmText: 'Submit', // Text for the confirm button
          cancelText: 'Cancel', // Text for the cancel button
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          
          this.registerUser();
          this.isSubmitted = true; 
        } else {
          
        }
      });
    }
  }

  showSuccessNotification(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 15000; 
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top'; 
    config.panelClass = ['custom-snackbar-class']; 
    const snackBarRef = this.snackBar.open(message, 'Close', config);

    snackBarRef.afterDismissed().subscribe(() => {
      
      this.usernameFormControl.reset();
      this.emailFormControl.reset();
      this.passwordFormControl.reset();
      this.confirmPasswordFormControl.reset();
    });
  }

  onCancel() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to cancel the registration?',
        confirmText: 'Yes', 
        cancelText: 'No', 
      },
      
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/']);
      } else {
        // User canceled the cancellation action, do nothing
      }
    });
  }
}
 