/* =============================
   server.js
   ============================= */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Replace with your real Stripe secret key
const Stripe = require("stripe");
const stripe = Stripe("YOUR_STRIPE_SECRET_KEY");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// ===== ROUTES =====

// Home route (optional, because index.html is served statically)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// E-sign contract route (placeholder)
app.post("/sign-contract", async (req, res) => {
  try {
    const { customerName, companyName, email, spaceRequested } = req.body;
    // Here you would integrate with an actual e-sign service
    // to generate and track the contract signatures.
    // For now, just returning success.
    return res
      .status(200)
      .json({ message: "Contract signed placeholder. Proceed to subscription." });
  } catch (error) {
    console.error("Error in sign-contract route:", error);
    return res.status(500).json({ error: "Error signing contract." });
  }
});

// Stripe subscription route (placeholder)
app.post("/create-subscription", async (req, res) => {
  try {
    const { paymentMethodId } = req.body;

    // Create a customer (placeholder email here, but you'd use form data)
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email: "customer@example.com",
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // Create a subscription
    // Replace with your actual Stripe Price ID for $100/month
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: "price_XXXXXXXX" }],
      expand: ["latest_invoice.payment_intent"],
    });

    return res.status(200).json({
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (error) {
    console.error("Error in create-subscription route:", error);
    return res.status(500).json({ error: error.message });
  }
});

// 404 catch-all
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`GSC Logistics website running on port ${PORT}`);
});

