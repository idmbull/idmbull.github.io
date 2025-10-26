This is your new *vault*.

Make a note of something, [[create a link]], or try [the Importer](https://help.obsidian.md/Plugins/Importer)!

When you're ready, delete this note and make the vault your own.

### Promt AI

```
Giọng giáo viên đọc phát âm chậm rãi làm mẫu cho học sinh.
```

## Code lấy từ vựng 4000. F12

``` js
(async () => {
  // 1️⃣ Nạp thư viện SheetJS (xlsx)
  if (typeof XLSX === "undefined") {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  // 2️⃣ Lấy dữ liệu từ các thẻ <li>
  const items = document.querySelectorAll("ul li");
  if (items.length === 0) {
    alert("Không tìm thấy thẻ <li> nào! Hãy đảm bảo bạn đang chạy trong trang có danh sách từ vựng.");
    return;
  }

  const data = Array.from(items).map((li, index) => {
    const word = li.querySelector(".en-word")?.childNodes[0]?.textContent?.trim() || "";
    const pron = li.querySelector(".en-pron")?.textContent?.trim() || "";
    const desc = li.querySelector(".en-desc")?.innerText?.trim() || "";
    const exam = li.querySelector(".en-exam")?.innerText?.trim() || "";
    const audio = li.getAttribute("source") || "";
    const image = li.querySelector("img")?.getAttribute("src") || "";
    return { STT: index + 1, Từ: word, Phiên_âm: pron, Nghĩa: desc, Ví_dụ: exam, Âm_thanh: audio, Ảnh: image };
  });

  console.log("✅ Dữ liệu thu được:", data);

  // 3️⃣ Tạo file Excel
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Tự động điều chỉnh độ rộng cột
  const colWidths = Object.keys(data[0]).map(k => ({ wch: Math.max(15, k.length + 5) }));
  ws["!cols"] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, "Wordlist");

  // 4️⃣ Xuất file
  XLSX.writeFile(wb, "wordlist.xlsx");
  alert("🎉 Đã xuất file wordlist.xlsx thành công!");
})();

```