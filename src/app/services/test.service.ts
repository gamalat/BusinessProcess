import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeNode } from 'src/app/interfaces/treenode';
import { Testdata } from '../interfaces/testdata';
import { Testproduct } from '../interfaces/testproduct';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getCustomersLarge() {
    return this.http.get<any>('assets/customers-large.json')
        .toPromise()
        .then(res => <Testdata[]>res.data)
        .then(data => { return data; });
}


getFiles() {
  return this.http.get<any>('assets/files.json')
    .toPromise()
    .then(res => <TreeNode[]>res.data)
    .then(data => { return data; });

  }

  
  
gettree():Observable<any> {
  return this.http.get<any>('assets/testtree.json');
  }

  getProducts() {
    return this.http.get<any>('assets/testproductgroup.json')
    .toPromise()
    .then(res => <Testproduct[]>res)
    .then(data => { return data; });
}


  // getLazyFiles() {
  // return this.http.get<any>('assets/files-lazy.json')
  //   .toPromise()
  //   .then(res => <TreeNode[]>res.data);
  // }

}
