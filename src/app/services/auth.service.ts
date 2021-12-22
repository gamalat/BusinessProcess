import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
 // URL : string = "https://192.168.0.9:8443"; 
  URL : string = "https://192.168.0.9:8082";

  constructor(private http: HttpClient) {}
  checklogin(_f:any) { 
    console.log(_f);
     return this.http.post<any>(this.URL+"/login" , _f )
    .pipe(map(response=> {
      console.log("response");
      console.log(response);
      sessionStorage.setItem("token", response["Authorization"]);
      sessionStorage.setItem("username", _f.username);
      return response;
  }));
}


logoutUser() {
  var usernamep = sessionStorage.getItem("username");

  return this.http.post<any>(this.URL+"/user/logout?username="+usernamep , {} )
    .pipe(map(response=> {
      console.log("response");
      console.log(response);
      sessionStorage.clear();
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      return response;
  }));
}

getToken(): string {
return sessionStorage.getItem('token') || '';
}

getTokenExpirationDate(token: string): any {
  token = this.getToken()
  const decoded: any = jwt_decode(token);

  if (decoded.exp === undefined) return null;

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

isTokenExpired(token?: string): boolean {
 //debugger;
  if (!token) token = this.getToken();
 // console.log(token);
  if (!token || token == "undefined") return false;

  const date = this.getTokenExpirationDate(token);
  if (date === undefined) return false;
  const d = date.valueOf();
  const nd = new Date().valueOf();
  const r = !(date.valueOf() > new Date().valueOf());
  return !(date.valueOf() > new Date().valueOf());
}


getAuthStatus(): boolean {
  if(sessionStorage.getItem('token')){
    console.log("token");
    return true ;
  }else{
    return false;
  }
}

}








