import { Component, OnInit } from '@angular/core';
import {Record} from "../../flexapi/models/record";
import {ApiService} from "../../flexapi/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {
    record: Record = null;

    constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
      let date = new Date().toLocaleDateString();

      let data = {
          'firstname': 'Firstname API ' + date,
          'lastname': 'Lastname API ' + date
      };

      this.apiService
          .module('Contacts')
          .createRecord('Contacts', data)
          .subscribe(record => {
              let data = {
                  'lastname': 'Lastname API UPDATE ' + date
              };

              this.record = record;
              
              record.set(data).subscribe(record => {
                  this.record = record;
              })
          });
  }

}
