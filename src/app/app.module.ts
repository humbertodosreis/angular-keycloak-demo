import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

let keycloakService: KeycloakService = new KeycloakService();

@NgModule({
  declarations: [AppComponent, PatientsListComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
  ],
  // bootstrap: [AppComponent]
  entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {
  async ngDoBootstrap(app) {
    const { keycloakConfig } = environment;

    try {
      await keycloakService.init({ config: keycloakConfig });
      app.bootstrap(AppComponent);
    } catch (error) {
      console.error('Keycloak init failed', error);
    }
  }
}
