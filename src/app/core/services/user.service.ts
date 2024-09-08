import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment'
import { User } from '../models/user'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class UserService {
  SrvApiUrl = environment . apiUrl ;

  constructor(private http: HttpClient) { }

/*
** Generic api call - should exist for each and every Http Service
*/

  get<Friend>(id: string) { return this.http.get<User>(`${this.SrvApiUrl}/${id}`); } ;
  getAll<Friend> () { return this.http.get<User[]>(`${this.SrvApiUrl}`); }

  put<Friend>(content: string) { return this.http.put<User>(`${this.SrvApiUrl}`, `${content}`, httpOptions) ;	}

  patch<Friend>(id: string, content: string) { return this.http.patch<User>(`${this.SrvApiUrl}/${id}`, `${content}`, httpOptions) ;	}
  post<Friend>(id: string, content: string) { return this.http.post<User>(`${this.SrvApiUrl}/${id}`, `${content}`, httpOptions) ;	}

  delete(id: string) { return this.http.delete<User>(`${this.SrvApiUrl}/${id}`) ;	}

/*
** Special api call - should exist only when needed and matching with the Current Service
*/
  getUserHeadings (id: string) {
    return this.http.get(`${this.SrvApiUrl}/${id}/heading`);
  }

  getUserHeadingItems (id: string, heaid: string) {
    return this.http.get(`${this.SrvApiUrl}/${id}/heading/${heaid}/item`);
  }

  getWarehouse (id: string) {
    return this.http.get(`${this.SrvApiUrl}/${id}/warehouse`);
  }

  getAwaitingNotifNum (id: string) {
    return this.http.get(`${this.SrvApiUrl}/${id}/awaitingNotifNum`);
  }

  getAwaitingNotifs (id: string) {
    return this.http.get(`${this.SrvApiUrl}/${id}/awaitingNotifs`);
  }

  ackNotif (id: string, nid: string) {
    return this.http.get(`${this.SrvApiUrl}/${id}/notification/${nid}/acknowledge`);
  }

  isAdmin (id: string) {
    return this.http.get(`${this.SrvApiUrl}/${id}/isAdmin`);
  }

  getUserStats (id: string) {
    return this.http.get(`${this.SrvApiUrl}/${id}/stat`);
  }
}
