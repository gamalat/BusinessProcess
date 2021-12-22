import { Injectable } from '@angular/core';
import { ObjectAttribute } from 'src/app/interfaces/ObjectAttribute';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lookups } from '../interfaces/Lookups';
import { Dependant } from '../interfaces/Dependant';
@Injectable({
  providedIn: 'root'
})
export class ObjectAttributeService {
 
 
  // https://173.249.22.91:8082

  private apiServerUrl ="https://192.168.0.9:8082";
  constructor(private http: HttpClient){}

  
 
  public getAttributeObjForBo(Obj_id:number): Observable<any> {
  //  PD/api/BO/1680/Attributes   PD/api/BO/1680/Attributes
      return this.http.get<any>(`${this.apiServerUrl}/PD/api/BO/${Obj_id}/Attributes`);
  } 
  public getAttributeById(att_id:number): Observable<ObjectAttribute[]> {
  
        return this.http.get<ObjectAttribute[]>(`${this.apiServerUrl}/PD/api/BO/Attributes/${att_id}`);
    }
  public getAttributeObjForDo(DO_id:number): Observable<ObjectAttribute[]> {
    //  PD/api/BO/1680/Attributes   PD/api/BO/1680/Attributes
        return this.http.get<ObjectAttribute[]>(`${this.apiServerUrl}/PD/api/BO/DataObject/${DO_id}`);
    } 

    public deleteAtt(Att_id: number) :Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}/PD/api/BO/Attributes/${Att_id}`);
    }
    public addAttObject(obj: any): Observable<ObjectAttribute> {
      return this.http.post<ObjectAttribute>(`${this.apiServerUrl}/PD/api/BO/Attributes`, obj);
    }

    public editAttObject(obj: any): Observable<ObjectAttribute> {
      return this.http.put<ObjectAttribute>(`${this.apiServerUrl}/PD/api/BO/Attributes`, obj);
    }
    public getLookupID(): Observable<any> {
          return this.http.get<any>(`${this.apiServerUrl}/PD/api/Lookups`);
      } 

      public getDependant(Obj_id:any ,BO_Id:any): Observable<any> {
        console.log(`${this.apiServerUrl}/PD/api/BO/Attributes/Depndant?Obj_id`+Obj_id+'&BO_Id'+BO_Id);

        return this.http.get<any>(`${this.apiServerUrl}/PD/api/BO/Attributes/Depndant?Obj_id=`+Obj_id+'&BO_Id='+BO_Id);

    } 
    
 
}
