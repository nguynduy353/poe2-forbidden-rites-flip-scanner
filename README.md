# PoE 2 Forbidden Rites Economy Flip Scanner v2.1.1

Frontend static giống project PoE1: **GitHub repo chỉ chứa `docs/`**. Cloudflare Worker được quản lý/deploy riêng trong Cloudflare Dashboard.

## Cấu trúc GitHub

```text
docs/
├── index.html
├── config.js
└── .nojekyll
```

## 1. Cloudflare Worker

Tạo một Worker riêng trên Cloudflare, ví dụ:

```text
poe2-forbidden-rites-economy-scanner
```

Paste code Worker được cung cấp riêng vào Cloudflare Dashboard → Edit code → Deploy.

Sau khi deploy, kiểm tra:

```text
https://YOUR-WORKER.workers.dev/health
```

## 2. Cấu hình GitHub frontend

Mở `docs/config.js` và điền URL Worker:

```js
window.POE2_FLIP_CONFIG = {
  workerUrl: "https://YOUR-WORKER.workers.dev",
  defaultLeague: "Forbidden Rites"
};
```

## 3. GitHub Pages

GitHub → repository → Settings → Pages:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/docs**

Save và chờ GitHub Pages deploy.

## 4. Sử dụng

Mở website GitHub Pages → **CHECK WORKER** → **REFRESH LEAGUE** → **SCAN POE2**.

Scanner chỉ dùng các nhóm Economy của PoE2; không có Unique/Equipment/Build.
