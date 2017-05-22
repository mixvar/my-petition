import { MyPetitionFrontPage } from './app.po';

describe('my-petition-front App', () => {
  let page: MyPetitionFrontPage;

  beforeEach(() => {
    page = new MyPetitionFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
