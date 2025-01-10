/* ==================================
   public/js/main.js
   (Only the modified portion)
   ================================== */

// Contact form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok) {
        document.getElementById("contactStatus").innerHTML = `
          <p style="color: green;">${result.message}</p>
        `;
        contactForm.reset();
      } else {
        document.getElementById("contactStatus").innerHTML = `
          <p style="color: red;">Error: ${result.error}</p>
        `;
      }
    } catch (error) {
      console.error("Contact form error:", error);
      document.getElementById("contactStatus").innerHTML = `
        <p style="color: red;">An unexpected error occurred.</p>
      `;
    }
  });
}

const reserveForm = document.getElementById("contractForm");
if (reserveForm) {
  reserveForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const company = document.getElementById("companyName").value.trim();
    const email = document.getElementById("email").value.trim();
    const space = document.getElementById("spaceRequested").value.trim();

    const message = `Reservation request:\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nSpace requested: ${space} sq ft`;

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, space, message }),
      });

      const result = await response.json();

      if (response.ok) {
        document.getElementById("statusMessage").innerHTML = `
          <p style="color: green;">${result.message}</p>
        `;
        reserveForm.reset();
      } else {
        document.getElementById("statusMessage").innerHTML = `
          <p style="color: red;">Error: ${result.error}</p>
        `;
      }
    } catch (error) {
      console.error("Error submitting reservation form:", error);
      document.getElementById("statusMessage").innerHTML = `
        <p style="color: red;">An unexpected error occurred. Try again later.</p>
      `;
    }
  });
}

