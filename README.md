# PoE 2 Forbidden Rites Economy Flip Scanner v2.0.0

Scanner economy-only cho Path of Exile 2 patch 0.5.5 / Forbidden Rites.

## Luồng sử dụng

1. Deploy `worker/` lên Cloudflare Workers.
2. Deploy `docs/` lên GitHub Pages hoặc host tĩnh.
3. Nhập Worker URL.
4. Bấm **SCAN POE2**.
5. Scanner tự lấy economy data từ poe.ninja cho các category PoE2.
6. Bảng **Ứng viên flip** xếp hạng theo liquidity, market value và độ ổn định trend.
7. Bấm **Analyze** ở item muốn flip.
8. Nhập **Buy Chaos/item + Qty** và **Sell Divine/item + Qty**.
9. Scanner tự tính Capital, Gross Profit, Fee, Net Profit, ROI/Margin và Net/round.
10. Bấm **LƯU BUY/SELL** để giữ dữ liệu trên trình duyệt.

## Economy categories

- Currency
- Fragments
- Abyss
- Uncut Gems
- Lineage Gems
- Essences
- Soul Cores
- Idols
- Runes
- Ritual / Omens
- Expedition
- Delirium / Liquid Emotions
- Breach / Catalysts
- Verisium

Không scan Unique, Equipment hoặc Build data.

## API / Worker

Worker chỉ proxy các economy endpoints được poe.ninja công khai cho PoE2. API này được cập nhật không liên tục; poe.ninja khuyến nghị client proxy qua backend, cache response và không poll quá nhanh.

## Profit formula

`Capital D = Buy Chaos total / Market Divine rate`

`Gross D = Sell Divine/item × Sell Qty`

`Net D = Gross D − Capital D − Extra Fee D`

`ROI = Net D / Capital D × 100`

PoE2 economy overview không cung cấp bid/ask order cá nhân, vì vậy scanner chỉ xác định **ứng viên** từ market data; lợi nhuận thực tế được tính sau khi người dùng nhập order Buy/Sell.
