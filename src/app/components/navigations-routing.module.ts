import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../interceptor/auth.guard';
import { NavbarComponent } from '../navbar/navbar.component';
import { BusinessAttributeComponent } from './businessObject/business-attribute/business-attribute.component';
import { BusinessTableComponent } from './businessObject/business-table/business-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProcessroletreeComponent } from './processroles/processroletree/processroletree.component';

const routes: Routes = [
  { path:'' , component: NavbarComponent ,  //NavsComponent
    children:[
      { path:'dashboard', component: DashboardComponent ,  canActivate:[AuthGuard]  } ,
      { path:'processrole', component: ProcessroletreeComponent ,  canActivate:[AuthGuard]  } ,
      
      { path:'businessObject', component: BusinessTableComponent ,  canActivate:[AuthGuard]  } ,
      { path:'objectAttribute', component: BusinessAttributeComponent ,  canActivate:[AuthGuard]  } ,

  ]
},


];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
