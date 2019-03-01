import { Component, OnInit } from '@angular/core';
import { Link } from '../link';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  links: Link[] = [];

  constructor(private linkService: LinkService) { }

  ngOnInit() {
    this.getLinks();
  }

  getLinks(): void {
    this.linkService.getLinks().subscribe(links => this.links = links.slice(1, 3));
  }
}
