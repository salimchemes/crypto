import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';
import { LoadingProvider } from '../../providers/loading/loading';
import { Chart } from 'chart.js';
import { HelperProvider } from '../../providers/helper/helper';
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
    private loading: LoadingProvider,
    private helper: HelperProvider) {
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
      this.helper.renderChart(this.lineCanvas30days.nativeElement, this.holding['crypto'].toUpperCase() + " :Price Last 30 days", days, prices);
      this.helper.renderChart(this.lineCanvas7days.nativeElement, this.holding['crypto'].toUpperCase() + " :Price Last 7 days", last7days, last7prices);

      this.holdingProvider.fetchLast12Hs(this.holding).subscribe((result) => {
        let hours = [];
        let priceHours = [];
        result.Data.forEach(price => {
          hours.push(moment.unix(price['time']).format("LT"));
          priceHours.push(price['close'])
        });
        this.helper.renderChart(this.lineCanvas12Hours.nativeElement, this.holding['crypto'].toUpperCase() + " :Price Last 12 hours", hours, priceHours);
      });

      this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
  }

}
