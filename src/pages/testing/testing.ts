import {Component, Renderer2, ViewChild} from '@angular/core';
import {Button, IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {Vibration} from "@ionic-native/vibration";

@IonicPage()
@Component({
  selector: 'page-testing',
  templateUrl: 'testing.html',
})
export class TestingPage {

  symbolData: any;
  dataUrl = 'assets/data/data.json';

  @ViewChild('slider') private slider: Slides;
  @ViewChild('wrongBtn') private wrongBtn: Button;
  @ViewChild('rightBtn') private rightBtn: Button;
  numbers: any = [];
  randoms: any = [];
  randNum: any = [];
  wrongGuessButtons: any [];

  scoreRight: number = 0;
  scoreWrong: number = 0;
  scoreWrongAnimToggle: boolean = false;
  scoreRightAnimToggle: boolean = false;
  scoreToggle: boolean = true;

  randomOrder: boolean;
  randomDone: boolean = false;
  slideRange: any;

  numButtons: number;
  buttonsDone: boolean = false;
  buttons: any = [];

  failsInRowCounter: number = 0;
  hint: boolean = false;

  storedTotalClicks: number;
  storedTotalPoints: number;
  storedTotalFails: number;
  storedTotalGames: number;

  answerVisible: boolean = false;
  buttonBox: boolean = true;
  tapShow: boolean;

  endScreen: boolean = false;

  endStrings: any = ["Horrible!", "Better luck next time", "You might need some practice", "You can do better!", "Good job!", "Wow such masterful skill", "God mode achieved!"];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private storage: Storage, private vibration: Vibration, public renderer: Renderer2) {

    storage.get('diffRangeTest').then((diffRangeVal) => {
      console.log('diffRangeTest = ', diffRangeVal);
      this.numButtons = diffRangeVal;
      if(this.numButtons == null)
        this.numButtons = 6;
      this.buttons = Array(this.numButtons).fill(0).map((x,i)=>i);
      this.wrongGuessButtons = Array(this.numButtons).fill(false);
    });

    storage.get('tapShowTest').then((tapShowVal) => {
      console.log('tapShow = ', tapShowVal);
      this.tapShow = tapShowVal;
      this.answerVisible = !this.tapShow;
    });

    storage.get('storedTotalClicks').then((storedTotalClicksVal) => {
      console.log('storedTotalClicks = ', storedTotalClicksVal);
      this.storedTotalClicks = storedTotalClicksVal;
    });

    storage.get('storedTotalPoints').then((storedTotalPointsVal) => {
      console.log('storedTotalPoints = ', storedTotalPointsVal);
      this.storedTotalPoints = storedTotalPointsVal;
    });

    storage.get('storedTotalFails').then((storedTotalFailsVal) => {
      console.log('storedTotalFails = ', storedTotalFailsVal);
      this.storedTotalFails = storedTotalFailsVal;
    });

    storage.get('slideTest').then((slideVal) => {
      console.log('slide = ', slideVal);
      this.slideRange = slideVal;
      this.slideRange.lower--;
      this.slideRange.upper--;
      for (let i=this.slideRange.lower; i<=this.slideRange.upper; i++) {
        this.numbers.push(i);
      }
      this.setRandom();
    });

    storage.get('randomOrderTest').then((randomOrderVal) => {
      console.log('random order = ', randomOrderVal);
      this.randomOrder = randomOrderVal;
      if (this.randomOrder == true) {
        this.numbers=this.shuffleArray(this.numbers);
      } else {
        this.randomOrder = false;
      }
    });

    this.showData();

  }

  getRandom(btn, n) {
    return this.randoms[n][btn];
  }

  setRandom() {

    for (let n=this.slideRange.lower; n<=this.slideRange.upper; n++) {
      this.randoms.push(n);
      let numberArr = Array(45).fill(0).map((x,i)=>i);
      numberArr.splice(n,1);
      this.randNum = [];

      for(let i=0; i<this.numButtons; i++) {
        this.randNum.push(numberArr.splice(Math.floor((Math.random()*numberArr.length)), 1));
      }

      this.randoms[n] = this.randNum;
      this.randoms[n][Math.floor((Math.random()*(this.numButtons)))] = n;
    }

    this.buttonsDone = true;
  }

  /*
  setRandom() {
    for (let n=this.slideRange.lower; n<=this.slideRange.upper; n++) {
      this.randoms.push(n);
      this.randNum = [];

      for(let i=0; i<this.numButtons; i++) {
        this.randNum.push(Math.floor((Math.random()*45)));

        for(let j=0; j<i; j++) {
          if ((this.randNum[i] == this.randNum[j]) || (this.randNum[i] == n)) {
            this.randNum[i] = Math.floor((Math.random()*45));
            j=0;
            i=0;
          }
        }
      }

      this.randoms[n] = this.randNum;
      this.randoms[n][Math.floor((Math.random()*(this.numButtons)))] = n;
    }
    this.buttonsDone = true;
  }
  */

  animWrong() {
    this.scoreRightAnimToggle = true;
    this.renderer.removeClass(this.rightBtn.getNativeElement(), 'rightAnim');
    this.renderer.removeClass(this.rightBtn.getNativeElement(), 'rightAnim2');

    if(this.scoreWrongAnimToggle) {
      this.renderer.removeClass(this.wrongBtn.getNativeElement(), 'wrongAnim');
      this.renderer.addClass(this.wrongBtn.getNativeElement(), 'wrongAnim2');
      this.scoreWrongAnimToggle = false;
    } else {
      this.renderer.removeClass(this.wrongBtn.getNativeElement(), 'wrongAnim2');
      this.renderer.addClass(this.wrongBtn.getNativeElement(), 'wrongAnim');
      this.scoreWrongAnimToggle = true;
    }

  }

  animRight() {
    this.scoreWrongAnimToggle = true;
    this.renderer.removeClass(this.wrongBtn.getNativeElement(), 'wrongAnim');
    this.renderer.removeClass(this.wrongBtn.getNativeElement(), 'wrongAnim2');

    if(this.scoreRightAnimToggle) {
      this.renderer.removeClass(this.rightBtn.getNativeElement(), 'rightAnim');
      this.renderer.addClass(this.rightBtn.getNativeElement(), 'rightAnim2');
      this.scoreRightAnimToggle = false;
    } else {
      this.renderer.removeClass(this.rightBtn.getNativeElement(), 'rightAnim2');
      this.renderer.addClass(this.rightBtn.getNativeElement(), 'rightAnim');
      this.scoreRightAnimToggle = true;
    }
  }

  guessClick(btn, n, e) {
    this.storedTotalClicks++;
    if (n == this.randoms[n][btn]) {
      this.slider.slideNext();
      this.hint = false;
      this.failsInRowCounter = 0;
      this.scoreRight++;
      this.storedTotalPoints++;
      this.wrongGuessButtons = Array(this.numButtons).fill(false);
      this.storage.set('storedTotalClicks', this.storedTotalClicks);
      this.storage.set('storedTotalPoints', this.storedTotalPoints);
      this.storage.set('storedTotalFails', this.storedTotalFails);
      this.animRight();
      this.answerVisible = !this.tapShow;
    } else {
      this.wrongGuessButtons[btn] = true;
      this.failsInRowCounter++;
      this.storedTotalFails++;
      this.scoreWrong++;
      this.vibration.vibrate(200);
      this.animWrong();
      if ((this.failsInRowCounter >= (this.numButtons-1)) && (this.numButtons<=8)) {
        this.hint = true;
      }
    }
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


  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.randomDone = true;
    return array;
  }

  initDone() {
    if (this.buttonsDone == true ) {
      if (this.randomOrder == false) {
        return true;
      } else if (this.randomDone == true) {
        return true;
      }
    }
  }


  startTest() {
    this.navCtrl.pop();
  }

  switchScore() {
    this.scoreToggle=!this.scoreToggle;
  }

  getScoreWrong() {
    if (this.scoreToggle) {
      return this.scoreWrong;
    } else {
      return Math.round((this.scoreWrong/(this.scoreRight+this.scoreWrong))*100) + '%';
    }
  }

  getScoreRight() {
    if (this.scoreToggle) {
      return this.scoreRight
    } else {
      return Math.round((this.scoreRight/(this.scoreRight+this.scoreWrong))*100) + '%';
    }
  }

  getEndString() {
    this.endScreen = true;
    let slidesLength = (this.slideRange.upper-this.slideRange.lower)+1;
    if (slidesLength <= 10) {
      let index = Math.floor(this.scoreRight/(this.scoreRight+this.scoreWrong)*3);
      return this.endStrings[index];
    } else if (slidesLength <= 45) {
      let index = Math.floor(this.scoreRight/(this.scoreRight+this.scoreWrong)*5);
      return this.endStrings[index];
    }
    let index = Math.floor(this.scoreRight/(this.scoreRight+this.scoreWrong)*6);
    return this.endStrings[index];
  }

  slideClick() {
    if (!this.answerVisible && this.buttonBox) {
      this.answerVisible = true;
      this.buttonBox = false;
    } else if (!this.answerVisible) {
      this.buttonBox = true;
    }
  }


}

