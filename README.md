# openwhisk-elasticemail
openwhisk-elasticemail is a node.js application using [request-promise](https://github.com/request/request-promise) to send emails via [Elastic Email's HTTP API](http://api.elasticemail.com/public/help). 

---

## Installation

Clone this repository and install the required dependencies using [Yarn](https://yarnpkg.com):

```
git clone https://github.com/hanxue/openwhisk-elasticemail.git
cd openwhisk-elasticemail
yarn install
```

---

## Using openwhisk-elasticemail

Create an [IBM Bluemix account](https://console.bluemix.net) and [follow the instructions to install the Bluemix CLI](https://console.bluemix.net/openwhisk/learn/cli). 

Then using the Bluemix CLI to create an OpenWhisk action

```
bx login
zip -r action.zip ./ -x *.git/*
bx wsk action update elastic-emailer --kind nodejs:8 action.zip
```

Once the `action` is created, you can invoke the action

```
bx wsk action invoke elastic-emailer \
--param fromName 'Your Name' \
--param from'first.last@yourdomain.com' \
--param msgTo 'someone.else@company.com' \
--param subject 'Email sent by openwhisk-elasticemail' \
--param bodyText 'Hello, this email is sent via OpenWhisk and ElasticEmail' \
--param apikey 'xxxxxx-0000-0000-x0x0-xxxxxxxxxx' \
-b -r
```

You should receive a JSON response

```js
{
  "message":{
    "success":true,
    "data":{
      "transactionid":"aaaa0000-0000-0000-0000-aaaaaa00000",
      "messageid":"xxxxxxxxx000000000"
    }
  }
}
```

