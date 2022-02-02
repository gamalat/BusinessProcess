import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { LookupService } from 'src/app/services/lookup.service';
import * as XLSX from 'xlsx';


declare var bootbox: any;
declare var $: any;

@Component({
  selector: 'app-lookups',
  templateUrl: './lookups.component.html',
  styleUrls: ['./lookups.component.css']
})
export class LookupsComponent implements OnInit {
  AllData: any;
  lookups: any;
  DEPENDANT:any;
  loading: boolean = true;
  Dchecked:boolean=false;
  dependantChecked:boolean = true;
  LOOKUP_NAME:String="";
  LOOKUP_TYPE:any;
  LOOKUP_ID:any;
  DESCRIPTION:any;
  DEP_LOOKUP_ID:any;
  LOOKUP_SCRIPT:any;
  selectedName:any;
  dependants: any;
  DISPLAY_NAME:any;
  OBJECT_CODE:any;
  updateMode:boolean =false;
  d: boolean=false;
  statuses: any;
  objs: any;
  lTypes: any[] = [
    { id: 1, Name: 'PROCESS' },
    { id: 2, Name: 'SCRIPT'},
    ];
  LOOKUP_OBJECT_ID: any;
  DEP_OBJECT_CODE: any;
  depend: boolean=true;
  checked: boolean=false;
  valid:boolean=true;
  Udependants: any;
  dependFliter: any;
  desc: any;
  Dobjs: any;
  
    constructor(private lookupService: LookupService) { }

