import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  storedTotalClicks: number;
  storedTotalPoints: number;
  storedTotalFails: number;
  storedTotalGames: number;

  skillStrings: any = ["Beginer", "Noob", "Casual", "Advanced", "Pro", "Weeb God"];

  constructor(public navCtrl: NavController, private storage: Storage) {

  }

  ionViewWillEnter() {
    this.storage.get('storedTotalPoints').then((storedTotalPointsVal) => {
      console.log('storedTotalPoints = ', storedTotalPointsVal);
      this.storedTotalPoints = storedTotalPointsVal;
      if(this.storedTotalPoints == null) {
        this.storedTotalPoints = 0;
      }
    });

    this.storage.get('storedTotalGames').then((storedTotalGamesVal) => {
      console.log('storedTotalGames = ', storedTotalGamesVal);
      this.storedTotalGames = storedTotalGamesVal;
      if (this.storedTotalGames == null) {
        this.storedTotalGames = 0;
      }
    });

    this.storage.get('storedTotalClicks').then((storedTotalClicksVal) => {
      console.log('storedTotalClicks = ', storedTotalClicksVal);
      this.storedTotalClicks = storedTotalClicksVal;
      if (this.storedTotalClicks == null) {
        this.storedTotalClicks = 0;
      }
    });

    this.storage.get('storedTotalFails').then((storedTotalFailsVal) => {
      console.log('storedTotalFails = ', storedTotalFailsVal);
      this.storedTotalFails = storedTotalFailsVal;
      if (this.storedTotalFails == null) {
        this.storedTotalFails = 0;
      }
    });
  }

  getSuccessRate() {
    if(this.storedTotalPoints > 0)
    return Math.round((this.storedTotalPoints/this.storedTotalClicks)*100);
  }

  getFailureRate() {
    if(this.storedTotalFails > 0)
    return Math.round((this.storedTotalFails/this.storedTotalClicks)*100);
  }

  getSkillString () {
    if (this.storedTotalClicks <= 5) {
      return this.skillStrings[0];
    } else if(this.storedTotalClicks <= 30) {
      return this.skillStrings[Math.floor(this.getSuccessRate()/25)];
    }
    return this.skillStrings[Math.floor(this.getSuccessRate()/16)];
  }


}
