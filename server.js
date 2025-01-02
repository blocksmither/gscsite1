/* ==================================
   server.js
   ================================== */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// OPTIONAL: If you plan to integrate Stripe for subscriptions/payment
// Replace with your actual secret key if you want real billing
const Stripe = require("stripe");
const stripe = Stripe("YOUR_STRIPE_SECRET_KEY_HERE");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Placeholder route for e-sign contract
app.post("/sign-contract", (req, res) => {
  try {
    // In real usage, integrate DocuSign/HelloSign
    const { customerName, companyName, email, spaceRequested } = req.body;
    return res
      .status(200)
      .json({ message: "Contract signed (placeholder). Proceed to subscription." });
  } catch (error) {
    console.error("Sign-contract error:", error);
    return res.status(500).json({ error: "Error signing contract." });
  }
});

// Placeholder route for Stripe subscription
app.post("/create-subscription", async (req, res) => {
  try {
    const { paymentMethodId } = req.body;

    // Create a customer
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email: "customer@example.com", // replace with user data
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // Create subscription with your actual Price ID
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: "price_XXXXXXXXXXXX" }], // e.g., $100/month plan
      expand: ["latest_invoice.payment_intent"],
    });

    return res.status(200).json({
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (error) {
    console.error("Create-subscription error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`GSC 360 website running on port ${PORT}`);
});

