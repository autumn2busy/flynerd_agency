# FlyNerd Tech Website

Official marketing site for FlyNerd Tech, an AI automation agency for franchise operators. Built with Next.js 14, Tailwind CSS, and shadcn/ui.

## Features

- **Franchise Automation OS**: Modular product showcase (Growth, Ops, Reputation, Training).
- **Interactive Tools**: ROI Estimator, AI Concierge (Demo).
- **Techwear Aesthetic**: Use of dark mode, glassmorphism, and monospace accents.
- **Conversion Focused**: Clear CTAs, social proof, and trust signals to drive "Blueprint" bookings.

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Project Structure

- `src/app`: Next.js App Router pages.
- `src/components/layout`: Global components (Navbar, Footer, MobileNav).
- `src/components/marketing`: Landing page components (Hero).
- `src/components/tools`: Interactive widgets (ROI Estimator, AI Concierge).
- `src/components/ui`: Reusable shadcn/ui components.

## Deployment on Vercel

1.  Connect your GitHub repository to Vercel.
2.  The framework preset should automatically detect Next.js.
3.  Ensure the **Build Command** is `next build`.
4.  Ensure the **Output Directory** is `.next`.
5.  Deploy.

## Integration Notes

- **Forms**: Currently mocked. Connect to ActiveCampaign via API Route or external form embed in `src/app/contact/page.tsx`.
- **Analytics**: Add Google Tag Manager ID in `layout.tsx` or use `next/third-parties`.
