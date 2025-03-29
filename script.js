document.addEventListener("DOMContentLoaded", function () {
    let data = [];

    async function loadCSV() {
        try {
            let response = await fetch('data.csv');
            let csvData = await response.text();
            console.log("📥 Dữ liệu CSV tải về:", csvData);

            if (!csvData.trim()) {
                console.error("⚠️ File CSV rỗng!");
                return;
            }

            // Chia dữ liệu theo dòng và bỏ dòng rỗng
            let rows = csvData.split(/\r?\n/).filter(line => line.trim() !== "");
            if (rows.length < 2) {
                console.error("⚠️ File CSV không có dữ liệu hợp lệ!");
                return;
            }

            data = rows.slice(1).map(line => {
                let cols = line.split(',').map(cell => cell.trim());
                return cols.length >= 3 ? cols.slice(0, 3) : null;
            }).filter(row => row !== null);

            console.log("🔍 Dữ liệu CSV sau khi tách:", data);

            const tableBody = document.getElementById("memberTable");
            if (!tableBody) {
                console.error("❌ Không tìm thấy phần tử 'memberTable'. Kiểm tra HTML.");
                return;
            }

            console.log("✅ Đã tìm thấy bảng, tiến hành hiển thị dữ liệu.");
            renderTable(data);
        } catch (error) {
            console.error("🚨 Lỗi khi tải file CSV:", error);
        }
    }

    function renderTable(filteredData) {
        const tableBody = document.getElementById("memberTable");
        if (!tableBody) {
            console.error("❌ Lỗi: Không tìm thấy bảng để hiển thị dữ liệu!");
            return;
        }

        console.log("🖥️ Hiển thị dữ liệu trên bảng:", filteredData);
        tableBody.innerHTML = ""; 

        filteredData.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    document.getElementById("searchInput").addEventListener("input", function () {
        const value = this.value.toLowerCase().trim();
        console.log("🔍 Người dùng nhập tìm kiếm:", value);

        if (!value) {
            renderTable(data);
            return;
        }

        let filteredData = data.filter(row =>
            row.some(cell => cell.toLowerCase().includes(value))
        );

        console.log("🎯 Kết quả lọc:", filteredData);
        renderTable(filteredData);
    });

    document.head.insertAdjacentHTML("beforeend", "<link rel='icon' href='data:,'>");
    loadCSV();
});
