import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../models/Item';
import { Observable } from 'rxjs';
import { List } from '../models/list';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http : HttpClient ) { }

  private APIurl = "http://localhost:3000";

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////// MANIPULATING LISTS //////////////////////////////////////////////
  
  fetchAllLists(user_id : any):Observable<any> {
    debugger;
    return this.http.get<any>(this.APIurl + '/list/fetch/' + user_id);
    debugger;
  }
  
  createList(id: any, list : object) {
    return this.http.post<any>(this.APIurl + '/list/add/' + id, list);
  }
   
  editList(list : any) : Observable<List> { 
    return this.http.put<any>(this.APIurl + '/list/edit', list);
  }

  removeList(id : any, list: object) : Observable<any>{ 
    debugger;
    return this.http.post<any>(this.APIurl + '/list/remove/' + id, list);
    debugger;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////// MANIPULATING ITEMS  //////////////////////////////////////////////
  
  fetchAllItems(id : any):Observable<Item[]> {
    return this.http.get<Item[]>(this.APIurl + '/item/' + id);
  }
  
  createItem(item : any) {
    return this.http.post<any>(this.APIurl + '/item/add/', item);
  }
   
  editItem(item : any) : Observable<Item> { 
    return this.http.put<any>(this.APIurl + '/item/edit/', item);
  }
  deleteItem(id : any) {
    return this.http.delete(this.APIurl + '/item/delete/' + id);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
}
