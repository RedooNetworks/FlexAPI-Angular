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

        this.apiService.setAuth(CONFIG.crmUrl, 'b451fd13456b7c50b4233d14ae17c1d715a8d24441c3d8f1f50afe140db8f513');
        this.apiService.setPageLimit(15);

    }
}
