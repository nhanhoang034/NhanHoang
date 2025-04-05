document.addEventListener("DOMContentLoaded", function () {
    let data = [];
    const totalCount = document.getElementById("totalCount");
    const tableBody = document.getElementById("memberTable");
    const searchInput = document.getElementById("searchInput");
    const roleFilter = document.getElementById("roleFilter");

    async function loadCSV() {
        try {
            let response = await fetch('data.csv');
            let csvData = await response.text();

            if (!csvData) {
                console.error("⚠️ File CSV rỗng!");
                return;
            }

            data = csvData
                .split(/\r?\n/)
                .slice(1) // Bỏ qua dòng tiêu đề
                .map(line => {
                    let cells = line.split(',').map(cell => cell.trim());
                    if (cells.length < 3) cells[2] = "0"; // Nếu thiếu quyền, gán mặc định là 0
                    cells[2] = cells[2].trim(); // Trim thêm quyền để tránh bị lỗi
                    return cells;
                });

            renderTable(data);
        } catch (error) {
            console.error("🚨 Lỗi khi tải file CSV:", error);
        }
    }

    function renderTable(filteredData) {
        tableBody.innerHTML = "";

        filteredData.forEach(row => {
            const tr = document.createElement("tr");

            const role = row[2];
            let bgColor = "#d6d6d6"; // Mặc định xám

            switch (role) {
                case "1": bgColor = "#ffffff"; break;   // trắng
                case "2": bgColor = "#fff200"; break;   // vàng
                case "3": bgColor = "#28a745"; break;   // xanh lá
                case "4": bgColor = "#007bff"; break;   // xanh dương
                case "5": bgColor = "#fd7e14"; break;   // cam
                case "6": bgColor = "#dc3545"; break;   // đỏ
                case "7": bgColor = "#8b0000"; break;   // đỏ đậm
                case "8": bgColor = "#8b4513"; break;   // nâu
                case "9": bgColor = "#9b59b6"; break;   // tím
                case "20": bgColor = "#6f42c1"; break;  // tím đậm
            }

            tr.style.backgroundColor = bgColor;

            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });

            tableBody.appendChild(tr);
        });

        updateTotalCount(filteredData.length);
    }

    function updateTotalCount(count) {
        if (totalCount) {
            totalCount.textContent = `Hiện có: ${count} học viên`;
        }
    }

    function filterAndRender() {
        const keyword = searchInput.value.toLowerCase().trim();
        const selectedRole = roleFilter.value;

        const filtered = data.filter(row => {
            const matchKeyword = row.some(cell => cell.toLowerCase().includes(keyword));
            const matchRole = selectedRole === "" || row[2] === selectedRole; // Lọc quyền nếu có chọn
            return matchKeyword && matchRole;
        });

        renderTable(filtered);
    }

    searchInput.addEventListener("input", filterAndRender);
    roleFilter.addEventListener("change", filterAndRender);

    loadCSV();
});
