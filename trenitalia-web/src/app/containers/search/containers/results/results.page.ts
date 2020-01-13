import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'ti-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  params: Params;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }

}
