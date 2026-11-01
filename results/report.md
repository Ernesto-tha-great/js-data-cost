# Results

Measured 2026-11-01 from a GitHub Actions runner (ubuntu-latest), Moto G4 emulation (Playwright), en-US, Chromium 141.0.7390.37.
Prices: Cable.co.uk Worldwide Mobile Data Pricing, 2023 edition. Income: World Bank GNI per capita (Atlas method), most recent year.

35 of 50 sites were usable. Median first visit: **3.25 MB**. Median repeat visit: **0.17 MB**, 19× less.
JavaScript was 46.8% of all bytes on first visits. An estimated 26.6% of all bytes were JavaScript that didn't run during load: 57% of the JavaScript.

## Sites (first visit, heaviest first)

| Site | First visit | Repeat visit | JavaScript | JS that didn't run during load | Requests |
|---|---:|---:|---:|---:|---:|
| Pinterest | 8.75 MB | 0.42 MB | 2.44 MB | 55% | 153 |
| CNN | 8.55 MB | 0.02 MB | 1.38 MB | 72% | 96 |
| Microsoft | 8.33 MB | 0.03 MB | 2.73 MB | 38% | 277 |
| ESPN | 6.82 MB | 0.97 MB | 3.36 MB | 55% | 215 |
| Figma | 6.13 MB | 3.04 MB | 1.72 MB | 63% | 248 |
| Booking.com | 6.00 MB | 1.71 MB | 5.01 MB | 65% | 320 |
| Yahoo | 5.82 MB | 0.75 MB | 3.24 MB | 46% | 1400 |
| Nike | 5.65 MB | 1.05 MB | 4.11 MB | 48% | 294 |
| TikTok | 5.59 MB | 3.92 MB | 2.50 MB | 59% | 183 |
| Airbnb | 5.53 MB | 0.20 MB | 3.62 MB | 50% | 224 |
| Amazon | 4.88 MB | 0.44 MB | 0.74 MB | 60% | 200 |
| Spotify | 4.87 MB | 0.05 MB | 1.60 MB | 59% | 141 |
| Zoom | 4.45 MB | 0.12 MB | 2.63 MB | 57% | 284 |
| GitHub | 4.26 MB | 0.01 MB | 1.99 MB | 69% | 160 |
| Duolingo | 3.86 MB | 0.06 MB | 2.31 MB | 58% | 145 |
| Twitch | 3.82 MB | 0.16 MB | 0.81 MB | 36% | 164 |
| Netflix | 3.66 MB | 0.20 MB | 2.06 MB | 50% | 106 |
| Notion | 3.25 MB | 0.20 MB | 2.21 MB | 45% | 219 |
| Uber | 3.10 MB | 0.17 MB | 1.47 MB | 62% | 95 |
| Walmart | 3.05 MB | 1.26 MB | 2.31 MB | 74% | 328 |
| The Guardian | 2.71 MB | 0.01 MB | 2.14 MB | 50% | 199 |
| Instagram | 2.57 MB | 0.11 MB | 2.22 MB | 78% | 38 |
| BBC News | 1.98 MB | 0.09 MB | 1.27 MB | 65% | 104 |
| PayPal | 1.94 MB | 0.13 MB | 1.32 MB | 57% | 137 |
| Canva | 1.88 MB | 1.11 MB | 0.68 MB | 47% | 56 |
| Apple | 1.78 MB | 0.05 MB | 0.43 MB | 53% | 47 |
| WhatsApp | 1.71 MB | 0.97 MB | 0.40 MB | 61% | 45 |
| DuckDuckGo | 1.62 MB | 0.01 MB | 0.51 MB | 54% | 65 |
| IKEA | 1.58 MB | 0.20 MB | 0.30 MB | 61% | 79 |
| YouTube | 1.35 MB | 0.17 MB | 1.13 MB | 62% | 60 |
| Wikipedia | 1.28 MB | 0.52 MB | 0.38 MB | 52% | 26 |
| Google | 1.03 MB | 0.15 MB | 0.84 MB | 62% | 53 |
| Bing | 0.86 MB | 0.09 MB | 0.05 MB | 70% | 84 |
| Facebook | 0.85 MB | 0.05 MB | 0.56 MB | 62% | 50 |
| IMDb | 0.45 MB | 0.11 MB | 0.41 MB | 52% | 14 |

Excluded: X (blocked (403, "")); Reddit (blocked (403, "")); LinkedIn (blocked (403, "Attention Required! | Cloudflare")); eBay (blocked (403, "Error Page | eBay")); AliExpress (page.goto: Timeout 45000ms exceeded.); Etsy (blocked (403, "etsy.com")); Tripadvisor (blocked (403, "tripadvisor.com")); The New York Times (blocked (403, "nytimes.com")); Reuters (blocked (401, "reuters.com")); The Weather Channel (page.goto: Timeout 45000ms exceeded.); ChatGPT (blocked (403, "Just a moment...")); Stack Overflow (blocked (403, "Just a moment...")); Medium (blocked (403, "Just a moment...")); Quora (blocked (403, "Just a moment...")); Zara (blocked (403, "Access Denied")).

