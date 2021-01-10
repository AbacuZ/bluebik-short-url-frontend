import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentUser } from './auth.model';

@Injectable()
export class AuthService {

    private API = environment.endpoint;
    private AUTH_API = this.API + '/api/v1/user/auth';
    private currentUser: CurrentUser = new CurrentUser();

    constructor(private http: HttpClient) { }

    auth(username: string, password: string): Observable<any> {
        const data = { username, password };
        return this.http.post(this.AUTH_API, data);
    }

    setCurrentUser(data: any) {
        this.currentUser.id = data.id;
        this.currentUser.username = data.username;
    }

    getUsername() {
        return this.currentUser.username;
    }
}