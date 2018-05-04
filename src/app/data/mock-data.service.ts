import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MockData } from './mock-data.model';

@Injectable()
export class MockDataService {

  constructor(private http: HttpClient) { }

  getMockData(): Observable<Array<MockData>> {
    return this.http.get<Array<MockData>>('assets/api/mockdata.json');
  }
}
