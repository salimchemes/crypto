import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';
import { HelperProvider } from '../../providers/helper/helper'; 

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
        public navParams: NavParams) {
        let holdingParam = this.navParams.get("holding");
        debugger
        if (holdingParam != null) {
            this.id = holdingParam.id;
            this.cryptoCode = holdingParam.crypto;
            this.displayCurrency = holdingParam.currency;
            this.amountHolding = holdingParam.amount;
            this.actionText = 'Update Holding';
            this.isUpdate = true;
        }

    }

    addHolding(): void {

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
                this.navCtrl.pop();
            } else {
                this.cryptoUnavailable = true;
            }

        }, (err) => {

            this.checkingValidity = false;

        });
    }

}
