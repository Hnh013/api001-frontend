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

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  getAllLists(id:any):Observable<any[]> {
  
    return this.http.get<any[]>(this.APIurl + '/list/' + id);
    
  }



 

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

   getListItems(id : any): Observable<any[]> { 
     debugger;
     return this.http.get<any[]>(this.APIurl + '/item/' + id);
     debugger;
   }

  createItem(item : any) {
 
    return this.http.post<any>(this.APIurl + '/item/add/', item);
   
  }
   
  changeItem(item : any) : Observable<any> { 
    return this.http.put<any>(this.APIurl + '/item/edit/', item);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
}
