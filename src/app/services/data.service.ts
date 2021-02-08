import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../models/Item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http : HttpClient ) { }

  private APIurl = "http://localhost:3000";

  getAllItems():Observable<Item[]> {
    return this.http.get<Item[]>(this.APIurl + '/gro/');
  }

  deleteItem(val:any) {
    debugger;
    //return this.http.delete(`${this.APIurl}/delete/${id}`);
      return this.http.delete(this.APIurl + '/gro/'+val); 
  }

  updateItem(item : Item): Observable<Item> { 
    return this.http.put<Item>(this.APIurl + '/gro/', item);
  }

  addItem(item : any) {
 
    return this.http.post<any>(this.APIurl + '/gro/', item);
   
  }

  


 

}
