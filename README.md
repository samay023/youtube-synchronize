This is a Youtube sync dashboard which leverage Youtube Data API v3 and Google PubHubSubBub (push) to sync a video metadata into the database. This reference to the embed link is also stored, so it helps with playing any of the videos already synced easily.

## Getting Started

First, run the development server:

```bash
yarn install
yarn setup
yarn migrate
yarn dev

```

And ensure the necessary environment variables are set.
