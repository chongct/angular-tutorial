// import { Component, OnInit, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Link } from '../link';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LinkService } from '../link.service';


@Component({
  selector: 'app-link-detail',
  templateUrl: './link-detail.component.html',
  styleUrls: ['./link-detail.component.scss']
})
export class LinkDetailComponent implements OnInit {
  link: Link;

  constructor(
    private route: ActivatedRoute,
    private linkService: LinkService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getLink();
  }

  // @Input() link: Link;

  getLink(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // console.log(this.route.snapshot.paramMap.get);
    this.linkService.getLink(id).subscribe(link => this.link = link);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.linkService.updateLink(this.link)
      .subscribe(() => this.goBack());
  }
}
