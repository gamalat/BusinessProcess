import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
[x:string]:any;
  constructor( private router: Router , private authservice: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    var datalogin = {
      "username": "root",
      "password": "root1234"
    };
  //  console.log(datalogin);
    this.authservice.checklogin(datalogin).subscribe(
      Response => {
         console.log(Response);
         if(Response){
          this.router.navigate(["/processrole"]);

         }else{
          this.showErrorMessage = "UserName Or Password Not Valid";
        }
      },
      error => {
        if(error.status == 403){
        this.showErrorMessage = "UserName Or Password Not Valid";
        }
          console.log(error);
      }
   
      );

  }
}
