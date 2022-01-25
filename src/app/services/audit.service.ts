import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private apiServerUrl = environment.apiBaseUrl;

   constructor(private http: HttpClient){}
   
  public allAudit(PageNo:number ,Size :number): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/PD/api/Audit?PageNo=`+PageNo+'&Size='+Size,{});
  }

  // public AuditٍSearch(obj:any): Observable<any> {
  //   return this.http.post<any>(`${this.apiServerUrl}/PD/api/Audit?PageNo=`+1+'&Size=',obj);
  // }
  public AuditٍSearch(PageNo:number ,Size :number,_f:any):Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/PD/api/Audit?PageNo=`+PageNo+'&Size='+Size,_f);
  }

}
