import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';
import { HelperProvider } from '../../providers/helper/helper';
import { LoadingProvider } from '../../providers/loading/loading';

@IonicPage({
    defaultHistory: ['HomePage']
})
@Component({
    selector: 'page-add-holding',
    templateUrl: 'add-holding.html'
})
export class AddHoldingPage {

    private cryptoUnavailable: boolean = false;
    private checkingValidity: boolean = false;
    private cryptoCode: string;
    private id: string;
    private displayCurrency: string;
    private amountHolding;
    private actionText: string = 'Add Holding';
    private isUpdate: boolean = false;

    constructor(private navCtrl: NavController,
        private holdingsProvider: HoldingsProvider,
        private helper: HelperProvider,
        public navParams: NavParams,
        private loading: LoadingProvider) {
        this.loading.show('Loading...');
        let holdingParam = this.navParams.get("holding");
        if (holdingParam != null) {
            this.id = holdingParam.id;
            this.cryptoCode = holdingParam.crypto;
            this.displayCurrency = holdingParam.currency;
            this.amountHolding = holdingParam.amount;
            this.actionText = 'Update Holding';
            this.isUpdate = true;
        }
        this.loading.dismiss();
    }

    addHolding(): void {
        this.loading.show('Loading...');
        this.cryptoUnavailable = false;
        this.checkingValidity = true;

        let holding = {
            isUpdate: this.isUpdate,
            id: this.id ? this.id : this.helper.newGuid(),
            crypto: this.cryptoCode,
            currency: this.displayCurrency,
            amount: this.amountHolding || 0
        };

        this.holdingsProvider.verifyHolding(holding).subscribe((result) => {

            this.checkingValidity = false;

            if (result.success) {
                this.holdingsProvider.addHolding(holding);
                this.loading.dismiss();
                this.navCtrl.pop();
            } else {
                this.cryptoUnavailable = true;
                this.loading.dismiss();
            }

        }, (err) => {
            this.loading.dismiss();
            this.checkingValidity = false;
        });
    }

}
