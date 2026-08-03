/* ==========================================================================
   Contact form submission.

   Right now this only logs the payload and pretends to succeed, so the form
   is fully testable without a backend. Replace the body of submitContactForm()
   with one of the options below when you are ready.
   ========================================================================== */

const FAKE_NETWORK_DELAY = 700;

/**
 * @param {{ name: string, email: string, message: string }} payload
 * @returns {Promise<{ ok: true }>} resolves on success, throws on failure
 */
export async function submitContactForm(payload) {
  // ---------------------------------------------------------------------
  // TODO: replace everything below with your real submission.
  //
  // OPTION A — your own backend endpoint:
  //
  //   const response = await fetch("https://api.inviteme.ge/contact", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   });
  //   if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  //   return { ok: true };
  //
  // OPTION B — a hosted form service (Formspree, Web3Forms, Getform, …):
  //
  //   const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  //     method: "POST",
  //     headers: { Accept: "application/json" },
  //     body: new FormData(formElement),
  //   });
  //
  // OPTION C — EmailJS, if you would rather not run a server at all.
  //
  // Whichever you choose: never put a private API key in this file. Anything
  // in the frontend bundle is public. Use a public form endpoint, or proxy
  // through your own backend.
  // ---------------------------------------------------------------------

  if (import.meta.env.DEV) {
    console.info("[contact form] would submit:", payload);
  }

  await new Promise((resolve) => setTimeout(resolve, FAKE_NETWORK_DELAY));
  return { ok: true };
}

export default submitContactForm;
