import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private oneSignal: OneSignal) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'About Us', component: 'AboutUsPage' },
      { title: 'Services', component: 'ServicesPage' },
      { title: 'Contact Us', component: 'ContactUsPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.oneSignalInit();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  oneSignalInit(){
    const app_id = '2b9a43f4-8003-4ff4-802b-1ca4b3deef50'
    const sender_id = '441041743550'
    this.oneSignal.startInit(app_id, sender_id);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
    this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
    this.oneSignal.endInit();
  }

  private onPushReceived(payload: OSNotificationPayload) {
    console.log('received', payload);    
    //alert('Push recevied:' + payload.body);
  }
  
  private onPushOpened(payload: OSNotificationPayload) {
    console.log('opened', payload);
    //alert('Push opened: ' + payload.body);
  }


}
