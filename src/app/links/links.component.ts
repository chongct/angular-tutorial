import { Component, OnInit } from '@angular/core';
import { Link } from '../link';
// import { LINKS } from '../mock-links';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  // link = "Angular resource";
  // link: Link = {
  //   id: 1,
  //   description: "Angular",
  //   url: "https://angular.io/guide/quickstart"
  // };

  // links = LINKS;
  // selectedLink: Link;
  links: Link[];

  constructor(private linkService: LinkService) { }

  ngOnInit() {
    this.getLinks();
  }

  // onSelect(link: Link): void {
  //   this.selectedLink = link;
  // }

  getLinks(): void {
    // this.links = this.linkService.getLinks();
    this.linkService.getLinks().subscribe(links => this.links = links);
  }

  add(description: string): void {
    description = description.trim();
    if (!description) {
      return;
    }
    this.linkService.addLink({ description } as Link)
      .subscribe(link => this.links.push(link));
  }

  delete(link: Link): void {
    this.links = this.links.filter(h => h !== link);
    this.linkService.deleteLink(link).subscribe();
  }
}
