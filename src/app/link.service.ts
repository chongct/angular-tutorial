import { Injectable } from '@angular/core';
import { Link } from './link';
import { LINKS } from './mock-links';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private linksUrl = 'api/links'; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  // GET links from the server
  getLinks(): Observable<Link[]> {
    // this.messageService.add('LinkService: fetched links');
    // using RxJs of() function to return an array of mock links from mock-links.ts
    // return of(LINKS);
    // using HttpClient to return an array of links from in-memory-data.service.ts
    // console.log(this.http.get);
    return this.http.get<Link[]>(this.linksUrl).pipe(
      tap(_ => this.log("fetched links")),
      catchError(this.handleError('getLinks', []))
    );
  }

  // GET link by id. Will 404 if id not found
  getLink(id: number): Observable<Link> {
    const url = `${this.linksUrl}/${id}`;
    // this.messageService.add(`LinkService: fetched link id=${id}`);
    // using RxJs of() function to return a mock link from mock-links.ts
    // return of(LINKS.find(link => link.id === id));
    // using HttpClient to return a link from in-memory-data.service.ts
    return this.http.get<Link>(url).pipe(
      tap(_ => this.log(`fetched link id=${id}`)),
      catchError(this.handleError<Link>(`getLink id=${id}`))
    );
  }

  // GET link by id. Will 404 if id not found
  getLinkNo404<Data>(id: number): Observable<Link> {
    const url = `${this.linksUrl}/?id=${id}`;
    return this.http.get<Link[]>(url).pipe(
      map(links => links[0]),
      tap(h => {
        const outcome = h ? "fetched" : "did not find";
        this.log(`${outcome} link id=${id}`);
      }),
      catchError(this.handleError<Link>(`getLink id=${id}`))
    );
  }

  // PUT: update the link on the server
  updateLink(link: Link): Observable<any> {
    return this.http.put(this.linksUrl, link, httpOptions).pipe(
      tap(_ => this.log(`updated link id=${link.id}`)),
      catchError(this.handleError<any>(`updateLink`))
    );
  }

  // POST: add a new link to the server
  addLink(link: Link): Observable<Link> {
    return this.http.post<Link>(this.linksUrl, link, httpOptions).pipe(
      tap((newLink: Link) => this.log(`added link w/ id=${newLink.id}`)),
      catchError(this.handleError<Link>('addLink'))
    );
  }

  // DELETE: delete the link from the server
  deleteLink(link: Link | number): Observable<Link> {
    const id = typeof link === "number" ? link : link.id;
    const url = `${this.linksUrl}/${id}`;
    return this.http.delete<Link>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted link id=${id}`)),
      catchError(this.handleError<Link>('deleteLink'))
    );
  }

  // GET links whose description contains search term
  searchLinks(term: string): Observable<Link[]> {
    if (!term.trim()) {
      // if not search term, return empty link array
      return of([]);
    }
    return this.http.get<Link[]>(`${this.linksUrl}/?description=${term}`).pipe(
      tap(_ => this.log(`found links matching "${term}"`)),
      catchError(this.handleError<Link[]>('searchLinks', []))
    );
  }


  // Log a LinkService message with the MessageService
  private log(message: string) {
    this.messageService.add(`LinkService: ${message}`);
  }

  /*
  Handle Http operation that failed.
  Let the app continue.
  @param operation - name of the operation that failed
  @param result - optional value to return as the observable result (indicated by question mark)
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // log to console
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    }
  }
}
