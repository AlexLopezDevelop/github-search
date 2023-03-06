# Github Search

Github Search is a simple app that allows you to search for users and their repositories on Github.
## Features

- Search for users and their repositories
- View user details
- View repository details

## Demo

- https://github-search-rho-khaki.vercel.app/

[![Screenshot of demo](./public/demo.png)](https://github-search-rho-khaki.vercel.app/)

## Deploy with Vercel

The Vercel deployment will guide you through creating a Supabase account and project. After installing the Supabase integration, you'll need to configure Stripe with a few simple steps.

**Note:** We're working on our Stripe integration. We've documented the required steps below under "Configure Stripe" until the integration is ready.

To get started, click the "Deploy with Vercel" button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/AlexLopezDevelop/github-search/tree/master)

Once the project has deployed, continue with the configuration steps below.

The initial build will fail due to missing Stripe environment variables. After configuring Stripe, redeploy the application.

### Install dependencies and run the Next.js client

```bash
npm install
npm run dev
# or
yarn
yarn dev
```