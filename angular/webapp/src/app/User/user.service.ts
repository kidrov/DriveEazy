import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/User/Usermodel/user.model';
import { UserUpdateData } from '../profile/user-update-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7030/api/user';
  private userProfileUrl = 'https://localhost:7030/api/user/';
  private upProfileUrl = 'https://localhost:7030/api/user/update/';
  private uploadImageUrl = 'https://localhost:7030/api/user/upload-image/';
  

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    const registrationUrl = `${this.apiUrl}/register`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      
    });
    const requestOptions = { headers: headers }
    return this.http.post(registrationUrl, user, requestOptions);
  }

  getUserProfile(email: string): Observable<any> {
    
    const profileUrl = `${this.userProfileUrl}${email}`;
    return this.http.get(profileUrl);
  }

  updateUserProfile(updatedUserData: UserUpdateData, email: string): Observable<any> {
  
    const updateProfileUrl = `${this.upProfileUrl}${email}`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const requestOptions = { headers: headers };
    const updatedUserJson = JSON.stringify(updatedUserData); 
    return this.http.put(updateProfileUrl, updatedUserJson, requestOptions);
  }
  
  uploadProfileImage(formData: FormData, email: string): Observable<any> {
    const uploadUrl = `${this.uploadImageUrl}${email}`;
    return this.http.post(uploadUrl, formData);
  }
  
}

