import { Injectable } from '@angular/core';
import { Link } from './link';
import { LINKS } from './mock-links';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private messageService: MessageService) { }

  getLinks(): Observable<Link[]> {
    this.messageService.add('LinkService: fetched links');
    return of(LINKS);
  }
}
