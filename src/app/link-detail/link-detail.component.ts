import { Component, OnInit, Input } from '@angular/core';
import { Link } from '../link';

@Component({
  selector: 'app-link-detail',
  templateUrl: './link-detail.component.html',
  styleUrls: ['./link-detail.component.scss']
})
export class LinkDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() link: Link;

}
