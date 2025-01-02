/* =============================
   public/js/main.js
   ============================= */
document.addEventListener("DOMContentLoaded", () => {
  // Reservation form submission
  const contractForm = document.getElementById("contractForm");
  if (contractForm) {
    contractForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const customerName = document.getElementById("customerName").value;
      const companyName = document.getElementById("companyName").value;
      const email = document.getElementById("email").value;
      const spaceRequested = document.getElementById("spaceRequested").value;
      const agreeTerms = document.getElementById("agreeTerms").checked;

      if (!agreeTerms) {
        alert("You must agree to the Warehousing Services Agreement.");
        return;
      }

      // 1. Send data to sign-contract route (placeholder e-sign)
      try {
        const response = await fetch("/sign-contract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName,
            companyName,
            email,
            spaceRequested,
          }),
        });
        const result = await response.json();

        if (response.ok) {
          // Show success message
          document.getElementById("statusMessage").innerHTML =
            `<p style="color: green;">${result.message}</p>` +
            "<p>Now creating subscription...</p>";

          // 2. Create subscription (Placeholder; normally you'd collect actual payment info with Stripe.js)
          const mockPaymentMethodId = "pm_mock123"; // Replace with real PaymentMethod ID
          const subsRes = await fetch("/create-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentMethodId: mockPaymentMethodId }),
          });
          const subsData = await subsRes.json();

          if (subsRes.ok) {
            document.getElementById("statusMessage").innerHTML += `
              <p style="color: green;">
                Subscription created successfully! Status: ${subsData.status}
              </p>
            `;
          } else {
            document.getElementById("statusMessage").innerHTML += `
              <p style="color: red;">Subscription Error: ${subsData.error}</p>
            `;
          }
        } else {
          document.getElementById("statusMessage").innerHTML = `
            <p style="color: red;">Error: ${result.error}</p>
          `;
        }
      } catch (error) {
        console.error("Contract/Subscription Error:", error);
        document.getElementById("statusMessage").innerHTML = `
          <p style="color: red;">An unexpected error occurred. Please try again later.</p>
        `;
      }
    });
  }

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName").value;
      const email = document.getElementById("contactEmail").value;
      const message = document.getElementById("contactMessage").value;

      // Here you would send the data to a real endpoint or email service
      document.getElementById("contactStatus").innerHTML = `
        <p style="color: green;">Thank you, ${name}! Your message has been sent. We'll be in touch soon.</p>
      `;
      contactForm.reset();
    });
  }
});

