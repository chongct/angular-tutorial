import { Component, OnInit } from '@angular/core';
import { Link } from '../link';
import { LINKS } from '../mock-links';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  // link = "Angular resource";
  link: Link = {
    id: 1,
    description: "Angular",
    url: "https://angular.io/guide/quickstart"
  };

  links = LINKS;
  selectedLink: Link;

  constructor() { }

  ngOnInit() {
  }

  onSelect(link: Link): void {
    this.selectedLink = link;
  }

}