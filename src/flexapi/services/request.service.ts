import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from "rxjs/operators";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json ' })
};

@Injectable({
  providedIn: 'root'
})

export class RequestService {
    private crmUrl: string = '';
    private crmToken: string = '';
    private crmUsername: string = '';
    private crmPassword: string = '';
    private initialized = false;

    constructor(private http: HttpClient) { }

    setUrl(url: string): void {
        this.crmUrl = url + '/modules/FlexAPI/api.php';
    };

    setToken(token: string) {
      this.crmToken = token;
    };



    setAuth(username?: string, password?: string): void {
        this.crmUsername = username;
        this.crmPassword = password;
    }

    init(): void{
        if(this.initialized === false) {
            this.post('login/login', { 'username': this.crmUsername, 'password': this.crmPassword}).subscribe((response: Object) => {
                console.log(response);
            });
        }
    };

    test(): boolean {
        return (this.crmUrl !== '');
    }

    get<T>(action, parameters?): Observable<T> {
        if(action !== 'login/login') {
            this.init();
        }

        return this.request<T>('GET', action, parameters);
    }

    post<T>(action, parameters): Observable<T> {
        if(action !== 'login/login') {
            this.init();
        }

        return this.request('POST', action, parameters);
    }

    request<T>(method, action, parameters): Observable<T> {
        let args = {};

        if (parameters) {
            args['params'] = parameters;
        }

        args['method'] = method;
        args['action'] = action;

        if(this.crmToken !== '') {
            args['user-token'] = this.crmToken;
        }

        return new Observable(observer  => {
            // console.log('Send Request', args);

            this.http.post<Response>(this.crmUrl, args, httpOptions).subscribe(result => {
                if(result['result'] != 0) {
                    console.error(result);
                }

                observer.next(result['data']);
            });

        });
    };

    private handleError<T> (result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error('Error', error); // log to console instead

            // TODO: better job of transforming error for user consumption

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
