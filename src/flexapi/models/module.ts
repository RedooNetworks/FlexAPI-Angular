import {Field} from "./field";
import {ApiService} from "../api.service";
import {Observable} from "rxjs/internal/Observable";
import {Block} from "./block";
import {Record} from "./record";

export class Module {
    id: string;
    title: string;
    fields:Field[];
    icon: string;

    constructor(
        private apiService: ApiService
    ) {};

    getModuleName(): string {
        return this.id;
    }

    getRecord(crmId: number): Observable<Record> {
        return new Observable<Record>(observer  => {
            let record = new Record(this.apiService);
            record.setModuleName(this.getModuleName());
            record.setCrmID(crmId);
            record.load().subscribe(result => {
                observer.next(record)
            });

        });
    }
    getFields(): Observable<Block[]> {
        return new Observable<Block[]>(observer  => {
            console.log('Send Request Fields', this.id);

            this.apiService.get('fields/get/' + this.id + '/EditView').subscribe((result) => {
                var blocks = [];
                for (var blockLabel in result) {
                    let tmp = new Block(0, blockLabel);
                    tmp.setFields(result[blockLabel]);
                    blocks.push(tmp);
                }

                observer.next(blocks)

            });

        });

    }
}