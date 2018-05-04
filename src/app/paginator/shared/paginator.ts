import { PaginatorOptions } from './paginator-options.model';

const DEFAULT_OPTIONS = {
  sortBy: '',
  desc: false,
  resultsPerPage: 5,
  searchKeyWhitelist: [],
  objectSerializer: null
} as PaginatorOptions;

export class Paginator<T> {

  /**
   * Immutable Data Store. Set and Typed by the constructor.
   */
  readonly _data: Array<T>;

  /**
   * Paginator Options.
   */
  private _options: PaginatorOptions;

  /**
   * Current search value text state.
   */
  private _searchValue: string;

  /**
   * Current page state.
   */
  private _currentPage: number;

  /**
   * Paginator offers an immutable data store with search, filtering and pagination bolted on.
   *
   * @param {Array<T>} data Raw list data.
   * @param {PaginatorOptions} options Paginator options.
   */
  constructor(data: Array<T>, options?: PaginatorOptions) {
    this._data = data;
    this._options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.setDefaults();
  }

  /**
   * Set the initial page and search text value.
   */
  setDefaults(): void {
    this._searchValue = '';
    this._currentPage = 1;
  }

  /**
   * Provides the current search value text state.
   *
   * @returns {string} Current search value text state.
   */
  get searchValue(): string {
    return this._searchValue;
  }

  /**
   * Updates the current search value text state.
   *
   * @param {string} value Current search value text state.
   */
  set searchValue(value: string) {
    this._searchValue = value;
  }

  /**
   * Returns sorted and filtered results.
   *
   * @returns {Array<T>}
   */
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

  /**
   * Returns sorted, filtered and paginated results.
   *
   * @returns {Array<T>}
   */
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

  /**
   * Returns the maximum page number that can be accessed.
   *
   * @returns {number} Maximum page number that can be accessed.
   */
  get pageNumberCeiling(): number {
    if (this.filteredResults.length > 0) {
      return Math.ceil(this.filteredResults.length / this._options.resultsPerPage);
    } else {
      return 0;
    }
  }

  /**
   * Returns the current page number.
   *
   * @returns {number} Current page number.
   */
  get currentPageNumber(): number {
    return this._currentPage;
  }

  /**
   * Sets the desired page number.
   *
   * @param {number} value Desired page number.
   */
  set currentPageNumber(value: number) {
    this.setCurrentPageNumber(value);
  }

  /**
   * Page number setter implementation.
   *
   * @param {number} value
   */
  setCurrentPageNumber(value: number) {
    if (value > 0 && value <= this.pageNumberCeiling) {
      this._currentPage = value;
    }
  }

  /**
   * Moves to the next page number according to upper boundaries.
   */
  moveNextPage(): void {
    const nextPage = this.currentPageNumber + 1;
    if (nextPage <= this.pageNumberCeiling) {
      this._currentPage = nextPage;
    }
  }

  /**
   * Moves to the previous page number according to lower boundaries.
   */
  movePreviousPage(): void {
    const prevPage = this.currentPageNumber - 1;
    if (prevPage > 0) {
      this._currentPage = prevPage;
    }
  }

  /**
   * Returns the current sortBy key.
   *
   * @returns {string} Current sortBy key.
   */
  getSortByKey(): string {
    return this._options.sortBy;
  }

  /**
   * Sets the current sortBy key.
   *
   * @param {string} key
   */
  setSortByKey(key: string) {
    this._options.sortBy = key;
  }

  /**
   * Returns true if the referenced sortBy key is the one that is currently set.
   *
   * @param {string} key Test key.
   * @returns {boolean} True if test key equals set key.
   */
  isSortByKey(key: string): boolean {
    return this._options.sortBy === key;
  }

  /**
   * Returns true if sort is set to descending.
   *
   * @returns {boolean} True if sort is set to descending.
   */
  getSortDescending(): boolean {
    return this._options.desc;
  }

  /**
   * Allow to set descending to true of false.
   *
   * @param {boolean} value Should set descending.
   */
  setSortDescending(value: boolean) {
    this._options.desc = value;
  }

  /**
   * Returns the current set number of results to display per page.
   * This only applies to results returned from pagedResults.
   *
   * @returns {number} Current state of results to display per page.
   */
  get resultsPerPage(): number {
    return this._options.resultsPerPage;
  }

  /**
   * Sets how many list items to display per page.
   *
   * @param {number} value Number of items to display per page.
   */
  set resultsPerPage(value: number) {
    this.setResultsPerPage(value);
  }

  /**
   * Result per page setter implementation.
   *
   * @param {number} value
   */
  setResultsPerPage(value: number) {
    if (value > 0) {
      this._options.resultsPerPage = value;
    } else {
      this._options.resultsPerPage = 1;
    }
  }

  /**
   * Returns a basic list of numbers to be used for outputting
   * a pagination component.
   *
   * @returns {Array<number>}
   */
  getBasicPaginatorList(): Array<number> {
    if (this.pageNumberCeiling > 0) {
      const pageNumberList = [];
      const maxPages = this.pageNumberCeiling;

      for (let i = 0; i < maxPages; i++) {
        pageNumberList.push(i);
      }

      return pageNumberList.map(page => page + 1);
    } else {
      return [];
    }
  }
}
