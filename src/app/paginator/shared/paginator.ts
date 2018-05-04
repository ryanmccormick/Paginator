import { PaginatorOptions } from './paginator-options.model';

const DEFAULT_OPTIONS = {
  sortBy: '',
  desc: false,
  resultsPerPage: 5,
  searchKeyWhitelist: [],
  objectSerializer: null
} as PaginatorOptions;

export class Paginator<T> {

  readonly _data: Array<T>;
  private _options: PaginatorOptions;
  private _searchValue: string;
  private _currentPage: number;

  constructor(data: Array<T>, options?: PaginatorOptions) {
    this._data = data;
    this._options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.setDefaults();
  }

  setDefaults(): void {
    this._searchValue = '';
    this._currentPage = 1;
  }

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    this._searchValue = value;
  }

  get filteredResults(): Array<T> {
    return this._data.filter((result: T) => {
      const test = JSON.stringify(Object.values(result)).toLowerCase();
      return test.indexOf(this.searchValue) > -1;
    }).sort((a, b) => {
      const sortByKey = this._options.sortBy ? this._options.sortBy : null;

      if (sortByKey !== null) {
        if (a[sortByKey] < b[sortByKey]) {
          return this._options.desc ? 1 : -1;
        }

        if (a[sortByKey] > b[sortByKey]) {
          return this._options.desc ? -1 : 1;
        }

        return 0;
      }
    }).map((filteredResult: T) => {
      if (!!this._options.objectSerializer === true) {
        return this._options.objectSerializer(filteredResult);
      } else {
        return filteredResult;
      }
    });
  }

  get pagedResults(): Array<T> {
    if (this.filteredResults) {
      // Calculations are based on a zero based number
      // TODO: Add some safety to prevent setting a page to a value that is less than zero or higher than ceiling.
      const currentPage = this._currentPage - 1;

      return this.filteredResults.reduce((acc, curr, index) => {
        const ix = Math.floor(index / this._options.resultsPerPage);

        if (!acc[ix]) {
          acc[ix] = [];
        }

        acc[ix].push(curr);

        return acc;
      }, [])[currentPage];
    }

    return [];
  }

  get pageNumberCeiling(): number {
    if (this.filteredResults.length > 0) {
      return Math.ceil(this.filteredResults.length / this._options.resultsPerPage);
    } else {
      return 0;
    }
  }

  get currentPageNumber(): number {
    return this._currentPage;
  }

  set currentPageNumber(value: number) {
    this.setCurrentPageNumber(value);
  }

  setCurrentPageNumber(value: number) {
    if (value > 0 && value <= this.pageNumberCeiling) {
      this._currentPage = value;
    }
  }

  getSortByKey(): string {
    return this._options.sortBy;
  }

  setSortByKey(key: string) {
    this._options.sortBy = key;
  }

  isSortByKey(key: string): boolean {
    return this._options.sortBy === key;
  }

  getSortDescending(): boolean {
    return this._options.desc;
  }

  setSortDescending(value: boolean) {
    this._options.desc = value;
  }

  get resultsPerPage(): number {
    return this._options.resultsPerPage;
  }

  set resultsPerPage(value: number) {
    this.setResultsPerPage(value);
  }

  setResultsPerPage(value: number) {
    if (value > 0) {
      this._options.resultsPerPage = value;
    } else {
      this._options.resultsPerPage = 1;
    }
  }











}
