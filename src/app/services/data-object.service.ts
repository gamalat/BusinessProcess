import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataObj } from '../interfaces/DataObj';

@Injectable({
  providedIn: 'root'
})
export class DataObjectService {

  
  
  private apiServerUrl = environment.apiBaseUrl;

  // private apiServerUrl ="https://192.168.0.9:8082";

  constructor(private http: HttpClient){}
  public editDataObject(BO_id: number ,_f:any):Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/PD/api/BO/${BO_id}/DataObject`,_f);
    }

    // public addDataObject(BO_id: number ,_f:any):Observable<any> {
    //   return this.http.put<any>(`${this.apiServerUrl}/PD/api/BO/${BO_id}/DataObject`,_f);
    //   }

      public addDataObject(BO_id: number,obj: any ): Observable<any> {
        return this.http.post<any>(`${this.apiServerUrl}/PD/api/BO/${BO_id}/DataObject`, obj);
      }

}
