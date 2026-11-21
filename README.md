# College Aarambh — Frontend Website

A responsive React + Vite admission consultancy website with a light navy/blue visual identity.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Configure WhatsApp enquiries

The admission enquiry forms use WhatsApp Click-to-Chat. No WhatsApp API subscription or EmailJS account is required. When a student submits a form, the website downloads a PDF enquiry summary and opens WhatsApp with the student's details pre-filled. The student must tap **Send** in WhatsApp to deliver the message.

Before testing or publishing, The College Aarambh WhatsApp number is already configured in `src/config.js`. For an Indian number, use `91` followed by the 10-digit mobile number, without `+`, spaces or dashes. Example: `919876543210`.

## Build for deployment

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Important content notes

- College entries are based on the list supplied for this project. Confirm official names, campus locations, programmes, entrance requirements, fees and current admissions before publishing.
- No college is labelled an official partner.
- Scholarship content is guidance-oriented; do not promise awards or fee waivers.
- This is a frontend-only website. It does not persist enquiries in a database or provide a secure admin dashboard. WhatsApp opens with a pre-filled message; the student must send it manually.

## Founder profile

The About page includes the founder profile for Tanuj Kumar Mishra. The supplied portrait is stored at `public/images/founder-tanuj-kumar-mishra.jpg`.

College and course page visuals use illustrative Unsplash stock photography. They are not claimed to be photographs of the named colleges. Replace with licensed/authorised campus images for exact institution representation.

## Recent College Aarambh updates
- Added a seven-institution featured colleges section on the homepage.
- Added a complete college directory page at `/featured-colleges`; each college opens its existing detailed profile.
- Homepage location cards now open the directory filtered to the selected city. Only colleges assigned to that city are shown.
- Updated official contact details to +91 70070 86568 and collegeaarambh@gmail.com.
- Updated WhatsApp enquiry destination to +91 70070 86568.
- Updated influencer display name to Anshika Diwedi.
- Added Instagram and LinkedIn social links. Facebook icon is reserved in the footer; add its URL later by setting `FACEBOOK_URL` in `src/components.jsx`.

## Recent UI and directory updates
- Added an animated admission-guidance strip immediately below the homepage hero.
- College cards now show larger, clearly labelled **View in detail** and **Enquire** buttons.
- Region/location selection opens the complete current directory list for the selected city. Empty regions (currently Bangalore, Uttarakhand, Delhi and Lucknow if no records are listed) show a clear message and enquiry option rather than a blank area. No institutions have been invented for locations without registered entries.
- College profile pages use each college record's configured illustrative reference image and display an explicit image disclaimer.
- Course detail pages use the course image map; the B.Com (Hons.) listing now correctly resolves its detail and image aliases.
