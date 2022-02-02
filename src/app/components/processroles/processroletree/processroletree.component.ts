import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProcessroleService } from 'src/app/services/processrole.service';
import { TestService } from 'src/app/services/test.service';
import { AddprocessroleComponent } from '../addprocessrole/addprocessrole.component';
import { ProcessroledetailsComponent } from '../processroledetails/processroledetails.component';

@Component({
  selector: 'app-processroletree',
  templateUrl: './processroletree.component.html',
  styleUrls: ['./processroletree.component.css']
})
export class ProcessroletreeComponent implements OnInit {
  [x:string]:any;
  @ViewChild('myDetails') myDetails!: ProcessroledetailsComponent;
  @ViewChild('myParentID') myParentID!: AddprocessroleComponent;
 //breadcrumb
  // items = [
  //   {label: 'Process Roles' , routerLink: '/processrole'}
  //  ];
  // home = {icon: 'pi pi-home', routerLink: '/processrole'};

  ROLEIDSession:boolean = false;
  constructor(private nodeService: TestService , private processRole : ProcessroleService) {}

  ngOnInit() {
    // this.ROLEIDSession = sessionStorage.getItem("ROLEID");
      if(sessionStorage.getItem("ROLESE") == null){
        this.ROLEIDSession = false;
      }else{
        this.ROLEIDSession = true;
      }
         
       this.processRole.gettreeRoles().subscribe((Response: any) => {
           this.tree = Response.body;
          //  console.log(this.tree);
          //  console.log(this.tree.length);
          //   console.log(this.objtree );
            this.treeall = this.unflatten(this.tree);
            //  document.body.innerHTML = "<pre>" + (JSON.stringify(treeall, null, " "))

        }); 

    
  }

  
 

    unflatten(arr:any) {

    var tree = [],
        mappedArr = [],
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = arr.length; i < len; i++) {
      arr[i].label = arr[i].ROLE_NAME;
      //  arr[i].data = "Movies Folder";
      // arr[i].expandedIcon = "pi pi-folder-open";
      // arr[i].collapsedIcon = "pi pi-folder";
      //  arr[i].icon = "pi pi-cog";
      

        arrElem = arr[i];
        mappedArr[arrElem.ROLE_ID] = arrElem;
        mappedArr[arrElem.ROLE_ID]['children'] = [];


    }

    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.PARENT_ROLE_ID) {
            mappedArr[mappedElem['PARENT_ROLE_ID']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
            tree.push(mappedElem);
        }
        }
    }
    console.log(tree);
    return tree;
    }
 
 
    nodeSelect(evt: any): void {
      this.ROLEROW = evt.node
      console.log(this.ROLEROW);
      this.storageRow = {
          "ROLE_ID": this.ROLEROW.ROLE_ID,
          "ROLE_NAME": this.ROLEROW.ROLE_NAME,
          "DESCRIPTION": this.ROLEROW.DESCRIPTION,
      }
      sessionStorage.setItem("ROLESE", JSON.stringify(this.storageRow)); //JSON.stringify()
      this.ROLEIDSession = true;
      setTimeout(()=>{
        this.myDetails.sendRowTree(this.ROLEROW);
        this.myParentID.sendRowTree(this.ROLEROW);
        
      },10)
      

    }

}
