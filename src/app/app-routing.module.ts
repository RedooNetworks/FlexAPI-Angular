import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListViewComponent} from "./list-view/list-view.component";
import {DetailViewComponent} from "./detail-view/detail-view.component";

const routes: Routes = [
    { path: 'data/:modulename', component: ListViewComponent },
    { path: 'data/:modulename/:crmid', component: DetailViewComponent },
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule { }
