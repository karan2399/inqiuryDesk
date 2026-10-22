import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  router = inject(Router);

  userLogin:any = {
     userName: '',
     password:''
  }

  onLogin(){
    if(this.userLogin.userName === "admin" && this.userLogin.password === "admin"){
      this.router.navigateByUrl('/status');
      localStorage.setItem("enquiryApp",this.userLogin.userName);
    }else {
      alert("Wrong Credentials");
    }
  }


}
