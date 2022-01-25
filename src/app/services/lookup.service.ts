import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAllLookups(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/PD/api/Lookups`);
} 

public getDependant(id: number ): Observable<any> {
  return this.http.get<any>(`${this.apiServerUrl}/PD/api/Lookups/${id}`);
}
public addLookup(obj: any ): Observable<any> {
  return this.http.post<any>(`${this.apiServerUrl}/PD/api/Lookups`, obj);
}

public addObj(obj: any ): Observable<any> {
  return this.http.post<any>(`${this.apiServerUrl}/PD/api/Lookups/Objects`, obj);
}
public deleteLookup(lookupID: number) :Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/PD/api/Lookups?Lookup_Id=`+lookupID);
}
public updateLookup(obj: any ): Observable<any> {
  return this.http.put<any>(`${this.apiServerUrl}/PD/api/Lookups`, obj);
}


public getAllObj(id: number ): Observable<any> {
  return this.http.get<any>(`${this.apiServerUrl}/PD/api/Lookups/Objects?Lookup_Id=`+id);
}


public validateScript(script: any  ): Observable<any> {
  return this.http.post<any>(`${this.apiServerUrl}/PD/api/Lookups/Objects/ValidateScribt?Script=`+script , {});
}

public UpdateScript(lookupID:any ,script: any  ): Observable<any> {
  return this.http.put<any>(`${this.apiServerUrl}/PD/api/Lookups/Objects/Script?Lookup_Id=`+lookupID+'&Lookup_Script='+script, {});
}

public deleteObj(lookupObjectID: number) :Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/PD/api/Lookups/Objects?LOOKUP_OBJECT_ID=`+lookupObjectID);
}

public UpdateObj(obj: any ): Observable<any> {
  return this.http.put<any>(`${this.apiServerUrl}/PD/api/Lookups/Objects`, obj);
}
}
