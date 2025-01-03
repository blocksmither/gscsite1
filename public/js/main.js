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
      // 1) Post to /send-email route
      const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json();

      // 2) Check if success
      if (response.ok) {
        document.getElementById("contactStatus").innerHTML = `
          <p style="color: green;">${result.message}</p>
        `;
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

