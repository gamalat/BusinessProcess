import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Processsrole } from 'src/app/interfaces/processsrole';
import { ProcessroleService } from 'src/app/services/processrole.service';
import { TestService } from 'src/app/services/test.service';
import { AddmemberComponent } from '../addmember/addmember.component';

declare var $: any
declare var bootbox:any;

@Component({
  selector: 'app-processroledetails',
  templateUrl: './processroledetails.component.html',
  styleUrls: ['./processroledetails.component.css']
})
export class ProcessroledetailsComponent implements OnInit {
  [x:string]:any; 
  @ViewChild('AddChild') AddChild!: AddmemberComponent;

  constructor(private processRole : ProcessroleService , private customerService: TestService) {

  }
  
  sendRowTree(_r:any){
    //console.log(_r);
   this.RoleRow = _r;
   this.ROLE_ID = this.RoleRow.ROLE_ID ;
   this.ROLE_NAME = this.RoleRow.ROLE_NAME ;
   this.DESCRIPTION = this.RoleRow.DESCRIPTION ;
 
   this.processRole.getMembers(this.ROLE_ID).subscribe(Members => {
    this.Members = Members.body;
    this.loading = false;
     console.log(this.Members);
     this.AddChild.sendMembers(this.Members , this.ROLE_ID );

    // this.Members.forEach(
    //   (Member: { date: string | number | Date; }) => {
    //     return (Member.date = new Date(Member.date));
    //   }
    // );
  });

  }


  ngOnInit(): void {
    var z=sessionStorage.getItem("ROLESE");
    if(z!=null){
      this.OneRow = JSON.parse(z);
     //  console.log(this.OneRow);
      this.sendRowTree(this.OneRow);
    }
 
  }

  UpdateSubmit(_f:any){
    console.log(_f);

    this.processRole.UpdateRoles(_f).subscribe(
      Response=> {
        console.log(Response);
        if(Response.code == "2"){
          bootbox.alert({
                  title: "<span style='font-weight: 400; font-size: 16px;'>"+Response.body+"</span>  </i>",
                  message: "<span style='font-weight: 400; font-size: 16px;'>"+Response.body+"</span>  </i>",
                  callback: function(){ 
                    window.location.reload();
                  }
              });
            }
            else
            if(Response.code == "-2"){
              bootbox.alert({
                      title: "<span style='font-weight: 400; font-size: 16px;'>"+Response.body+"</span>  </i>",
                      message: "<span style='font-weight: 400; font-size: 16px;'>"+Response.body+"</span>  </i>",
                      callback: function(){ 
                        window.location.reload();
                      }
                  });
                }

                else
                if(Response.code == "-3"){
                  bootbox.alert({
                          title: "<span style='font-weight: 400; font-size: 16px;'>"+Response.body+"</span>  </i>",
                          message: "<span style='font-weight: 400; font-size: 16px;'>"+Response.body+"</span>  </i>",
                          callback: function(){ 
                            window.location.reload();
                          }
                      });
                    }
          });

          this.storageRow = {
            "ROLE_ID": _f.ROLE_ID,
            "ROLE_NAME": _f.ROLE_NAME,
            "DESCRIPTION": _f.DESCRIPTION,
        }
        sessionStorage.setItem("ROLESE", JSON.stringify(this.storageRow));
          

  }

  reset(){
    this.ROLE_ID = this.RoleRow.ROLE_ID ;
    this.ROLE_NAME = this.RoleRow.ROLE_NAME ;
    this.DESCRIPTION = this.RoleRow.DESCRIPTION ;
   }
    
  }

  


