import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import { List } from '../../models/list';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  
  // itemSearch: string = '';
  loggedUserId : string = '0';
  userLists: List[];
  listItems: Item[];
  listName: string;
  listRename: string;
  selectedList: string = '';
  selectedListId: any;
  itemDesc: string;
  itemDescEdit: string;
  // itemsList: any[];
  // item : string; 
  // Shopping_List: string = '';
  // Shopping_List_Id: string = '';
  // item_desc : string = '';

  constructor( private dataservice : DataService,
               private authservice : AuthService
     ) { }

  ngOnInit(): void {
    this.getUserId();
    //  this.refreshItemList();
    this.refreshUserLists();
    //  this.viewContents(this.Shopping_List_Id);
    
  }

  getUserId() {
    this.loggedUserId = (localStorage.getItem("userId"));
  }

  refreshUserLists() {
    this.dataservice.fetchAllLists(localStorage.getItem("userId")).subscribe(data=>{
      this.userLists=data;
    });
  }

  refreshListItems(l) {
    this.dataservice.fetchAllItems(l.id).subscribe(data=>{
      this.listItems=data;
      this.selectedList = l.name;
      this.selectedListId = l.id;
    });
  }

  addUserList() {
    var listDetails = {
      user_id : localStorage.getItem("userId"),
      name : this.listName,
      status : 1
    }
    this.dataservice.createList(listDetails).subscribe(res => {
      alert("List Created!");
      this.refreshUserLists();
    });
  }

  renameList(l) {
    var list = {
      id : l.id,
      user_id : l.user_id,
      name : this.listRename,
      status : 1
    }

    this.dataservice.editList(list).subscribe(res => {
      alert("List Renamed!");
      this.refreshUserLists();
      this.dataservice.fetchAllItems(l.id).subscribe(data=> {
          this.listItems = data;
          this.selectedList = this.listRename;
          this.selectedListId = l.id;
      }); 
    });
    
  }




  deleteList(l) {
    var list = {
      id : l.id,
      user_id : l.user_id,
      name : l.name,
      status : 0
    }

    this.dataservice.editList(list).subscribe(res => {
      alert("List Deleted!");
      this.refreshUserLists();
    });
    
  }


  addListItem() {
    var item = {
      list_id : this.selectedListId,
      item_desc : this.itemDesc,
    }
    this.dataservice.createItem(item).subscribe(res => {
      alert("Item Created & Added!");

      this.dataservice.fetchAllItems(this.selectedListId).subscribe(data => {
         this.listItems = data;    
      });
    });
  }

  deleteListItem(i) {
    this.dataservice.deleteItem(i.id).subscribe(res=> {
      alert("Item Deleted!");

      this.dataservice.fetchAllItems(i.list_id).subscribe(data=> {
         this.listItems = data;
      });
    });
  }

  editListItem(i) {
    var item = {
      id : i.id,
      list_id : i.list_id,
      item_desc : this.itemDescEdit,
    };
    this.dataservice.editItem(item).subscribe(res=> {
      alert("Item Updated!");

      this.dataservice.fetchAllItems(i.list_id).subscribe(data=> {
         this.listItems = data;
      });
    });
  }

}
