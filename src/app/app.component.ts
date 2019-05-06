import { Component } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
declare var PubNub: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PubNubAngular]
})
export class AppComponent {
  title = 'reviews-platform';
  constructor(
    private pubnub: PubNubAngular
  ) {

    this.pubnub.init({
      publishKey: 'pub-c-b5afefa9-aa4c-402a-bea1-f17c5f5de0ca',
      subscribeKey: 'sub-c-a028a708-6cc1-11e9-bedf-bef46dd4efdc'
    })

    this.pubnub.subscribe({
      channels: ["my_channel"],
      triggerEvents: ["presence", "listener", "message"],
      withPresence: true
    })
    this.pubnub.getMessage('my_channel', (msg) => {
      console.log(msg.message)
    });
   
  }



}
