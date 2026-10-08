// /bags page ke "Restoration Journey" section ka content.
// Sirf 3 steps. Abhi images wahi hain jo home page par hain.
// Baad mein bags ki alag images chahiye to sirf DIR badal dena
// (jaise "/images/steps-bags") aur wahan step-1.png, step-2.png, step-3.png rakh dena.

const DIR = "/images/bagProcessRestoration";

export const BAG_PROCESS_STEPS = [
  {
    number: "01",
    title: "Findings",
    description:
      "Every restoration requirement is identified, documented, and included in a detailed job sheet, which is shared for your approval before work begins.",
    image: `${DIR}/Restoration 3.png`,
  },
  {
    number: "02",
    title: "In-Depth Cleaning",
    description:
      "pH-balanced solutions gently lift away dirt and grime, leaving a clean, breathable foundation.",
    image: `${DIR}/Restoration 1.png`,
  },
  {
    number: "03",
    title: "Rejuvenate & Restore",
    description:
      "Expert artisans revive colour depth and meticulously repair scuffs, scratches, and shape damage with the precision of an atelier.",
    image: `${DIR}/Restoration 2.png`,
  },
];