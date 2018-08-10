import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../Config'
import {ApiService} from "../../flexapi/api.service";

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {

  }

}
