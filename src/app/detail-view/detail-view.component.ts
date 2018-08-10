import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Listing} from "../../flexapi/models/listing";
import {ApiService} from "../../flexapi/api.service";
import {Block} from "../../flexapi/models/block";
import {Record} from "../../flexapi/models/record";

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
    currentModule: string = '';
    crmId: number = 0;
    fields: Block[];
    record: Record;

    constructor(private apiService: ApiService, private route: ActivatedRoute) { }

    ngOnInit() {
        // console.log('init 1');
        this.route.params.subscribe(params => {
            this.currentModule = this.route.snapshot.paramMap.get('modulename');
            this.crmId = +this.route.snapshot.paramMap.get('crmid');

            console.log(this.currentModule, this.crmId);
            let module = this.apiService.module(this.currentModule);
            module.getFields().subscribe(fields => this.fields = fields);

            module.getRecord(this.crmId).subscribe(record => {
              this.record = record;
            });
        });
    }

}
