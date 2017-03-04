import { EquipoFEPage } from './app.po';

describe('equipo-fe App', () => {
  let page: EquipoFEPage;

  beforeEach(() => {
    page = new EquipoFEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
