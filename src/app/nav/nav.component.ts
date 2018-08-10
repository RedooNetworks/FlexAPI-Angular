import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../flexapi/api.service";
import {Module} from "../../flexapi/models/module";

@Component({
  selector: 'app-module-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    modules: Module[];

    selectedModule: Module;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.modules().subscribe(result => this.modules = result);
  }

    onSelect(module: Module): void {
        this.selectedModule = module;
    }

}
