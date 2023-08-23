const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// This code below is used when coverting local payment to usd dollor depending on exchange rate
// router.post(
//   "/process",
//   catchAsyncErrors(async (req, res, next) => {
//     const nairaAmount = req.body.amount; // Amount in Naira
//     const dollarAmount = Math.ceil(nairaAmount / 500); // Converting NGN to USD

//     const myPayment = await stripe.paymentIntents.create({
//       amount: dollarAmount, // I used the converted dollar amount
//       currency: "usd", // Charge is in USD
//       metadata: {
//         company: "Emmanuelt",
//       },
//     });

//     res.status(200).json({
//       success: true,
//       client_secret: myPayment.client_secret,
//     });
//   })
// );

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "Emmanuelt",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

module.exports = router;
