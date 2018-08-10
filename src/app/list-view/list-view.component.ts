import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../flexapi/api.service";
import {ActivatedRoute} from "@angular/router";
import {Listing} from "../../flexapi/models/listing";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  currentModule: string = '';

  headers: {};
  entries: {};
  total: number;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
      // console.log('init 1');
      this.route.params.subscribe(params => {
          this.currentModule = this.route.snapshot.paramMap.get('modulename');
          let listing = new Listing(this.apiService.module(this.currentModule), this.apiService);
          listing.exec().subscribe(result => {
              this.headers = listing.getHeaders();
              this.entries = listing.getEntries();
              this.total = listing.getTotal();
          });
      });
    //console.log(this.currentModule, this.apiService.test());
  }

}
