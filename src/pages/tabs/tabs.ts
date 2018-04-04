import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { LearnPage } from '../learn/learn';
import { TestPage } from '../test/test';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LearnPage;
  tab3Root = TestPage;

  constructor() {

  }
}
