import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModulesComponent } from './modules/modules.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ListViewComponent } from './list-view/list-view.component';
import { NavComponent } from './nav/nav.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatIconModule, MatMenuModule, MatPaginatorModule, MatTableDataSource} from "@angular/material";
import { DetailViewComponent } from './detail-view/detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ModulesComponent,
    ListViewComponent,
    NavComponent,
    DetailViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      MatIconModule,
      MatButtonModule,
      MatMenuModule,
      MatPaginatorModule
  ],
    exports: [
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatPaginatorModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
