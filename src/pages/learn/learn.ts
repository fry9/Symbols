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
  tapShow: boolean;
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

    storage.get('tapShowLearn').then((tapShowVal) => {
      console.log('tapShow = ', tapShowVal);
      this.tapShow = tapShowVal;
    });

    storage.get('randomOrderLearn').then((randomOrderVal) => {
      console.log('random order = ', randomOrderVal);
      if (randomOrderVal == null) {
        storage.set('randomOrderLearn', 'false');
        storage.set('infiniteLearn', 'false');
        storage.set('hintsLearn', 'false');
        storage.set('slideLearn', { lower: 1, upper: 46 });
        storage.set('tapShowLearn', 'false');
        this.tapShow = false;
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
  tapShowCahnge(event) {
    this.storage.set('tapShowLearn', event);
  }


  startLearning() {
    this.navCtrl.push(LearningPage);
  }

  copy() {


    this.storage.get('slideTest').then((slideVal) => {
      console.log('slide = ', slideVal);
      this.slide = slideVal;
      this.storage.set('slideLearn', this.slide);
    });

    this.storage.get('tapShowTest').then((tapShowVal) => {
      console.log('tapShow = ', tapShowVal);
      this.tapShow = tapShowVal;
      this.storage.set('tapShowLearn', this.tapShow);
    });


    this.storage.get('randomOrderTest').then((randomOrderVal) => {
      console.log('random order = ', randomOrderVal);
      if (randomOrderVal == null) {
        this.storage.set('randomOrderTest', 'false');
        this.storage.set('diffRangeTest', 6);
        this.storage.set('slideTest', { lower: 1, upper: 46 });
        this.randomOrder = false;
        this.slide = { lower: 1, upper: 46 };
      } else {
        this.randomOrder = randomOrderVal;
        this.storage.set('randomOrderLearn', this.randomOrder);
      }
    });
  }

}
