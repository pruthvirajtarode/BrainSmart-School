# BrainSmart School

Premium, responsive React/Vite school website foundation with editable structured content.

## Run locally

```bash
npm install
npm run dev
```

Build for production with `npm run build`, then preview with `npm run preview`.

## Content

School details, navigation, news, events and content pillars live in `src/data.ts`. Replace placeholder copy and contact details with approved information before launch. The image URLs are editorial placeholders and should be replaced with licensed school photography.

## Contact form

The form is intentionally demo-only and never claims to deliver a message. Set `VITE_CONTACT_ENDPOINT` in a future integration, then update the submit handler in `src/App.tsx` to POST to a trusted serverless endpoint. Do not put email provider credentials in client-side environment variables.

## Deployment

The app is ready for Vercel or another static host. Use `npm run build` as the build command and `dist` as the output directory. Configure SPA rewrites on the host so deep links return `index.html`. Connect a custom domain and enable HTTPS through the hosting provider.
