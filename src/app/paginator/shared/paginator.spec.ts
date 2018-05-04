import { Paginator } from './paginator';


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






});


export const MOCK_DATA = [
  { id: 'aaaa1', item: 'Alpha' },
  { id: 'bbbb1', item: 'Bravo' },
  { id: 'cccc1', item: 'Charlie' },
  { id: 'dddd1', item: 'Delta' },
  { id: 'eeee1', item: 'Echo' },
  { id: 'ffff1', item: 'Foxtrot' },
  { id: 'gggg1', item: 'Gulf' },
  { id: 'hhhh1', item: 'Hotel' },
  { id: 'iiii1', item: 'India' },
  { id: 'jjjj1', item: 'Juliet' },
  { id: 'kkkk1', item: 'Kilo' },
  { id: 'llll1', item: 'Lima' },
  { id: 'mmmm1', item: 'Mike' },
  { id: 'nnnn1', item: 'November' },
  { id: 'oooo1', item: 'Oscar' },
  { id: 'pppp1', item: 'Papa' },
  { id: 'qqqq1', item: 'Quebec' },
  { id: 'rrrr1', item: 'Romeo' },
  { id: 'ssss1', item: 'Sierra' },
  { id: '2tttt1', item: 'Tango' },
  { id: 'uuuu1', item: 'Uniform' },
  { id: 'vvvv1', item: 'Victor' },
  { id: 'wwww1', item: 'Whiskey' },
  { id: 'xxxx1', item: 'X-ray' },
  { id: '1yyyy1', item: 'Yankee' },
  { id: 'zzzz1', item: 'Zulu' }
];

export class MockData {
  id: string;
  item: string;
}
