
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Swagger Api
http://localhost:3000/api#/
![User Rest Api](./src/images/swagger.png)


##Octa Authentication using OIDC - OpenID Connect --> Single-Page Application 

1. Create octa account if you does not have 
2. Login 
3. Create Octa app : Applications--> Applications --> Create app Intergration

![Octa app ](./src/images/Create_app.png)

![Octa app ](./src/images/create_app2.png)

 Add postmand and thunder Clinet Redirect URLs. 

![Octa app ](./src/images/octaApp.png)

![Octa app ](./src/images/OctaApp1.png)

4. Go to Security --> API and see the default Autherization
![Octa app ](./src/images/AppAuth.png)

![Octa app ](./src/images/default.png)

5. Go to directory --> People 
![Octa app ](./src/images/people.png)

![Octa app ](./src/images/assigned.png)


6. Postman setting

![Octa app ](./src/images/Postman.png)

7. Thunder clinet

![Octa app ](./src/images/Thunder_Clinet.png)


##Octa Authentication using API Services 
Interact with Okta APIs using the scoped OAuth 2.0 access tokens for machine-to-machine authentication.

![API service ](./src/images/APIServices.png)

## Create jwt token using following crul command 

```bash

curl --location --request POST 'https://dev-79012153.okta.com/oauth2/default/v1/token?grant_type=client_credentials&scope=nestapi' \
--header 'Accept: application/json' \
--header 'authorization: Basic MG9hOWZucmc4NUtqblkxd1o1ZDc6Z1cxTUFlaEJxdTlGRzZJNlRMU2wwSTI2MlBQWG9MTDk0S1hSMl9WOQ==' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Cookie: DT=DI18qUHjM2oRFuXSIW0g9WFLw; JSESSIONID=BC8623DA5D474FB7165044D7342D6502; t=default'

```

