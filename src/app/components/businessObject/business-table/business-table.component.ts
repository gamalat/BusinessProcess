import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BussinessObject } from 'src/app/interfaces/BussinessObject';
import { Testproduct } from 'src/app/interfaces/testproduct';
import { BusinessObjectService } from 'src/app/services/business-object.service';
import { DataObjectService } from 'src/app/services/data-object.service';
import { BusinessAttributeComponent } from '../business-attribute/business-attribute.component';
import { MessageService } from 'primeng/api';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare var bootbox: any;
declare var $: any;
@Component({
  selector: 'app-business-table',
  templateUrl: './business-table.component.html',
  styleUrls: ['./business-table.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class BusinessTableComponent implements OnInit {
  popoverTitle = 'Confirm';
  popoverMessage = 'Are You Sure to delete';
  confirmClicked = false;
  cancelClicked = false;
  panelOpenState = false;
  doID: any;
  DboID: any;
  DboName: any;
  DdoID: any;
  DdoName: any;
  boID: any;
  vv = 8;
  MainData: any;
  public selectedName: any;
  public DselectedName: any;
  public btnData: any;
  bo_ID: any;
  lTypes: any[] = [
    { id: 1, Name: 'Form' },
    { id: 2, Name: 'Tab' },
    { id: 3, Name: 'Table' }];
  curType: any = this.lTypes[0]; // first will be selected by default by browser
  do_CODE: string = "";
  do_NAME: string = "";
  do_TYPE: string = "";
  description: string = "";
  selectedProduct2: any;
  obj: any;
  Dobj: any;
  icon: String = "";
  selectedProducts!: BussinessObject[];

  data = [
    {
      "id": "nick",
      "items": [
        {
          "name": "ball"
        },
        {
          "name": "phone"
        }
      ]
    },
    {
      "id": "jack",
      "items": [
        {
          "name": "pen"
        },
        {
          "name": "doll"
        }
      ]
    }
  ];
  // input data
  //  input_data = [
  //   {
  //     "id": "tagID1", 
  //     "error": { "code": 0, "success": true }, 
  //     "data": [
  //       [1604395417575, 108, 3], 
  //       [1604395421453, 879, 3]
  //     ]
  //   },
  //   {
  //     "id": "tagID2", 
  //     "error": {"code": 0, "success": true}, 
  //     "data": [
  //       [1604395417575, 508, 3], 
  //       [1604395421453, 179, 3]
  //     ]
  //   }
  // ];


  @Output()
  startReLoadData: EventEmitter<any> = new EventEmitter<any>();
  dt: any;
  pRowToggler: any;
  input_data!: [
    {
      "id": "tagID1",
      "error": { "code": 0, "success": true },
      "data": [
        [1604395417575, 108, 3],
        [1604395421453, 879, 3]
      ]
    },
    {
      "id": "tagID2",
      "error": { "code": 0, "success": true },
      "data": [
        [1604395417575, 508, 3],
        [1604395421453, 179, 3]
      ]
    }
  ];
  setNewType(id: any): void {
    console.log(id);
    // Match the selected ID with the ID's in array
    this.curType = this.lTypes.filter(value => value.id === parseInt(id));
    console.log(this.curType);
  }
  AllData: any;
  // AllData: BussinessObject[] = [];
  DetailsData: any;
  @ViewChild(BusinessAttributeComponent)
  private businessAttributeComponent!: BusinessAttributeComponent;

  deleteBo: BussinessObject | undefined;
  constructor(private boService: BusinessObjectService,
    private doService: DataObjectService, private messageService: MessageService) { }

  reloadData() {
    alert("reloaded");
  }


  ngOnInit(): void {
    this.getBo();
    //this.obj = JSON.parse(sessionStorage.BOject);
    //console.log(" refresh oninit", this.obj);
    //this.onRowBo(this.obj);
    //this.boID= this.obj.bo_ID;
    // this.onRowSelect(  this. obj);
    //this.businessAttributeComponent.dType=true;
    //this.businessAttributeComponent.getAttributeObj(this.obj.bo_ID ,this.obj );
  }

  ngAfterViewInit() {
    // if(this.businessAttributeComponent.dType==true){
    console.log("ng after view", this.businessAttributeComponent.dType);
    if (sessionStorage.getItem("DOject") === null) {
      console.log(sessionStorage.getItem("DOject"))

      this.obj = JSON.parse(sessionStorage.BOject);
      this.onRowBo(this.obj);
    }
    else {

      this.icon = 'pi pi-chevron-down';
      console.log("ng after view", this.obj);
      this.Dobj = JSON.parse(sessionStorage.DOject);
      this.onRowDo(this.Dobj);
      this.pRowToggler = this.Dobj;
      console.log("ng after view", this.Dobj);
    }
  }

  //  this.dt.expandedRowKeys[this.MainData.bo_ID] = 1;
  //  console.log(this.dt.expandedRowKeys[this.MainData.bo_ID]);

  // 

  // this.businessAttributeComponent.getAttributeObj(this.obj.bo_ID ,this.obj );
  // this.selectedName = this.obj.bo_NAME;


  //   onRowSelect(event: { obj: { bo_NAME: any; }; }) {
  //     console.log("inside event row selected ");
  //     console.log(this.obj.bo_NAME);
  //     this.messageService.add({severity:'info', summary:'Product Selected', detail: event.obj.bo_NAME});
  // }
  // highight Bo
  public highlightBo(MainData: { bo_NAME: any; }) {
    this.selectedName = MainData.bo_NAME;
  }

  // highight Bo
  public highlightDo(DetailsData: { do_NAME: any; }) {
    this.DselectedName = DetailsData.do_NAME;
  }

  // show attribute inside business obj
  onRowBo(selectedData: any) {

    console.log('row', selectedData.bo_ID);
    this.boID = selectedData.bo_ID;
    // alert(this.boID);
    console.log("onRowBo" + selectedData.bo_ID);
    this.businessAttributeComponent.dType = true;
    this.businessAttributeComponent.getAttributeObj(selectedData.bo_ID, selectedData);
    console.log("hi here ", selectedData.bo_ID)
    console.log("selectedData" + selectedData);
    this.selectedName = selectedData.bo_NAME;
    this.btnData = selectedData;
    sessionStorage.removeItem("DOject");
    return selectedData;
  }

  // show attribute inside data obj
  onRowDo(selectedData: any) {
    console.log('row', selectedData.do_ID);
    this.doID = selectedData.do_ID;
    this.businessAttributeComponent.dType = false;
    this.businessAttributeComponent.getAttributeObjD(selectedData.do_ID, selectedData);
    console.log(selectedData);
    this.DselectedName = selectedData.do_NAME;
    sessionStorage.removeItem("BOject");

    return selectedData;
  }


  handleFilter(e: any, filteredRecordCount: any) {
    console.log("filteredRecordCount");
  }


  // delete Bo from table
  public onDeleteBo(bo_ID: number): void {
    this.boService.deleteBo(bo_ID).subscribe(
      (response: any) => {
        if (response.code == "-3") {
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>" + "contact your system administrator" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + response.body + "</span>  </i>",
            callback: function () {
            }
          });

        }
        if (response.code == "3") {
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>" + "Success" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + "Business Object deleted successfully " + "</span>  </i>",
            callback: function () {

            }
          });
          this.businessAttributeComponent.resetForm();

        }

        if (response.code == "-6") {
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>" + "Waring" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + "Business Object has Child" + "</span>  </i>",
            callback: function () {
            }
          });

        }

        if (response.code == ("-1" || "-4")) {
          bootbox.alert({

            title: "<span style='font-weight: 600; font-size: 20px;'>" + "Waring" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + "Business Object not exist" + "</span>  </i>",
            callback: function () {
            }
          });

        }

        console.log(response.code);
        this.getBo();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onPressBo(MainData: any) {
    $("#deleteBoModal").modal('show');
    console.log("MainData", MainData)
    this.DboID = MainData.bo_ID;
    this.DboName = MainData.bo_NAME;

  }
  public onPressAdd(MainData: any) {
    $("#dataObject").modal('show');
    console.log("MainData", MainData)
    this.DboID = MainData.bo_ID;
    this.DboName = MainData.bo_NAME;

  }
  public onPressDo(DetailsData: any) {
    $("#deletedoModal").modal('show');
    console.log("DetailsData", DetailsData)
    this.DdoID = DetailsData.do_ID;
    this.DdoName = DetailsData.do_NAME;
  }
  // delete Bo from table
  public onDeleteDo(Do_ID: number): void {
    this.boService.deleteDo(Do_ID).subscribe(
      (response: any) => {
        console.log("code", response.code);

        if (response.code == "-3") {
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>" + "Contact your system administrator" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + response.body + "</span>  </i>",
            callback: function () {

            }
          });

        }
        if (response.code == "1") {
          bootbox.alert({

            title: "<span style='font-weight: 600; font-size: 20px;'>" + "Success" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + "Data Object deleted successfully " + "</span>  </i>",
            callback: function () {

            }
          });
          // this.businessAttributeComponent.resetForm()  ;
          this.getBo();
        }

        if (response.code == "-6") {
          bootbox.alert({
            title: "<span style='font-weight: 600; font-size: 20px;'>" + "Waring" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + "Data Object has Child" + "</span>  </i>",
            callback: function () {
            }
          });

        }

        if (response.code == ("-1" || "-4")) {
          bootbox.alert({

            title: "<span style='font-weight: 600; font-size: 20px;'>" + "Waring" + "</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>" + "Data Object not exist" + "</span>  </i>",
            callback: function () {
            }
          });

        }

        // console.log(response.code);
        // this.getBo();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // get all business object with data obj inside
  public getBo() {
    this.boService.getBusinessObj().then(data => {
      console.log(data);
      this.AllData = data;
      console.log("all data hereeeeeeeeeeeee", this.AllData);

    })
  }
  reset(_addForm: any) {
    this.bo_ID = "";
    this.do_CODE = "";
    this.do_NAME = "";
    this.do_TYPE = "";
    this.description = "";
  }
  public onAddDatasObj(BO_id: number, addForm: NgForm): void {
    console.log(addForm.value);
    if (this.do_CODE.length > 20 || this.do_NAME.length > 100 || this.do_TYPE.length > 20 || this.description.length > 200) {
      bootbox.alert({
        title: "<span style='font-weight: 600; font-size: 20px;'>" + "Error" + "</span>  </i>",
        message: "<span style='font-weight: 400; font-size: 16px;'>" + "Invaild field length" + "</span>  </i>",
        callback: function () {

        }
      });
    } else {
      this.doService.addDataObject(BO_id, addForm.value).subscribe(
        (response: any) => {
          if (response.code == "1") {
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;'>" + "Success" + "</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>" + "Data Object Added Successfully" + "</span>  </i>",
              callback: function () {
                window.location.reload();
              }
            });
            this.getBo();
            console.log(response);

            // document.getElementById("add-obj-form")?.click();
            // this.reset(addForm);
            // 
          }
          if (response.code == "-2") {
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;  '>" + "Waring" + "</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>" + " Data object code already exist " + "</span>  </i>",
              callback: function () {
              }
            });

          }
          if (response.code == "-3") {
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;'>" + "Contact your system administrator" + "</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>" + response.body + "</span>  </i>",
              callback: function () {
              }
            });

          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }




  }

  // exportExcel() {
  //   import("xlsx").then(xlsx => {
  //   var  data = [ this.AllData]; 
  //   console.log("data in xslx",data);
  //   // console.log("all data obj in export mode",this.MainData.dos)

  //       // const worksheet = xlsx.utils.json_to_sheet(this.AllData);
  //       // aof_to_sheet(this.AllData);
  //       var ws = XLSX.utils.json_to_sheet(this.AllData);
  //       var wb = XLSX.utils.book_new();
  //       const merge = [
  //         { s: { r: 1, c: 0 }, e: { r: 2, c: 0 } }
  //         ,{ s: { r: 3, c: 0 }, e: { r: 4, c: 0 } },
  //       ];
  //       ws["!merges"] = merge;
  //       XLSX.utils.book_append_sheet(wb, ws, "");
  //       var wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});
  //       console.log("all data in export mode",this.AllData)
  //       const workbook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array'
  // 			} );
  //       this.saveAsExcelFile(wbout, "business Object ");
  //   });
  // }


  exportExcel() {
    import("xlsx").then(xlsx => {
      let element = document.getElementById('boTable');
      console.log(element)
      var ws = XLSX.utils.table_to_sheet(element);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "");
      const excelBuffer: any = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Business Object");
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

  exportExcelDo() {
    import("xlsx").then(xlsx => {
      
      let element = document.getElementById('doTable');
      console.log(element)
      var ws = XLSX.utils.table_to_sheet(element);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "");
      const excelBuffer: any = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
     this.saveAsExcelFile(excelBuffer, "Data Object ");
    });
  }

  exportTable() {
    // let newArray:any[]=[];
    // let data = Object.values(this.AllData);
    //   Object.keys(data).forEach((key, index)=>{
    //     newArray.push({
    //       'Ind. ID': data[key].individual_id,
    //       'HH ID': data[key].hh_id,
    //       'Name(en)': data[key].ind_first_name_en+' '+data[key].ind_last_name_en,
    //       'Name(ar)': data[key].ind_first_name_ar+' '+data[key].ind_last_name_ar,
    //       'UID': data[key].uId,
    //       'Gender': data[key].ind_gender,
    //       'D.O.B': data[key].dob,
    //       'Head Of HH': data[key].head_of_hh,
    //       'Phone Number': data[key].phone,
    //       'Status': data[key].ind_status,
    //       'User ID': data[key].user_id
    //     })
    //   })


    //   const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(newArray);
    //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, 'All Ind. Searched Data Export');

    //   /* save to file */
    //   XLSX.writeFile(wb, 'ExportAllData_Ind.xlsx');
  }

  // saveAsExcelFile(buffer: any, fileName: string): void {
  // let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // let EXCEL_EXTENSION = '.xlsx';
  // const data: Blob = new Blob([buffer], {
  //     type: EXCEL_TYPE
  // });
  // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }


}
