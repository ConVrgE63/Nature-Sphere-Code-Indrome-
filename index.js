const express = require("express");
const axios = require("axios");
const port = 3002;
const app = express();
const uniqid = require("uniqid");
const sha256 = require("sha256");

// UAT TESTING
const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const MERCHANT_ID = "PGTESTPAYUAT";
const SALT_INDEX = 1;
const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
app.get("/", (req, res) => {
  res.send("phone pe is working");
});

app.get("/pay", (req, res) => {
  const payEndpoint = "/pg/v1/pay";
  const merchantTransactionId = uniqid();
  const userId = 123;

  const payload = {
    merchantId: MERCHANT_ID,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: userId,
    amount: 83000, //in paise
    redirectUrl: `http://localhost:3000/redirect-url/${merchantTransactionId}`,
    redirectMode: "REDIRECT",
    mobileNumber: "334264747",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
  const base63EncodedPayload = bufferObj.toString("base64");
  const xVerify =
    sha256(base63EncodedPayload + payEndpoint + SALT_KEY) + "###" + SALT_INDEX;
  const options = {
    method: "post",
    url: `${PHONE_PE_HOST_URL}${payEndpoint}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": xVerify,
    },
    data: {
      request: base63EncodedPayload,
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const url = response.data.data.instrumentResponse.redirectInfo.url;
     // res.redirect(url); //this direct go to payment page
      res.send((url)) //-> this only generate the link
    })
    .catch(function (error) {
      console.error(error);
    });
});


app.listen(port, () => {
  console.log(`App started listening on port ${port}`);
});
