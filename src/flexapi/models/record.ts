import {Observable} from "rxjs/internal/Observable";
import {Block} from "./block";
import {Injectable, Injector} from "@angular/core";
import {ApiService} from "../api.service";
import {AppModule} from "../../app/app.module";

declare var require: any;

@Injectable()
export class Record {
    crmid: number;
    moduleName: string;
    data: {};

    constructor(private apiService: ApiService) {}

    setModuleName(moduleName: string) {
        this.moduleName = moduleName;
    }
    setCrmID(crmid: number) {
        this.crmid = crmid;
    }

    initValues(data): void {
        this.data = data;
    }

    load(): Observable<Record> {
        return new Observable<Record>(observer  => {

            this.apiService.get('records/' + this.moduleName + '/' + this.crmid).subscribe((result) => {
                this.initValues(result);

                observer.next(this);
            });
        });
    }

    get(field, defaultValue?): string {
        var entities = require("entities");

        if(typeof this.data[field] === 'undefined') {
            return defaultValue;
        }

        return entities.decodeHTML(this.data[field]);
    }

    set(data): Observable<Record> {
        return new Observable<Record>(observer  => {
            let parameters = {
                'fields': {}
            };

            for (let key in data) {
                if(data.hasOwnProperty(key)) {
                    parameters.fields[key] = data[key];
                }
            }

            this.apiService.post('records/set/' + this.moduleName + '/' + this.crmid, parameters).subscribe((result) => {

                this.load().subscribe(result => {
                    observer.next(this);
                });

            });
        });
    }

    getId(): number {
        console.log(this.data);
        return this.data['crmid'];
    }
    getModuleName(): string {
        return this.moduleName;
    }
}