# forage
Forage is a web application that allows customers to locate food trucks near their area. It has one sign up page, that lets owners/users switch back and forth without having to make separate accounts. Users can send private messages, order online, receive updates on specials through text messages, and review different food trucks. Owners can turn on their location, adjust the menu, post hours of operation, and receive private messages. Forage makes it easier for food trucks to promote their business by customers seeing their location and being able to communicate with them through the website.

## Technology
* Semantic UI
* Angular.js
* MongoDB
* Mongoose.js
* Express.js
* Passport.js
* Node.js
* Google Maps API
* Google Geolocation API
* Twilio API

## Installation
Clone this repo to your desktop and run `npm install` to install all the dependencies.

`/src/server/config` make sure you add `auth.js` and `config.js`

In your `auth.js` fill in the credentials. 
```
module.exports = {
    'facebookAuth' : {
        clientID: 'FACEBOOK_APP_ID',
        clientSecret: 'FACEBOOK_APP_SECRET',
        callbackURL: "http://127.0.0.1:8080/auth/facebook/callback"
    }
};
```

***FACEBOOK***

You could get `clientID` and `clientSecret` from facebook developer `https://developers.facebook.com/`

Here is the Facebook tutorial to get it. `https://www.youtube.com/watch?v=JGY9mQkRxK0`


In your `config.js` file should look similar to this. Your secret key can be anything you want. The port number should be the same as callback url.
```
module.exports = {
    session: {
        secret: 'whateversecretkeyowant'
    },
    port: 8080,
    twilio: {
        ACCOUNT_SID: 'TWILIO_ACCOUNT_SID',
        AUTH_TOKEN: 'TWILIO_AUTH_TOKEN'
    }
};
```

***TWILIO***

You could get `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` from Twilio `https://www.twilio.com/`

Here is the Twilio tutorial to get it. `https://www.youtube.com/watch?v=REyT7DUMMu8`

## Usage
Once the dependencies are installed, you can run `mongod` and then `nodemon` to start the application. 

You will then be able to access it at `127.0.0.1:9999`

## Known Issues
* Google Map is not shown on hosted server.

## Contact
* email: dhl1337@gmail.com
* linkedin: linkedin.com/in/danhoangle
* portfolio: danhoangle.com
