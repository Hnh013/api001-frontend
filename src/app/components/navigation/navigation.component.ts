import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  logged : boolean = false;

  ngOnInit(): void {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    if (localStorage.getItem("currentUser") != null) {
      this.logged = true;
    }
    else {
      this.logged = false;
    }
  }

   checktoken() {
     const t = localStorage.getItem("token");
     const u = localStorage.getItem("userId");
     console.log(t);
     console.log(u);
   }

}
