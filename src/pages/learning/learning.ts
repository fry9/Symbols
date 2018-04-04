import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-learning',
  templateUrl: 'learning.html',
})
export class LearningPage {

  symbolData: any;
  dataUrl = 'assets/data/data.json';

  @ViewChild('slider') private slider: Slides;
  numbers: any = [];

  randomOrder: boolean;
  infinite: boolean;
  hints: boolean;
  slideRange: any;

  loadDone: boolean = false;
  randomDone: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private storage: Storage) {

    storage.get('infiniteLearn').then((infiniteVal) => {
      console.log('infinite = ', infiniteVal);
      this.infinite = infiniteVal;
      //this.slider.loop = this.infinite;
    });

    storage.get('hintsLearn').then((hintsVal) => {
      console.log('hints = ', hintsVal);
      this.hints = hintsVal;
    });

    storage.get('slideLearn').then((slideVal) => {
      console.log('slide = ', slideVal);
      this.slideRange = slideVal;
      this.slideRange.lower--;
      this.slideRange.upper--;
      for (let i=this.slideRange.lower; i<=this.slideRange.upper; i++) {
        this.numbers.push(i);
      }
      this.loadDone = true;
      console.log('slide = ', slideVal);
    });

    storage.get('randomOrderLearn').then((randomOrderVal) => {
      console.log('random order = ', randomOrderVal);
      this.randomOrder = randomOrderVal;
      if (this.randomOrder == true) {
        this.numbers=this.shuffleArray(this.numbers);
      } else {
        this.randomOrder = false;
      }
    });

    this.showData();
    console.log(`New index: ${this.numbers}`);
  }

  getColor(n) {
    return 'hsl(' + (7.5*n) + ', 100%, 80%)';
  }

  getData() {
    return this.http.get(this.dataUrl);
  }

  showData() {
    this.getData()
      .subscribe(data => this.symbolData = {
        symbols: data['symbols']
      });
  }

  initDone() {
    if (this.loadDone == true ) {
      if (this.randomOrder == false) {
        return true;
      } else if (this.randomDone == true) {
        return true;
      }
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.randomDone = true;
    return array;
  }




}
