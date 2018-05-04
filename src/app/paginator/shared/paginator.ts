import { PaginatorOptions } from './paginator-options.model';

export const DEFAULT_OPTIONS = {
  sortBy: '',
  desc: false,
  resultsPerPage: 5,
  searchKeyWhitelist: []
} as PaginatorOptions;

export class Paginator<T> {

  readonly _data: Array<T>;
  private _options: PaginatorOptions;
  private _searchValue: string;

  constructor(data: Array<T>, options?: PaginatorOptions) {
    this._data = data;
    this._options = Object.assign({}, DEFAULT_OPTIONS, options);
    this._searchValue = '';
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
    });
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



  // get filteredList(): Array<T> {
  //   if (this._data) {
  //     return this._data.filter((item) => {
  //
  //     })
  //
  //
  //   }
  // }




}
