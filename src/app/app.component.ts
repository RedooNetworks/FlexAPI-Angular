import { Component } from '@angular/core';
import {ApiService} from "../flexapi/api.service";
import {CONFIG} from "./Config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'flexapi';

    constructor(private apiService: ApiService){
//        this.apiService.setAuth(CONFIG.crmUrl, CONFIG.crmUsername, CONFIG.crmPassword);

        this.apiService.setAuth(CONFIG.crmUrl, 'fdad255350e2e8b1fa11823864fb56aa9856b85ca8792abe52445d1153eacd26');
        this.apiService.setPageLimit(15);

    }
}
