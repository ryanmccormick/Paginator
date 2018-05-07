import { Component, OnInit } from '@angular/core';

import { MockDataService } from '../../data/mock-data.service';
import { Paginator } from '../../paginator/shared/paginator';
import { MockData } from '../../data/mock-data.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mockData: Paginator<MockData>;

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.mockDataService.getMockData()
      .subscribe(data => this.mockData = new Paginator<MockData>(data, {sortBy: 'item'}));
  }

}
