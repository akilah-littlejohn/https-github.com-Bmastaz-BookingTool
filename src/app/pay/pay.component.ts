import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  showSuccess = false
  ngOnInit(): void {
    this.initConfig();
  }
  Cid = "AUrEKijJ9kEeUwlErDTzYdZw_bIEVx9fjDR6-Po2xAIfWsWwuDBzXVR1s6f-koLo_WMLDWfE__iphTBA"
  chargeAmount ="10.00"
  currency ="USD"


  private initConfig(): void {
    this.payPalConfig = {
      currency: this.currency,
      clientId: this.Cid, // TODO make parameter 
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: this.currency,
              value: this.chargeAmount,
              breakdown: {
                item_total: {
                  currency_code: this.currency,
                  value: this.chargeAmount
                }
              }
            },
            items: [
              {
                name: 'Appointment ',// TODO Make paramater
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: this.currency,
                  value: this.chargeAmount,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'horizontal'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}





