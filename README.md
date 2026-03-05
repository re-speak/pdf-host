# PDF Host

A lightweight PDF viewer hosted on Cloudflare Pages. Render any publicly accessible PDF in the browser instead of downloading it — works in all browsers including mobile in-app browsers (KakaoTalk, LINE, etc.).

## Usage

```
https://your-site.pages.dev/?url=https://example.com/document.pdf
```

## How It Works

1. The `?url=` parameter specifies a public PDF URL (e.g. from S3)
2. A Cloudflare Pages Function proxies the PDF to avoid CORS issues
3. PDF.js renders each page to canvas — no native PDF viewer required

## Deploy

1. Fork or clone this repo
2. In the Cloudflare Dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**
3. Select this repo, leave build settings empty, and deploy

Your viewer will be live at `https://your-project.pages.dev`.

## Project Structure

```
├── index.html              # PDF.js viewer
└── functions/
    └── api/
        └── proxy.js        # Cloudflare Pages Function (PDF proxy)
```