## Countries: what a first visit costs

Work time is the cost divided by average hourly income: GNI per capita spread over 2,080 working hours a year.
The median site's first visit is 3.25 MB; the heaviest, Pinterest, is 8.75 MB. The median site ships 0.99 MB of JavaScript that doesn't run during load.

| Country | 1 GB | 1 GB in work time | Median site, first visit | Pinterest, first visit | Unused JS, per million first visits |
|---|---:|---:|---:|---:|---:|
| Zimbabwe | $43.75 | 34 h | $0.13 · 6.2 min | $0.36 · 17 min | $40,256 |
| Tanzania | $0.84 | 1.4 h | 0.25¢ · 15 s | 0.68¢ · 40 s | $773 |
| Ethiopia | $0.68 | 1.3 h | 0.21¢ · 14 s | 0.55¢ · 37 s | $626 |
| South Africa | $1.81 | 36 min | 0.55¢ · 6.5 s | $0.01 · 18 s | $1,665 |
| Nigeria | $0.39 | 36 min | 0.12¢ · 6.5 s | 0.32¢ · 17 s | $359 |
| Nepal | $0.43 | 34 min | 0.13¢ · 6.2 s | 0.35¢ · 17 s | $396 |
| Kenya | $0.59 | 33 min | 0.18¢ · 6.1 s | 0.48¢ · 16 s | $543 |
| Egypt | $0.65 | 25 min | 0.20¢ · 4.5 s | 0.53¢ · 12 s | $598 |
| Ghana | $0.40 | 19 min | 0.12¢ · 3.4 s | 0.33¢ · 9.3 s | $368 |
| Mexico | $2.03 | 18 min | 0.61¢ · 3.3 s | $0.02 · 9.0 s | $1,868 |
| Morocco | $0.63 | 18 min | 0.19¢ · 3.3 s | 0.51¢ · 8.8 s | $580 |
| South Korea | $5.01 | 17 min | $0.02 · 3.0 s | $0.04 · 8.1 s | $4,610 |
| New Zealand | $5.89 | 16 min | $0.02 · 2.9 s | $0.05 · 7.7 s | $5,420 |
| Philippines | $0.59 | 15 min | 0.18¢ · 2.8 s | 0.48¢ · 7.4 s | $543 |
| Canada | $5.37 | 12 min | $0.02 · 2.2 s | $0.04 · 5.8 s | $4,941 |
| Japan | $3.48 | 11 min | $0.01 · 2.1 s | $0.03 · 5.5 s | $3,202 |
| United Arab Emirates | $4.61 | 11 min | $0.01 · 2.0 s | $0.04 · 5.5 s | $4,242 |
| Bangladesh | $0.23 | 10 min | 0.07¢ · 1.8 s | 0.19¢ · 4.9 s | $212 |
| Pakistan | $0.12 | 10.0 min | 0.04¢ · 1.8 s | 0.10¢ · 4.9 s | $110 |
| Argentina | $1.11 | 9.5 min | 0.34¢ · 1.7 s | 0.90¢ · 4.6 s | $1,021 |
| United States | $6.00 | 8.4 min | $0.02 · 1.5 s | $0.05 · 4.1 s | $5,521 |
| Switzerland | $7.29 | 8.2 min | $0.02 · 1.5 s | $0.06 · 4.0 s | $6,708 |
| Portugal | $1.79 | 7.5 min | 0.54¢ · 1.4 s | $0.01 · 3.6 s | $1,647 |
| Vietnam | $0.29 | 7.3 min | 0.09¢ · 1.3 s | 0.24¢ · 3.6 s | $267 |
| India | $0.16 | 7.2 min | 0.05¢ · 1.3 s | 0.13¢ · 3.5 s | $147 |
| Indonesia | $0.28 | 6.8 min | 0.08¢ · 1.2 s | 0.23¢ · 3.3 s | $258 |
| Sri Lanka | $0.25 | 6.7 min | 0.08¢ · 1.2 s | 0.20¢ · 3.3 s | $230 |
| Peru | $0.45 | 6.7 min | 0.14¢ · 1.2 s | 0.37¢ · 3.3 s | $414 |
| Thailand | $0.41 | 6.7 min | 0.12¢ · 1.2 s | 0.33¢ · 3.3 s | $377 |
| Ukraine | $0.27 | 6.1 min | 0.08¢ · 1.1 s | 0.22¢ · 3.0 s | $248 |
| Norway | $4.07 | 5.2 min | $0.01 · 0.9 s | $0.03 · 2.6 s | $3,745 |
| Saudi Arabia | $1.49 | 5.2 min | 0.45¢ · 0.9 s | $0.01 · 2.5 s | $1,371 |
| Brazil | $0.40 | 4.7 min | 0.12¢ · 0.9 s | 0.33¢ · 2.3 s | $368 |
| Chile | $0.64 | 4.7 min | 0.19¢ · 0.9 s | 0.52¢ · 2.3 s | $589 |
| Sweden | $2.33 | 4.6 min | 0.70¢ · 0.8 s | $0.02 · 2.3 s | $2,144 |
| Germany | $2.14 | 4.4 min | 0.65¢ · 0.8 s | $0.02 · 2.2 s | $1,969 |
| Turkey | $0.44 | 3.4 min | 0.13¢ · 0.6 s | 0.36¢ · 1.6 s | $405 |
| China | $0.38 | 3.3 min | 0.11¢ · 0.6 s | 0.31¢ · 1.6 s | $350 |
| Colombia | $0.20 | 3.2 min | 0.06¢ · 0.6 s | 0.16¢ · 1.5 s | $184 |
| Netherlands | $1.61 | 2.9 min | 0.49¢ · 0.5 s | $0.01 · 1.4 s | $1,481 |
| Malaysia | $0.28 | 2.8 min | 0.08¢ · 0.5 s | 0.23¢ · 1.4 s | $258 |
| Ireland | $1.50 | 2.1 min | 0.45¢ · 0.4 s | $0.01 · 1.0 s | $1,380 |
| Poland | $0.37 | 1.8 min | 0.11¢ · 0.3 s | 0.30¢ · 0.9 s | $340 |
| Spain | $0.48 | 1.6 min | 0.15¢ · 0.3 s | 0.39¢ · 0.8 s | $442 |
| United Kingdom | $0.62 | 1.4 min | 0.19¢ · 0.3 s | 0.51¢ · 0.7 s | $570 |
| Singapore | $0.63 | 58 s | 0.19¢ · 0.2 s | 0.51¢ · 0.5 s | $580 |
| Australia | $0.44 | 51 s | 0.13¢ · 0.2 s | 0.36¢ · 0.4 s | $405 |
| France | $0.20 | 31 s | 0.06¢ · < 0.1 s | 0.16¢ · 0.3 s | $184 |
| Italy | $0.09 | 16 s | 0.03¢ · < 0.1 s | 0.07¢ · 0.1 s | $82.81 |
| Israel | $0.02 | 2.7 s | < 0.01¢ · < 0.1 s | 0.02¢ · < 0.1 s | $18.40 |

