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
  //works like a global variable so that componenets get the value ,  emits only the latest value applied to it
  userId: Pick<User, "id">;
  // Pick ususally picks a property or specific key from the object or model , as here it it is picking id key gfrom the user model

  
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),

    // for headers or authorizartion headers like bearer tokens
  };


  constructor( private http: HttpClient,
               private errorHandlerService: ErrorHandlerService,
               private router : Router
    ) { }

  signup(user: Omit<User, "id">): Observable<User> {

   
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
    first(),
    catchError(this.errorHandlerService.handleError<User>("signup"))     
      )

   // omit aas the data we send it not oging to have any sort of id initially
    // seems unnnecessary after working on the grocery part 
    // Observable captures the reponse of a predefined type best suited for GET requests 

  };

   login( email: Pick<User, "email">,  password: Pick<User, "password"> ): Observable<{
    token: string;userId: Pick<User, "id">;}>
    {
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(), // get only the first result
        tap((tokenObject: { token: string; userId: Pick<User, "id"> }) => {
          this.userId = tokenObject.userId;
          localStorage.setItem("token", tokenObject.token);
          localStorage.setItem("userId", (tokenObject.userId).toString());
          console.log(localStorage.getItem("token"));
          console.log(localStorage.getItem("userId"));
          this.isUserLoggedIn$.next(true);
          this.router.navigate(["posts"]);

          // utilize response ,  by tapping into it  , not creating any side effect or changes
        }),
        catchError(
          
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, "id">;
          }>("login")
        )
      );
  }
}