    public validate(addForm: NgForm,Script: any):void{
      this.lookupService.validateScript(Script).subscribe(
        (response: any) => {
          console.log(response.code);
          if(response.code == "5"){
           this.onAddLookup(addForm);
          // console.log(response);
        return this.valid;
           } 
               else {
            this.valid=false;
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;'>"+"Error"+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>"+" Script Not Vaild"+"</span>  </i>",
              callback: function(){ 
             
              }
          });
          return this.valid;
           }
      });
    }

    public validateUpdate(addForm: any,Script: any):void{
      console.log("on validateUpdate functionnnnn")
      console.log(addForm.value.LOOKUP_ID)
      console.log(Script)
      this.lookupService.UpdateScript(addForm.value.LOOKUP_ID,Script).subscribe(
        (response: any) => {
          console.log(addForm.value.LOOKUP_ID);
          console.log(response.code);
          if(response.code == "2"){
           this.onUpdateLookup(addForm);
          // console.log(response);
        return this.valid;
           } 
               else {
            this.valid=false;
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;'>"+"Error"+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>"+" Script Not Vaild"+"</span>  </i>",
              callback: function(){ 
             
              }
          });
          return this.valid;
           }
      });
    }
    public onValidate(addForm: NgForm): void {
      if(!!addForm.value.LOOKUP_SCRIPT ){ //script not null
        this.validate(addForm,addForm.value.LOOKUP_SCRIPT);
        console.log(addForm.value.LOOKUP_SCRIPT)
      }else{
        this.onAddLookup(addForm);
      }
    }

    public onValidateUpdate(addForm: NgForm): void {
      if(!!addForm.value.LOOKUP_SCRIPT ){ //script not null
        this.validateUpdate(addForm,addForm.value.LOOKUP_SCRIPT);
        console.log("validate formmmmmmmmmmm")
        console.log(addForm.value.LOOKUP_SCRIPT)
      }else{ // script is null or type is process
        this.onUpdateLookup(addForm);
      }
    }

    public onAddLookup(addForm: NgForm): void {
      // if(this.LOOKUP_NAME.length>100||this.DESCRIPTION.length>200){
      //   bootbox.alert({
      //     title: "<span style='font-weight: 600; font-size: 20px;'>"+"Error"+"</span>  </i>",
      //     message: "<span style='font-weight: 400; font-size: 16px;'>"+"Invaild field length"+"</span>  </i>",
      //     callback: function(){ 
        
      //     }
      // });
      // }else{
      console.log(addForm.value);

      
      this.lookupService.addLookup(addForm.value).subscribe(
        (response: any) => {
          console.log(response.code);

          if(response.code == "1"){
            
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>"+" Lookup Added Successfully"+"</span>  </i>",
              callback: function(){ 
                location.reload();
             
              }
          });
          console.log(response);
        
           }else
           if(response.code == "-2"){
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;  '>"+"Waring"+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>"+" Lookup already exist "+"</span>  </i>",
              callback: function(){ 
              }
          });
          
           }else
           if(response.code == "-3"){
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;'>"+"Contact your system administrator"+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
              callback: function(){ 
              }
          });
          
           }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  // }
  }

    public onAddObject(addObj: NgForm): void {
      // if(this.att_CODE.length>100 || this.att_NAME.length>100 ||this.description.length>200){
      //   bootbox.alert({
      //     title: "<span style='font-weight: 600; font-size: 20px;'>"+"Error"+"</span>  </i>",
      //     message: "<span style='font-weight: 400; font-size: 16px;'>"+"Invaild field length"+"</span>  </i>",
      //     callback: function(){ 
        
      //     }
      // });
      // }else{
      console.log(addObj.value);
      this.lookupService.addObj(addObj.value).subscribe(
        (response: any) => {
          if(response.code == "1"){
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>"+" Lookup Object Added Successfully"+"</span>  </i>",
              callback: function(){ 
                $("#addObject").modal('hide');

              }
             
          });
          // this. objectDismiss();

          console.log(response);
        this.getAllObj(addObj.value.LOOKUP_ID);
        console.log( "ID",this.getAllObj(addObj.value.LOOKUP_ID));

           }
           else
           if(response.code == "-2"){
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;  '>"+"Waring"+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>"+" Lookup Object already exist "+"</span>  </i>",
              callback: function(){ 
              }
          });
          
           }else
           if(response.code == "-3"){
            bootbox.alert({
              title: "<span style='font-weight: 600; font-size: 20px;'>"+"Contact your system administrator"+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
              callback: function(){ 
              }
          });
          
           }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );

    }
    checkChange(values:any):void {
      if(values.currentTarget.checked){//true
        console.log(values.currentTarget.checked);
        this.dependantChecked=false; //enable checked
        this.DEPENDANT=1;
      }else{
        this.dependantChecked=true; //enable checked
        this.DEPENDANT=0;
      }
      }  
  ngOnInit(): void {
    this.getLookups();
    this.lookupService.getDependant(0).subscribe(
      (response: any) => {
        console.log(response);
        this.dependants = response.body;
        console.log(this.dependants);
      
      }
    );
// if(this.Dchecked===true){
//   console.log("checkbox",this.Dchecked)
//   this.dependantChecked=false;
// }else{
//   this.dependantChecked=true;

// }
    // this.lookupService.getDependant(this.LOOKUP_ID).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     this.Udependants = response.body;
    //     console.log(this.Udependants);
      
    //   }
    // );
    this.statuses = [
      {label: 'PROCESS', value: 'PROCESS'},
      {label: 'SCRIPT', value: 'SCRIPT'},
      
  ]
  this.dependFliter=
  [
    // {label: '🥩', value: '0'},
    {label: 'False', value: '0'},
    {label: 'True', value: '1'},
    
]
  }
  public highlightlookup(MainData: { LOOKUP_NAME: any; }) {
    this.selectedName = MainData.LOOKUP_NAME;
  }

  // public highlightobj(MainData: { LOOKUP_NAME: any; }) {
  //   this.selectedName = MainData.LOOKUP_NAME;
  // }
