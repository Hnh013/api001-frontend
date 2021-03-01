import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { BehaviorSubject, Observable } from "rxjs";
import { first,catchError,tap } from "rxjs/operators";
import { ErrorHandlerService } from '../services/error-handler.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId : string = '';
  //works like a global variable so that componenets get the value ,  emits only the latest value applied to it
  //userId: Pick<User, "id">;
  // Pick ususally picks a property or specific key from the object or model , as here it it is picking id key gfrom the user model

  
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),

    // for headers or authorizartion headers like bearer tokens
  };


  constructor( private http: HttpClient,
               private errorHandlerService: ErrorHandlerService,
               private router : Router
    ) { }

  signup(user : Omit<User, "_id">): Observable<any> {
    return this.http.post<any>(`${this.url}/signup`, user , this.httpOptions).pipe(
    first(),
    catchError(this.errorHandlerService.handleError<any>("signup"))     
      )
  };

   login(email: string,password: string): Observable<any>
    {
    return this.http.post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(), // get only the first result
        tap((tokenObject: {data: string; id: string }) => {
          this.userId = tokenObject.id;
          localStorage.setItem("token", tokenObject.data);
          localStorage.setItem("userId", (tokenObject.id).toString());
          console.log(localStorage.getItem("token"));
          console.log(localStorage.getItem("userId"));
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["posts"]);

          // utilize response ,  by tapping into it  , not creating any side effect or changes
        }),
        catchError(
          
          this.errorHandlerService.handleError<{
            token: string;
            userId: string;
          }>("login")
        )
      );
  }
}


