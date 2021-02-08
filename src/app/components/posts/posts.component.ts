import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  
  itemSearch: string = '';

  itemList: Item[];
  item : string; 

  constructor( private dataservice : DataService ) { }

  ngOnInit(): void {
     this.refreshItemList()
  }

  refreshItemList() {
    this.dataservice.getAllItems().subscribe(data=>{

      this.itemList=data;
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


}
