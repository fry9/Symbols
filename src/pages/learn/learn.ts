import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LearningPage} from "../learning/learning";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-learn',
  templateUrl: 'learn.html'
})
export class LearnPage {

  randomOrder: boolean;
  infinite: boolean;
  hints: boolean;
  slide: any;

  constructor(public navCtrl: NavController, private storage: Storage) {

    storage.get('infiniteLearn').then((infiniteVal) => {
      console.log('infinite = ', infiniteVal);
      this.infinite = infiniteVal;
    });

    storage.get('hintsLearn').then((hintsVal) => {
      console.log('hints = ', hintsVal);
      this.hints = hintsVal;
    });

    storage.get('slideLearn').then((slideVal) => {
      console.log('slide = ', slideVal);
      this.slide = slideVal;
    });

    storage.get('randomOrderLearn').then((randomOrderVal) => {
      console.log('random order = ', randomOrderVal);
      if (randomOrderVal == null) {
        storage.set('randomOrderLearn', 'false');
        storage.set('infiniteLearn', 'false');
        storage.set('hintsLearn', 'false');
        storage.set('slideLearn', { lower: 1, upper: 46 });
        this.randomOrder = false;
        this.infinite = false;
        this.hints = false;
        this.slide = { lower: 1, upper: 46 };
      } else {
        this.randomOrder = randomOrderVal;
      }
    });

  }


  randomOrderUpdate(event) {
    this.storage.set('randomOrderLearn', event);
  }
  infiniteUpdate(event) {
    this.storage.set('infiniteLearn', event);
  }
  hintsUpdate(event) {
    this.storage.set('hintsLearn', event);
  }
  slideChange(event) {
    this.storage.set('slideLearn', event);
  }


  startLearning() {
    this.navCtrl.push(LearningPage);
  }

}
