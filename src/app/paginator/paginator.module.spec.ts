import { PaginatorModule } from './paginator.module';

describe('PaginatorModule', () => {
  let paginatorModule: PaginatorModule;

  beforeEach(() => {
    paginatorModule = new PaginatorModule();
  });

  it('should create an instance', () => {
    expect(paginatorModule).toBeTruthy();
  });
});
