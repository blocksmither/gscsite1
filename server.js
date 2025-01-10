/* ==================================
   server.js
   ================================== */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

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


// 1) Create transporter for localhost Postfix
const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 25,
  secure: false, // no TLS if using port 25
    tls: {
        rejectUnauthorized: false,
    },
  // If your Postfix doesn't require auth for local connections, omit user/pass
  // If it does, specify:
  // auth: {
  //   user: "yourLocalUsername",
  //   pass: "yourLocalPassword"
  // }
});

// 2) A route to handle contact form submissions
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, message, company, space } = req.body;

    // Construct a dynamic email body
    let emailBody = `Name: ${name}\nEmail: ${email}\n`;

    if (company) emailBody += `Company: ${company}\n`;
    if (space) emailBody += `Space Requested: ${space} sq ft\n`;
    if (message) emailBody += `Message: ${message}`;

    const mailOptions = {
      from: `"GSC 360 Logistics" <noreply@gscwarehousing.com>`,
      to: "carson.smith@gscwarehousing.com",
      subject: "New Form Submission",
      text: emailBody,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error in /send-email:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).send("Page Not Found");
})
;

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`GSC 360 website running on port ${PORT}`);
});

