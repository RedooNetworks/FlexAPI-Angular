import {Module} from "./module";
import {Observable} from "rxjs/internal/Observable";
import {Record} from "./record";
import {ApiService} from "../api.service";

export class Listing {
    private module: Module;

    private headers: Object[] = [];
    private entries: Record[] = [];

    private customviewid: number = 0;
    private currentPage: number = 1;
    private loadedPage: number = 0;
    private total: number = 0;

    constructor(module: Module, private apiService: ApiService) {
        this.module = module;
    }

    setCustomView(customviewid: number) {
        this.customviewid = customviewid;
        this.loadedPage = 0;
        this.headers = [];
        this.entries = [];
    }
    setPage(page: number) {
        this.currentPage = page;
    }

    exec() {
        return new Observable(observer  => {
            let endpoint = 'listing/list/' + this.module.getModuleName() + '';

            if (this.customviewid) {
                endpoint += '/' + this.customviewid;
            }

            let parameters = {};
            parameters['Limit'] = this.apiService.getPageLimit();
            parameters['page'] = this.currentPage;

            this.apiService.get(endpoint, parameters).subscribe((result) => {
                this.headers = result['headers'];
                this.entries = [];
                this.total = result['total'];
                this.loadedPage = this.currentPage;

                for (var recordData in result['entries']) {
                    let tmp = new Record(this.apiService);
                    tmp.setModuleName(this.module.getModuleName());
                    tmp.setCrmID(result['entries'][recordData]['crmid']);
                    tmp.initValues(result['entries'][recordData]);
                    this.entries.push(tmp);
                }

                observer.next(true);
            });

        });
    }

    getHeaders(): Object[] {
        return this.headers;
    }

    getEntries(): Record[] {
        return this.entries;
    }

    getTotal(): number {
        return this.total;
    }

}