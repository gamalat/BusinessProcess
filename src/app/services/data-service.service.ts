import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
doID:any =3;
boID:any=6;
do_ID = this.doID.asObservable();
bo_ID = this.boID.asObservable();

  constructor() { }
}
