import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {TestingPage} from "../testing/testing";

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {

  randomOrder: boolean;
  hints: boolean = false;
  slide: any;
  diffRange: number;
  diffStringList: any = ["Simple", "Easy", "Standard", "Medium", "Hard", "Weeb"];
  diffString: string;

  storedTotalGames: number;

  constructor(public navCtrl: NavController, private storage: Storage) {

    storage.get('diffRangeTest').then((diffRangeVal) => {
      console.log('infinite = ', diffRangeVal);
      this.diffRange = diffRangeVal;
      this.diffString = this.diffStringList[this.diffRange/2-1];
    });

    storage.get('slideTest').then((slideVal) => {
      console.log('slide = ', slideVal);
      this.slide = slideVal;
    });

    storage.get('storedTotalGames').then((storedTotalGamesVal) => {
      console.log('storedTotalGames = ', storedTotalGamesVal);
      this.storedTotalGames = storedTotalGamesVal;
    });

    storage.get('randomOrderTest').then((randomOrderVal) => {
      console.log('random order = ', randomOrderVal);
      if (randomOrderVal == null) {
        storage.set('randomOrderTest', 'false');
        storage.set('diffRangeTest', 6);
        storage.set('slideTest', { lower: 1, upper: 46 });
        this.randomOrder = false;
        this.diffRange = 6;
        this.hints = false;
        this.slide = { lower: 1, upper: 46 };
        this.storedTotalGames = 0;
      } else {
        this.randomOrder = randomOrderVal;
      }
    });

  }


  randomOrderUpdate(event) {
    this.storage.set('randomOrderTest', event);
  }
  rangeUpdate(event) {
    this.storage.set('diffRangeTest', event);
    this.diffString = this.diffStringList[event/2-1];
  }
  slideChange(event) {
    this.storage.set('slideTest', event);
  }

  startTest() {
    this.storedTotalGames++;
    this.storage.set('storedTotalGames', this.storedTotalGames);
    this.navCtrl.push(TestingPage);
  }
}
