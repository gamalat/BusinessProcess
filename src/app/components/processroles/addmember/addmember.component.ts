import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Processsrole } from 'src/app/interfaces/processsrole';
import { ProcessroleService } from 'src/app/services/processrole.service';
declare var $: any
declare var bootbox: any;
@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  [x: string]: any;

  sendMembers(AllMembersSelected: any, RoleID: any) {
    console.log(AllMembersSelected);
    console.log(RoleID);
    this.roleID = RoleID;
    this.selectedProducts = AllMembersSelected;
  }

  constructor(private processRole: ProcessroleService) {
  }

  getAllMember() {
    console.log(this.roleID);
    this.processRole.getAllMembers(this.roleID).subscribe(customers => {
      this.customers = customers.body;
      this.cs = this.customers;
      this.loading = false;
      console.log(this.customers);
    });

  }

  ngOnInit(): void {

    //   this.selectedProducts= [
    //     {
    //       "MEMBER_ID": 320,
    //       "MEMBER_NAME": "root",
    //       "MEMBER_TYPE": "HUMAN",
    //       "ASSIGNED": 0 
    //   },
    //     {
    //         "MEMBER_ID": 2789,
    //         "MEMBER_NAME": "soha",
    //         "MEMBER_TYPE": "HUMAN",
    //         "ASSIGNED": 1
    //     }
    // ]

    this.statuses = [
      { label: 'HUMAN', value: 'HUMAN' },
      { label: 'ORGANIZATIONAL_UNIT', value: 'ORGANIZATIONAL_UNIT' },
      { label: 'RESOURCE_SET', value: 'RESOURCE_SET' },
      { label: 'ROLE', value: 'ROLE' },
    ]


  }

  selectRow(AddMem: any) {
    console.log(AddMem);
    console.log(this.selectedProducts);
  }

  SubmitAddMembers(_M: any) {
    var add = {
      RoleId: this.roleID,
      members: this.selectedProducts
    }


    console.log(add);
    this.processRole.AddMembers(add).subscribe(
      Response => {
        console.log(Response);
        if (Response.code == 2) {
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>" + "Success" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + "Member Added Successfully" + "</span>  </i>",
            callback: function () {
              window.location.reload();
            }
          });
          $('#MemberProcessRole').modal('hide');
        }

        if (Response.code == "-2") {
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;  '>" + "Waring" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + " Member already exist " + "</span>  </i>",
            callback: function () {
            }
          });

        }
        if (Response.code == "-3") {
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>" + "Contact your system administrator" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + Response.body + "</span>  </i>",
            callback: function () {
            }
          });

        }
      });

  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      let element = document.getElementById('MemberTable');
      console.log(element)
      var ws = xlsx.utils.table_to_sheet(element);
      var wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, "");
      const excelBuffer: any = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "members");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