1 GB costs 46,201× more work in Zimbabwe than in Israel. Without Zimbabwe, the gap is 1,858× (Tanzania against Israel).

## What the bytes are

| Resource type | Share of first-visit bytes |
|---|---:|
| Script | 46.8% |
| Image | 29.2% |
| Font | 7.2% |
| Document | 4.3% |
| Fetch | 3.1% |
| XHR | 2.7% |
| Stylesheet | 2.7% |
| Media | 2.4% |
| Other | 1.6% |
| Everything else | 0.1% |

JavaScript was more than half of the first visit on 17 of 35 sites. The median site downloaded 1.60 MB of it. In total, 34.51 MB of JavaScript didn't run during load.
Video and audio over 100 KB on a first visit: CNN 0.16 MB, Yahoo 0.16 MB, TikTok 1.25 MB, Airbnb 0.13 MB, Amazon 1.30 MB. Without it, Pinterest would be 8.75 MB instead of 8.75 MB (0% less).

## A month of use

A month is 5 visits a day for 30 days: 1 first visit and 149 repeat visits. Repeat visits are 96% of all those bytes (81% at one visit a day).
The last column is an upper bound: the month if every script, image, font, stylesheet, media byte on the repeat visit came from cache.

| Site | First visit | Repeat visit | A month | Most re-downloaded on a repeat visit | A month, if cacheable types were cached |
|---|---:|---:|---:|---|---:|
| TikTok | 5.59 MB | 3.92 MB | 589 MB | 2.49 MB Media | 215 MB |
| Figma | 6.13 MB | 3.04 MB | 460 MB | 2.59 MB XHR | 433 MB |
| Booking.com | 6.00 MB | 1.71 MB | 261 MB | 1.05 MB Image | 50 MB |
| Walmart | 3.05 MB | 1.26 MB | 191 MB | 0.89 MB Script | 46 MB |
| Canva | 1.88 MB | 1.11 MB | 167 MB | 0.49 MB Image | 52 MB |
| Nike | 5.65 MB | 1.05 MB | 163 MB | 0.60 MB Image | 18 MB |
| ESPN | 6.82 MB | 0.97 MB | 151 MB | 0.65 MB Script | 39 MB |
| WhatsApp | 1.71 MB | 0.97 MB | 146 MB | 0.92 MB Image | 10 MB |
| Yahoo | 5.82 MB | 0.75 MB | 117 MB | 0.31 MB Fetch | 90 MB |
| Wikipedia | 1.28 MB | 0.52 MB | 79 MB | 0.32 MB Image | 10 MB |
| Pinterest | 8.75 MB | 0.42 MB | 72 MB | 0.27 MB Document | 56 MB |
| Amazon | 4.88 MB | 0.44 MB | 70 MB | 0.23 MB Image | 36 MB |



