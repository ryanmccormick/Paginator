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
    this.mockDataService.getMockData().subscribe(data => this.setMockData(data));
  }

  get searchValue() {
    return this.mockData.searchValue;
  }

  set searchValue(value: string) {
    this.mockData.searchValue = value;
  }

  get resultsPerPage(): number {
    return this.mockData.resultsPerPage;
  }

  set resultsPerPage(value: number) {
    this.mockData.resultsPerPage = value;
  }

  get mockDataList(): Array<MockData> {
    if (this.mockData) {
      return this.mockData.pagedResults;
    } else {
      return [];
    }
  }

  get paginationList(): Array<number> {
    return this.mockData.getBasicPaginatorList();
  }

  setMockData(value: Array<MockData>): void {
    if (value) {
      this.mockData = new Paginator<MockData>(value, {sortBy: 'item'});
    }
  }

  setPage(value: number) {
    this.mockData.currentPageNumber = value;
  }

  isCurrentPage(value: number): boolean {
    return this.mockData.currentPageNumber === value;
  }

  moveNextPage(): void {
    this.mockData.moveNextPage();
  }

  movePreviousPage(): void {
    this.mockData.movePreviousPage();
  }


}
