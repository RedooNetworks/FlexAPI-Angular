import { Injectable } from '@angular/core';
import {ModuleService} from "./services/module.service";
import {RequestService} from "./services/request.service";
import {Module} from "./models/module";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private pageLimit: number = 15;

  constructor(private moduleService: ModuleService, private requestService: RequestService) { }

  setAuth(crmUrl: string, crmUsername?: string, crmPassword?: string) {
      this.requestService.setUrl(crmUrl);

      if(crmPassword) {
          this.requestService.setAuth(crmUsername, crmPassword);
      } else {
          this.setToken(crmUsername);
      }

  }

  getPageLimit(): number {
      return this.pageLimit;
  }
  setPageLimit(limit: number): void {
      this.pageLimit = limit;
  }

  setToken(crmToken: string) {
      this.requestService.setToken(crmToken);
  }

  module(moduleName: string): Module {
      let mod = new Module(this);
      mod.id = moduleName;

      return mod;
  }

  test(): boolean {
      return this.requestService.test();
  }

    post<T>(action, parameters?): Observable<T> {
      return this.requestService.post(action, parameters);
    };

    get<T>(action, parameters?): Observable<T> {
      return this.requestService.get(action, parameters);
    };

    modules(): Observable<Module[]> {
        return this.requestService.get<Module[]>('modules/list');
  }
}
