import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Friend } from '../models/friend';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})

export class FriendService {

  SrvApiUrl = environment . apiUrl ;

  constructor(private http: HttpClient) { }

/*
** Generic api call - should exist for each and every Http Service
*/

  get<Friend>(id: string) { return this.http.get<Friend>(`${this.SrvApiUrl}/${id}`); } ;
  getAll<Friend> () { return this.http.get<Friend[]>(`${this.SrvApiUrl}`); }

  put<Friend>(content: string) { return this.http.put<Friend>(`${this.SrvApiUrl}`, `${content}`, httpOptions) ;	}

  patch<Friend>(id: string, content: string) { return this.http.patch<Friend>(`${this.SrvApiUrl}/${id}`, `${content}`, httpOptions) ;	}
  post<Friend>(id: string, content: string) { return this.http.post<Friend>(`${this.SrvApiUrl}/${id}`, `${content}`, httpOptions) ;	}

  delete(id: string) { return this.http.delete<Friend>(`${this.SrvApiUrl}/${id}`) ;	}

/*
** Special api call - should exist only when needed and matching with the Current Service
*/

  acceptFrienship (id: number) { return this.http.post<Friend>(`${this.SrvApiUrl}/${id}/accept`, ``, httpOptions) ; }
  refuseFrienship (id: number) { return this.http.post<Friend>(`${this.SrvApiUrl}/${id}/refuse`, ``, httpOptions) ; }
  revokeFriendship (id: number) { return this.http.delete<Friend>(`${this.SrvApiUrl}/${id}`, httpOptions) ; }
}
