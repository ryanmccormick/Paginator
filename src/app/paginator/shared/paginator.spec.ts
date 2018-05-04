import { Paginator } from './paginator';
import { MockData } from '../../data/mock-data.model';
import { MOCK_DATA } from './mock-data.constants';


fdescribe('Paginator object', () => {
  let paginator: Paginator<MockData>;

  beforeEach(() => {
    paginator = new Paginator<MockData>(MOCK_DATA);
  });

  describe('Paginator', () => {
    it('should be defined', () => {
      expect(paginator).toBeDefined();
    });
  });

  describe('Paginator#searchValue', () => {
    it('should be defined', () => {
      expect(paginator.searchValue).toBeDefined();
    });

    it('should set and get search value', () => {
      paginator.searchValue = 'abcd';
      expect(paginator.searchValue).toEqual('abcd');
    });
  });

  describe('Paginator#filteredResults', () => {
    it('should be defined', () => {
      expect(paginator.filteredResults).toBeDefined();
    });

    it('should return all results when search text is empty', () => {
      paginator.searchValue = '';
      expect(paginator.filteredResults.length).toEqual(26, 'results not filtering correctly!');
    });

    it('should return zero results when using the name of a key as search text', () => {
      paginator.searchValue = 'id';
      expect(paginator.filteredResults.length).toEqual(0, 'search may be including keys as part of filter criteria');
    });

    it('should return one item when searching for a specific key', () => {
      paginator.searchValue = 'mmmm1';
      expect(paginator.filteredResults.length).toEqual(1);
      expect(paginator.filteredResults[0].item).toEqual('Mike');
    });

    it('should return a destructured object representation of an array item because no objectSerializer has been set', () => {
      paginator.searchValue = '';
      expect(paginator.filteredResults.length).toEqual(26);
      expect(paginator.filteredResults[0] instanceof MockData).toEqual(false);
    });

    it('should return a select group of items when searching by a couple of letters', () => {
      paginator.searchValue = 'an';
      expect(paginator.filteredResults.length).toEqual(2);
    });

    it('should sort ascending by the `item` key', () => {
      paginator.searchValue = 'an';
      paginator.setSortByKey('item');
      expect(paginator.filteredResults.length).toEqual(2);
      expect(paginator.filteredResults[0].item).toEqual('Tango');
    });

    it('should sort descending by the `item` key', () => {
      paginator.searchValue = 'an';
      paginator.setSortByKey('item');
      paginator.setSortDescending(true);
      expect(paginator.filteredResults.length).toEqual(2);
      expect(paginator.filteredResults[0].item).toEqual('Yankee');
    });
  });

  describe('Paginator#pagedResults', () => {
    it('should be defined', () => {
      expect(paginator.pagedResults).toBeDefined();
    });

    it('should return five results as the default settings are set to five results per page', () => {
      expect(paginator.pagedResults.length).toEqual(5);
      expect(paginator.currentPageNumber).toEqual(1);
      expect(paginator.pageNumberCeiling).toEqual(6);
    });

    it('should return ten results per page', () => {
      paginator.resultsPerPage = 10;
      expect(paginator.pagedResults.length).toEqual(10);
      expect(paginator.pageNumberCeiling).toEqual(3);
    });
  });

  describe('Paginator#getbasicPaginatorList', () => {
    it('should be defined', () => {
      expect(paginator.getBasicPaginatorList).toBeDefined();
    });

    it('should return a list of numbers', () => {
      const paginatorList = paginator.getBasicPaginatorList();
      console.log(paginatorList);
      paginator.resultsPerPage = 5;
      expect(paginator.pagedResults.length).toEqual(5);
      expect(paginator.pageNumberCeiling).toEqual(6);
      expect(paginatorList.length).toEqual(6);
      expect(paginatorList[0]).toEqual(1);
      expect(paginatorList[5]).toEqual(6);
    });
  });

  describe('Paginator#moveNextPage', () => {
    it('should be defined', () => {
      expect(paginator.moveNextPage).toBeDefined();
    });

    it('should set the next page', () => {
      paginator.currentPageNumber = 1;
      paginator.moveNextPage();
      expect(paginator.currentPageNumber).toEqual(2);
    });

    it('should not exceed the page number ceiling', () => {
      paginator.setResultsPerPage(5);
      paginator.currentPageNumber = 6;
      paginator.moveNextPage();
      expect(paginator.currentPageNumber).toEqual(6);
    });
  });

  describe('Paginator#movePreviousPage', () => {
    it('should be defined', () => {
      expect(paginator.movePreviousPage).toBeDefined();
    });

    it('should set the previous page', () => {
      paginator.currentPageNumber = 6;
      paginator.movePreviousPage();
      expect(paginator.currentPageNumber).toEqual(5);
    });

    it('should not exceed the page number ceiling', () => {
      paginator.setResultsPerPage(5);
      paginator.currentPageNumber = 1;
      paginator.movePreviousPage();
      expect(paginator.currentPageNumber).toEqual(1);
    });
  });

  describe('Paginator#setCurrentPageNumber', () => {
    it ('should be defined', () => {
      expect(paginator.currentPageNumber).toBeDefined();
    });

    it ('should allow to set first page within page boundaries', () => {
      paginator.resultsPerPage = 5;
      paginator.currentPageNumber = 1;
      expect(paginator.currentPageNumber).toEqual(1);
    });

    it ('should allow to set last page within boundaries', () => {
      paginator.resultsPerPage = 5;
      paginator.currentPageNumber = 6;
      expect(paginator.currentPageNumber).toEqual(6);
    });

    it ('should not allow to set page to zero', () => {
      paginator.resultsPerPage = 5;
      paginator.currentPageNumber = 0;
      expect(paginator.currentPageNumber).not.toEqual(0);
      expect(paginator.currentPageNumber).toEqual(1);
    });

    it ('should not allow to set page past ceiling of six.', () => {
      paginator.resultsPerPage = 5;
      paginator.currentPageNumber = 11;
      expect(paginator.currentPageNumber).not.toEqual(11);
    });
  });


  describe('Paginator Object Serializer', () => {
    let paginatorSerial: Paginator<MockData>;

    beforeEach(() => {
      const options = {
        objectSerializer: (item: MockData) => MockData.getInstance(item)
      };

      paginatorSerial = new Paginator<MockData>(MOCK_DATA, options);
    });

    it ('should be defined', () => {
      expect(paginatorSerial).toBeDefined();
    });

    it('should return a list of new instances of MockData from filteredResults', () => {
      expect(paginatorSerial.filteredResults.length).toEqual(26);
      expect(paginatorSerial.filteredResults[0] instanceof MockData).toEqual(true, 'object serializer not hooked up');
    });
  });

});

