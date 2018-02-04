import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';
import { LoadingProvider } from '../../providers/loading/loading';
import { Chart } from 'chart.js';
import moment from 'moment';
/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {
  @ViewChild('lineCanvas') lineCanvas;
  private holding: {}; 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private holdingProvider: HoldingsProvider,
    private loading: LoadingProvider) {
    this.loading.show("Loading...");
    if (this.navParams.get('holding'))
      this.holding = this.navParams.get('holding');

    this.holdingProvider.fetchLast30Days(this.holding).subscribe((result) => {
      console.log(result.Data);
      let days = [];
      let prices = [];
      result.Data.forEach(price => {
        days.push(moment.unix(price['time']).format("L"));
        prices.push(price['close'])

      });
      new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: days,
          datasets: [
            {
              label: this.holding['crypto'].toUpperCase() + " :Price Last 30 days",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: prices,
              spanGaps: false,
            }
          ]
        },
        options: {

        }
      }); 
      this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
  }

}
