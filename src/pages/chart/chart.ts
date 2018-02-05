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
  @ViewChild('lineCanvas30days') lineCanvas30days;
  @ViewChild('lineCanvas7days') lineCanvas7days;
  @ViewChild('lineCanvas12Hours') lineCanvas12Hours;
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
      let last7days = [];
      let last7prices = [];
      result.Data.forEach(price => {
        days.push(moment.unix(price['time']).format("L"));
        prices.push(price['close'])
      });
      last7days = days.slice(24);
      last7prices = prices.slice(24);
      new Chart(this.lineCanvas30days.nativeElement, {
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
      new Chart(this.lineCanvas7days.nativeElement, {
        type: 'line',
        data: {
          labels: last7days,
          datasets: [
            {
              label: this.holding['crypto'].toUpperCase() + " :Price Last 7 days",
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
              data: last7prices,
              spanGaps: false,
            }
          ]
        },
        options: {

        }
      });

      this.holdingProvider.fetchLast12Hs(this.holding).subscribe((result) => {
        let hours = [];
        let priceHours = [];
        result.Data.forEach(price => {
          hours.push(moment.unix(price['time']).format("LT"));
          priceHours.push(price['close'])
        });
        new Chart(this.lineCanvas12Hours.nativeElement, {
          type: 'line',
          data: {
            labels: hours,
            datasets: [
              {
                label: this.holding['crypto'].toUpperCase() + " :Price Last 12 Hours",
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
                data: priceHours,
                spanGaps: false,
              }
            ]
          },
          options: {
  
          }
        });

      })

      this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
  }

}
