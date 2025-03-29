document.addEventListener("DOMContentLoaded", function () {
    let data = [];

    async function loadCSV() {
        try {
            let response = await fetch('data.csv');
            let csvData = await response.text();
            console.log("📥 Dữ liệu CSV tải về:", csvData); // Kiểm tra dữ liệu tải về

            // Kiểm tra dữ liệu có rỗng không
            if (!csvData) {
                console.error("⚠️ File CSV rỗng!");
                return;
            }

            // Tách CSV (Xử lý cả Windows "\r\n" và Unix "\n")
            data = csvData.split(/\r?\n/).slice(1).map(line => line.split(',').map(cell => cell.trim()));
            console.log("🔍 Dữ liệu CSV sau khi tách:", data);

            // Kiểm tra bảng có tồn tại không
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
        tableBody.innerHTML = ""; // Xóa dữ liệu cũ

        filteredData.forEach((row, index) => {
            let cleanRow = row.map(cell => cell.trim()); // Chuẩn hóa từng ô dữ liệu
            console.log(`🔎 Kiểm tra hàng ${index + 1}:`, cleanRow);
            
            if (cleanRow.length < 3) {
                cleanRow[2] = "Chưa xác định"; // Nếu thiếu cột "Quyền", gán mặc định
            }

            const tr = document.createElement("tr");
            cleanRow.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            console.log("➕ Thêm dòng:", tr);
            tableBody.appendChild(tr);
        });
    }

    document.getElementById("searchInput").addEventListener("input", function () {
        let value = this.value.toLowerCase().trim().replace(/\s+/g, " "); // Bỏ khoảng trắng dư
        console.log("🔍 Người dùng nhập tìm kiếm:", value);

        let filteredData = data.filter(row => {
            let cleanRow = row.map(cell => cell.trim().toLowerCase().replace(/\s+/g, " "));
            return cleanRow[0]?.includes(value) || cleanRow[1]?.includes(value) || cleanRow[2]?.includes(value);
        });

        console.log("🎯 Kết quả lọc:", filteredData);
        renderTable(filteredData);
    });

    // Chặn favicon request gây lỗi 404
    document.head.insertAdjacentHTML("beforeend", "<link rel='icon' href='data:,'>");

    loadCSV();
});