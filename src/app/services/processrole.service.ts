import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessroleService {
  // URL : string = "https://173.249.22.91:8082";
   private URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

 
  getAllMembers(RoleId:number):Observable<any> {
    console.log(RoleId);
    return this.http.get<any>(this.URL+'/PD/api/Roles/AllMembers?RoleId='+RoleId);
    }

   gettreeRoles():Observable<any> {
    return this.http.get<any>(this.URL+'/PD/api/Roles');
    }

   AddRoles(_roles:any):Observable<any> {
    return this.http.post<any>(this.URL+'/PD/api/Roles' , _roles);
    }
    
    UpdateRoles(_roles:any):Observable<any> {
      return this.http.put<any>(this.URL+'/PD/api/Roles' , _roles);
      }

   getMembers(RoleIds:number):Observable<any> {
    return this.http.get<any>(this.URL+'/PD/api/Roles/Members?RoleId='+RoleIds); //2960
    }
   AddMembers(_Members:any):Observable<any> {
     console.log(_Members);
    return this.http.post<any>(this.URL+'/PD/api/Roles/AddMembers?RoleId='+_Members.RoleId , _Members.members);
    }
}
