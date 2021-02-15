import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  
  itemSearch: string = '';
  loggedId : string = '0';
  listsList: any[];
  itemList: Item[];
  itemsList: any[];
  item : string; 
  Shopping_List: string = '';
  Shopping_List_Id: string = '';
  item_desc : string = '';

  constructor( private dataservice : DataService,
               private authservice : AuthService
     ) { }

  ngOnInit(): void {
    this.getUserId();
     this.refreshItemList();
     this.refreshUserLists();
     this.viewContents(this.Shopping_List_Id);
    
  }

  refreshItemList() {
    this.dataservice.getAllItems().subscribe(data=>{

      this.itemList=data;
    });
  }

  refreshUserLists() {
    this.dataservice.getAllLists(localStorage.getItem("userId")).subscribe(data=>{
      
      this.listsList=data;

    });
  }

  editItem(i) {
   var it = {
    id : i.id,
    item : this.item,
   };

  

    if(confirm('Are you sure want to update?')) {
      this.dataservice.updateItem(it).subscribe(
        data => {
          //console.log(res);
          alert("Item updated");
          this.refreshItemList();
        })
    
      }
  }


  removeItem(i) {
    debugger;
    if(confirm('Are you sure want to delete?')) {
      this.dataservice.deleteItem(i.id).subscribe(
        data => {
          //console.log(res);
          alert("Item has been removed from the List");
          this.refreshItemList();
        }
      
      )
      
    }

  }

  createItem() {
    var it = {
      item : this.item,
     };

   

    this.dataservice.addItem(it).subscribe(res=>{
      
      //console.log(res);
      
      alert("Item added to the List");
      this.refreshItemList();
      });
    

    
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUserId() {
    this.loggedId = (localStorage.getItem("userId"));
  }
  

  viewContents(id) {

    this.dataservice.getListItems(id).subscribe(data => {
      this.itemsList = data;
  
    });

  }

  setCurrentList(l) {
  
    this.Shopping_List = l.name;
      this.Shopping_List_Id = l.id;
      
    

  }

   addItem() {
    var item = {
      list_id : this.Shopping_List_Id,
      item_desc : this.item_desc,
     };

   

    this.dataservice.createItem(item).subscribe(res=>{
      
      //console.log(res);
      
      alert("Item added to the List");
      this.refreshItemList();
      });
    

    
  }

  updateItem(i) {
    var item = {
       id : i.id,
      list_id : i.list_id,
      item_desc : i.item_desc,
     };

   

    this.dataservice.changeItem(item).subscribe(res=>{
      
      //console.log(res);
      
      alert("Item added to the List");
      this.viewContents(i.list_id);
      });
    

    
  }


  




}
