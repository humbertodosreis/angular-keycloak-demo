# Angular Keycloak Demo App

## About

Tutorial demonstrating how to configure an application with authentication and authorization through Keycloak.

This demo we utilize a keycloak-angular lib, more details [here](https://github.com/mauriciovigolo/keycloak-angular).

## Quickstart

1. Step #1: Clone the [angular-keycloak-demo](https://github.com/humbertodosreis/angular-keycloak-demo) repository.

```
git clone https://github.com/humbertodosreis/angular-keycloak-demo
```

2. Step #2: Run project.

```
ng serve --open
```

3. Step #3: Create and configure a client in Keycloak like image as below

![keycloak-account-scope](./docs/images/keycloak-client-config.png)

4. Step #4: Then configure the environment.ts files to your Keycloak Instance
   > ./src/environments/environment.ts

```typescript
import { KeycloakConfig } from "keycloak-angular";

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: "KEYCLOAK-INSTANCE-URL", // http://localhost:8080/auth
  realm: "REALM-NAME", // your realm: keycloak-sandbox
  clientId: "CLIENT-ID-NAME", // angular-keycloak-tutorial
};

export const environment = {
  production: false,
  // ...
  keycloakConfig,
};
```

#### Using ngDoBootstrap

The KeycloakService can be initialized before the application loading. When the Keycloak initialization is successful the application is bootstrapped.

This has two major benefits.

1. This is faster because the application isn't fully bootstrapped and
1. It prevents a moment when you see the application without having the authorization.

#### AppModule

> ./src/app.module.ts

```typescript
import { NgModule, DoBootstrap, ApplicationRef } from "@angular/core";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";

const keycloakService = new KeycloakService();

@NgModule({
  imports: [KeycloakAngularModule],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
  ],
  entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {
  async ngDoBootstrap(app) {
    const { keycloakConfig } = environment;

    try {
      await keycloakService.init({ config: keycloakConfig });
      app.bootstrap(AppComponent);
    } catch (error) {
      console.error("Keycloak init failed", error);
    }
  }
}
```

> ./app/app-auth.guard.ts

```typescript
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { KeycloakService, KeycloakAuthGuard } from "keycloak-angular";

@Injectable()
export class AppAuthGuard extends KeycloakAuthGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected keycloakAngular: KeycloakService
  ) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login();
        return;
      }
      console.log(
        "role restriction given at app-routing.module for this route",
        route.data.roles
      );
      console.log("User roles coming after login from keycloak :", this.roles);

      const requiredRoles = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        let granted: boolean = false;
        for (const requiredRole of requiredRoles) {
          if (this.roles.indexOf(requiredRole) > -1) {
            granted = true;
            break;
          }
        }
        resolve(granted);
      }
    });
  }
}
```