public onDeleteLookup(lookupId:number){
  this.lookupService.deleteLookup(lookupId).subscribe(
    (response: any) => {
      if(response.code == "-3"){
        bootbox.alert({
          title: "<span style='font-weight: 600; font-size: 20px;'>"+"contact your system administrator"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
          callback: function(){ 
          }
      });
      
       }
       if(response.code == "3"){
        bootbox.alert({
          title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+" Lookup deleted successfully "+"</span>  </i>",
          callback: function(){ 
            window.location.reload();
          
          }
      });
      
       }

       if(response.code == "-6"){
        bootbox.alert({
          title: "<span style='font-weight: 600; font-size: 20px;'>"+"Waring"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+" Lookup has Child"+"</span>  </i>",
          callback: function(){ 
          }
      });
      
       }

     
       if(response.code == ("-1" || "-4")){  
        bootbox.alert({
      
          title: "<span style='font-weight: 600; font-size: 20px;'>"+"Waring"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+" Lookup not exist"+"</span>  </i>",
          callback: function(){ 
          }
      });
      
       }
   
      console.log(response.code);
   
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );

}

public DeleteObj(lookupObjId:number){
  this.lookupService.deleteLookup(lookupObjId).subscribe(
    (response: any) => {
      if(response.code == "-3"){
        bootbox.alert({
          title: "<span style='font-weight: 600; font-size: 20px;'>"+"contact your system administrator"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
          callback: function(){ 
          }
      });
      
       }
       if(response.code == "3"){
        bootbox.alert({
          title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+" Lookup Object deleted successfully "+"</span>  </i>",
          callback: function(){ 
            window.location.reload();
          
          }
      });
      
       }

       if(response.code == "-6"){
        bootbox.alert({
          title: "<span style='font-weight: 600; font-size: 20px;'>"+"Waring"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+" Lookup Object has Child"+"</span>  </i>",
          callback: function(){ 
          }
      });
      
       }

     
       if(response.code == ("-1" || "-4")){  
        bootbox.alert({
      
          title: "<span style='font-weight: 600; font-size: 20px;'>"+"Waring"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+"Lookup Object not exist"+"</span>  </i>",
          callback: function(){ 
          }
      });
      
       }
   this. closeObjModel();
      console.log(response.code);
   
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );

}
public onUpdateLookup(addForm: NgForm): void {
  // if(this.LOOKUP_NAME.length>100||this.DESCRIPTION.length>200){
  //   bootbox.alert({
  //     title: "<span style='font-weight: 600; font-size: 20px;'>"+"Error"+"</span>  </i>",
  //     message: "<span style='font-weight: 400; font-size: 16px;'>"+"Invaild field length"+"</span>  </i>",
  //     callback: function(){ 
    
  //     }
  // });
  // }else
  
  // {
   console.log(addForm.value);
   this.lookupService.updateLookup(addForm.value).subscribe(
     (response: any) => {
       console.log("update lookup obj ",response.body)
       if(response.code == "2"){
         bootbox.alert({
           title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
           message: "<span style='font-weight: 400; font-size: 16px;'>"+"Lookup updated  successfully "+"</span>  </i>",
           callback: function(){ 
             location.reload();
           }
       });
      //  this.selectedName = response.body.LOOKUP_NAME;

        }else
        if(response.code == "-2"){
         bootbox.alert({
           title: "<span style='font-weight: 600; font-size:20px;'>"+"Waring"+"</span>  </i>",
           message: "<span style='font-weight: 400; font-size: 16px;'>"+"Lookup already exist"+"</span>  </i>",
           callback: function(){ 
           }
       });
       
        }else
        if(response.code == "-3"){
         bootbox.alert({
           title: "<span style='font-weight: 600; font-size: 20px;'>"+"Contact your system administrator"+"</span>  </i>",
           message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
           callback: function(){ 
           }
       });
     }
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
    // }
}

public onUpdateObjFunc(addForm: NgForm): void {
  
  console.log(addForm.value);
  this.lookupService.UpdateObj(addForm.value).subscribe(
    (response: any) => {
      console.log(response.code);
      console.log(response.body);

      if(response.code == "2"){
        bootbox.alert({
          title: "<span style='font-weight: 600; font-size: 20px;'>"+"Success"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+"Object updated  successfully "+"</span>  </i>",
          callback: function(){ 
            console.log(response.code);

            location.reload();
          }
      });
       }else
       if(response.code == "-2"){
        bootbox.alert({
          title: "<span style='font-weight: 600; font-size:20px;'>"+"Waring"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+"Object already exist"+"</span>  </i>",
          callback: function(){ 
          }
      });
      
       }else
       if(response.code == "-3"){
        bootbox.alert({
          title: "<span style='font-weight: 600; font-size: 20px;'>"+"Contact your system administrator"+"</span>  </i>",
          message: "<span style='font-weight: 400; font-size: 16px;'>"+response.body+"</span>  </i>",
          callback: function(){ 
          }
      });
    }
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );

}

public onPressLookup(lookupData:any){
  console.log(lookupData.LOOKUP_ID);
  this.getAllObj(lookupData.LOOKUP_ID);
  if (lookupData.DEPENDANT ===1) {
    this.getAllDObj(lookupData.DEP_LOOKUP_ID);
    console.log(lookupData.DEPENDANT);
    this.Dchecked=true;
    console.log("true",this.Dchecked);

  }else{
    this.getAllDObj(0);

    console.log(lookupData.DEPENDANT);
    this.Dchecked=false;
    console.log("false",this.Dchecked);

  }
  $("#updateLookup").modal('show');
  console.log("lookup",lookupData)
   this.LOOKUP_ID=lookupData.LOOKUP_ID;
   this.LOOKUP_NAME=lookupData.LOOKUP_NAME;
   this.DEPENDANT=lookupData.DEPENDANT;
   this.LOOKUP_TYPE=lookupData.LOOKUP_TYPE;
   this.DEP_LOOKUP_ID=lookupData.DEP_LOOKUP_ID;
   this.DESCRIPTION=lookupData.DESCRIPTION;
   this.LOOKUP_SCRIPT=lookupData.LOOKUP_SCRIPT;
  
}
public onPressDelete(MainData:any){
  $("#deleteLookupModal").modal('show');
  console.log("MainData",MainData)
  this.LOOKUP_ID=MainData.LOOKUP_ID;
  console.log(this.LOOKUP_ID);
this.LOOKUP_NAME=MainData.LOOKUP_NAME;
}

public onDeleteObj(MainData:any){
  $("#deleteObjModal").modal('show');
  console.log("MainData",MainData)
  this.LOOKUP_OBJECT_ID=MainData.LOOKUP_OBJECT_ID;
  console.log(this.LOOKUP_OBJECT_ID);
 this.OBJECT_CODE=MainData.OBJECT_CODE;
}

public onUpdateObj(MainData:any){
  this.updateMode=true;
  $("#addObject").modal('show');
  this.LOOKUP_OBJECT_ID=MainData.LOOKUP_OBJECT_ID;
  console.log(this.LOOKUP_OBJECT_ID);
 this.OBJECT_CODE=MainData.OBJECT_CODE;
 this.DISPLAY_NAME=MainData.DISPLAY_NAME;
 this.DEP_OBJECT_CODE=MainData.DEP_OBJECT_CODE;
this.DESCRIPTION=MainData.DESCRIPTION;
 
}
  getLookups() {
    this.lookupService.getAllLookups().subscribe(
      (response: any) => {       
        // this.loading=false;
        console.log(response.body);
        this.lookups = response.body;
        if(response.body.DEPENDANT=='0'){
          this.depend=false;
        }else{
          this.depend=true;
 
        }
        console.log(this.lookups);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getAllObj(id:any){
    this.lookupService.getAllObj(id).subscribe(
      (response: any) => {       
        // this.loading=false;
        console.log("objects");
        console.log(response);
        this.objs = response.body;
        console.log(this.objs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllDObj(id:any){
    this.lookupService.getAllObj(id).subscribe(
      (response: any) => {       
        // this.loading=false;
        console.log("dependant Object");
        console.log(response);
        this.Dobjs = response.body;
        console.log(this.Dobjs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  resetForm(_addForm:any){
    this.LOOKUP_NAME="";
    this.LOOKUP_TYPE="";
    this.DESCRIPTION="";
    this.DEP_LOOKUP_ID="";
    this.DEPENDANT="";
    this.checked=false;
    console.log(this.checked);
    this.LOOKUP_SCRIPT="";
    this.valid=true;
    
  }
  resetObjForm(_addForm:any){
    this.LOOKUP_OBJECT_ID="";
    this.OBJECT_CODE="";
    this.DISPLAY_NAME="";
    this.DESCRIPTION="";
    this.DEP_OBJECT_CODE="";
    this.desc="";
  
    
  }


  closeObjModel(){
   $('#deleteObjModal').modal('hide');
  }
  objectDismiss(){
    $('#addObject').modal('hide');

  }
  addObjBtn(){
    this.updateMode=false;
    $('#addObject').modal('show');
  }


  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.lookups);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "lookups");
    });
}

exportExcelObj() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.objs);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "lookups Obj");
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



