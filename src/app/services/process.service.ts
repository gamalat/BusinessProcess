import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public allProcesses(BO_id: number ): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/PD/api/BO/${BO_id}/Process`);
  }
}
