import { Component, OnInit } from '@angular/core';
import { UserService } from '../User/user.service';
import { User } from 'src/app/User/Usermodel/user.model';
import { UserUpdateData } from './user-update-data.model';
import { Router } from '@angular/router';
import { AuthDbService } from '../services/auth-db.service';
import { changepass } from '../models/changepass';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile!: User;
  isEditingProfile: boolean = false;
  isChangingPassword: boolean = false;
  editedUser: UserUpdateData = {
    userName: '',
    phoneNo: 0,
    userId:0,
    emailId: '',
    password: '',
    confirmPassword: ''
  };
  
  passwordChangeData: changepass = {
    email: '',
    oldPassword: '',
    newPassword: ''
  };

  passwordInputType: { oldPassword: string; newPassword: string } = {
    oldPassword: 'password',
    newPassword: 'password'
  };

  togglePasswordVisibility(field: 'oldPassword' | 'newPassword'): void {
    this.passwordInputType[field] =
      this.passwordInputType[field] === 'text' ? 'password' : 'text';
  }
  
  email: string = "";
  selectedImage: File | null = null;
  userImageSrc: string = '';
  constructor(private apiService: UserService, private router: Router, private authDbService: AuthDbService ) { }

  ngOnInit(): void {
    const userEmail = localStorage.getItem('logedin_user_email');

    if (userEmail) {
      this.apiService.getUserProfile(userEmail).subscribe((data: User) => {
        this.userProfile = data;
      });
    }
  }


  navigateToMyCarsPage(): void {
    this.router.navigate(['/mycars']);
  }
  
  toggleEditMode(): void {
    this.isEditingProfile = !this.isEditingProfile;
    this.isChangingPassword = false;
    if (!this.isEditingProfile) {

      this.editedUser = {
        userName: '',
        phoneNo: 0,
        userId:0,
        emailId: '',
        password: '',
        confirmPassword: ''
      };
    }
  }

  togglePasswordChange(): void {
    this.isChangingPassword = !this.isChangingPassword;
    this.isEditingProfile = false;
  }

  updateProfile(): void {
    console.log('Update profile button clicked.');
    const userEmail = localStorage.getItem('logedin_user_email');

    if (userEmail) {
      const userId = this.userProfile.userId; // Extract userId from userProfile
      const existingEmailId = userEmail;
      const updatedUserData: UserUpdateData = {
      userId: this.userProfile.userId, // Include the userId
      userName: this.editedUser.userName,
      emailId: existingEmailId,
      password: this.userProfile.password, // Include the existing password
      confirmPassword: this.userProfile.confirmPassword, // Include the existing confirmPassword
      phoneNo: this.editedUser.phoneNo
      };

      this.apiService.updateUserProfile(updatedUserData, userEmail).subscribe(
        (response) => {
          if (response=200) {
            this.userProfile.userName = this.editedUser.userName;
            this.userProfile.phoneNo = this.editedUser.phoneNo;
            this.isEditingProfile = false;
            window.location.reload();
          } else {
            console.log('Update failed. Response:', response); // Log the API error message
            // Handle error
          }
        },
        (error: any) => {
          console.log('Update error:', error); // Log any HTTP error
          // Handle error
        }
      );
    } else {
      // Handle missing email in local storage
    }
  }


  // Handle image selection
  onImageSelected(event: any): void {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Validate file type
      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExtension = selectedFile.name.toLowerCase().substr(selectedFile.name.lastIndexOf('.'));

      if (!allowedExtensions.includes(fileExtension)) {
        // Display a validation error message to the user
        console.log('Invalid file format. Supported formats: .jpg, .jpeg, .png');
        return;
      }

      // Validate image dimensions
      const image = new Image();
      image.src = URL.createObjectURL(selectedFile);

      image.onload = () => {
        if (image.width > 400 || image.height > 400) {
          // Display a validation error message to the user
          console.log('Image dimensions must be a maximum of 400x400');
          return;
        }

        // If validation passes, update the selected image
        this.selectedImage = selectedFile;
        this.uploadImage();

      };
    }
  }

  uploadImage(): void {
    const userEmail = localStorage.getItem('logedin_user_email');

    if (userEmail && this.selectedImage) {
      console.log('Image Inside.');
      const formData = new FormData();
      formData.append('image', this.selectedImage!);

      this.apiService.uploadProfileImage(formData, userEmail).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Image uploaded successfully.'); 
          } else {
            console.log('Image upload failed. Response:', response); 
            // Handle error
          }
        },
        (error: any) => {
          console.log('Image upload error:', error); 
        }
      );
    } else {
      // Handle missing email or selected image
    }
  }

  changePassword(): void {
    // Retrieve the email ID from local storage
    const emailId = localStorage.getItem('logedin_user_email');
  
    // Check if the email ID is present in local storage
    if (emailId) {
      // Set the email property in the passwordChangeData object
      this.passwordChangeData.email = emailId;
  
      // Make the API request with passwordChangeData
      this.authDbService.change_password(this.passwordChangeData).subscribe(
        (response) => {
          if (response = 'Password Changed Successfully') {
            // Password change successful
            console.log('Password Changed Successfully');
  
            // Log out the user and redirect to the login page
            localStorage.removeItem('token'); // Clear the authentication token
            localStorage.removeItem('logedin_user_email'); // Clear the stored email
  
            // Show success notification if needed
            // Redirect to the login page
            this.router.navigate(['/login']);
          } else {
            // Password change failed
            console.log('Password Change Failed');
            // You can handle the error or display an error message
          }
        },
        (error: any) => {
          // Handle HTTP error
          console.error('Password Change Error:', error);
          // Display an error message or handle the error
        }
      );
    } else {
      // Handle the case where the email ID is not present in local storage
      console.log('Email ID not found in local storage');
    }
  }
  
  

}
