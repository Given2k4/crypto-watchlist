# Crypto Watchlist

A React app for tracking live cryptocurrency prices. Search for any coin, add it to your watchlist, remove it, and your list is saved in the browser.

**Live demo:** https://crypto-watchlist-vert.vercel.app/

## Features
- Live prices and 24h change from the CoinGecko API
- Search for any coin and add it to the watchlist
- Remove coins with one click
- Watchlist saved with localStorage, so it persists after a refresh
- Loading, error, and empty states

## Tech stack
React, Vite, JavaScript, CoinGecko API

## Run it locally
git clone https://github.com/Given2k4/crypto-watchlist.git
cd crypto-watchlist
npm install
npm run dev

## How I built it
I built this with Claude as my AI coding assistant. I chose the project idea and the stack (React + Vite), and Claude generated the code in stages: first live price cards, then search, add/remove, and localStorage saving.

My part:
- Set up the environment (Node, Git, VS Code), fixing a PowerShell execution policy error along the way
- Ran, tested, and debugged each stage in the browser
- Created the GitHub repo and committed and pushed each stage with Git
- Deployed the app on Vercel

What I learned: how React state and effects work, how to call a public API, how localStorage persists data, and the Git workflow (add, commit, push).

## Next steps
- Price charts per coin
- An "Explain this coin" button powered by an AI API