/* ==================================
   public/js/main.js
   ================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Reserve form submission
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
        alert("You must agree to the Warehouse Services Agreement.");
        return;
      }

      // 1. Sign Contract (placeholder)
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
          document.getElementById("statusMessage").innerHTML = `
            <p style="color: green;">${result.message}</p>
            <p>Setting up subscription...</p>
          `;

          // 2. Subscription (placeholder)
          // In a real scenario, you'd use Stripe.js or Payment Elements
          const mockPaymentMethodId = "pm_mock_123";
          const subsResponse = await fetch("/create-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentMethodId: mockPaymentMethodId }),
          });
          const subsResult = await subsResponse.json();

          if (subsResponse.ok) {
            document.getElementById("statusMessage").innerHTML += `
              <p style="color: green;">Subscription created! Status: ${subsResult.status}</p>
            `;
          } else {
            document.getElementById("statusMessage").innerHTML += `
              <p style="color: red;">Subscription error: ${subsResult.error}</p>
            `;
          }
        } else {
          document.getElementById("statusMessage").innerHTML = `
            <p style="color: red;">Error: ${result.error}</p>
          `;
        }
      } catch (error) {
        console.error("Error in sign-contract or create-subscription:", error);
        document.getElementById("statusMessage").innerHTML = `
          <p style="color: red;">An unexpected error occurred. Try again later.</p>
        `;
      }
    });
  }

  // Contact form submission (mock)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName").value;
      const email = document.getElementById("contactEmail").value;
      const message = document.getElementById("contactMessage").value;

      // Here you'd typically send the data to an email service or database
      document.getElementById("contactStatus").innerHTML = `
        <p style="color: green;">Thanks, ${name}! We'll be in touch soon.</p>
      `;
      contactForm.reset();
    });
  }
});
/* ==================================
   public/js/main.js
   ================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Reserve form submission
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
        alert("You must agree to the Warehouse Services Agreement.");
        return;
      }

      // 1. Sign Contract (placeholder)
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
          document.getElementById("statusMessage").innerHTML = `
            <p style="color: green;">${result.message}</p>
            <p>Setting up subscription...</p>
          `;

          // 2. Subscription (placeholder)
          // In a real scenario, you'd use Stripe.js or Payment Elements
          const mockPaymentMethodId = "pm_mock_123";
          const subsResponse = await fetch("/create-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentMethodId: mockPaymentMethodId }),
          });
          const subsResult = await subsResponse.json();

          if (subsResponse.ok) {
            document.getElementById("statusMessage").innerHTML += `
              <p style="color: green;">Subscription created! Status: ${subsResult.status}</p>
            `;
          } else {
            document.getElementById("statusMessage").innerHTML += `
              <p style="color: red;">Subscription error: ${subsResult.error}</p>
            `;
          }
        } else {
          document.getElementById("statusMessage").innerHTML = `
            <p style="color: red;">Error: ${result.error}</p>
          `;
        }
      } catch (error) {
        console.error("Error in sign-contract or create-subscription:", error);
        document.getElementById("statusMessage").innerHTML = `
          <p style="color: red;">An unexpected error occurred. Try again later.</p>
        `;
      }
    });
  }

  // Contact form submission (mock)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contactName").value;
      const email = document.getElementById("contactEmail").value;
      const message = document.getElementById("contactMessage").value;

      // Here you'd typically send the data to an email service or database
      document.getElementById("contactStatus").innerHTML = `
        <p style="color: green;">Thanks, ${name}! We'll be in touch soon.</p>
      `;
      contactForm.reset();
    });
  }
});

