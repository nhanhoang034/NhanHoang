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
                    cells[2] = cells[2].trim();
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

            // Cột Ảnh
            const imgTd = document.createElement("td");
            const img = document.createElement("img");
            img.src = row[0]; // Giả sử cột đầu tiên chứa đường dẫn hình ảnh
            img.alt = "Ảnh học viên";
            img.style.width = "50px"; // Điều chỉnh kích thước ảnh nếu cần
            img.style.height = "50px"; // Điều chỉnh kích thước ảnh nếu cần
            imgTd.appendChild(img);
            tr.appendChild(imgTd);

            const role = row[2];
            let bgColor = "#cccccc";  // mặc định: xám
            let textColor = "#000000";

            switch (role) {
                case "2":
                    bgColor = "#ffff66"; textColor = "#000000"; break; // vàng
                case "3":
                    bgColor = "#66cc66"; textColor = "#ffffff"; break; // xanh lá
                case "4":
                    bgColor = "#3399ff"; textColor = "#ffffff"; break; // xanh dương
                case "5":
                    bgColor = "#ff9900"; textColor = "#000000"; break; // cam
                case "6":
                    bgColor = "#ff3333"; textColor = "#ffffff"; break; // đỏ
                case "7":
                    bgColor = "#cc0000"; textColor = "#ffffff"; break; // đỏ đậm
                case "8":
                    bgColor = "#996633"; textColor = "#ffffff"; break; // nâu
                case "9":
                    bgColor = "#9966cc"; textColor = "#ffffff"; break; // tím
                case "20":
                    bgColor = "#663399"; textColor = "#ffffff"; break; // tím đậm
                default:
                    bgColor = "#cccccc"; textColor = "#000000"; break; // các quyền khác
            }

            row.forEach((cell, index) => {
                if (index !== 0) {  // Bỏ qua cột ảnh (đã xử lý ở trên)
                    const td = document.createElement("td");
                    td.textContent = cell;
                    td.style.backgroundColor = bgColor;
                    td.style.color = textColor;
                    tr.appendChild(td);
                }
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
            const matchRole = selectedRole === "" || row[2] === selectedRole;
            return matchKeyword && matchRole;
        });

        renderTable(filtered);
    }

    searchInput.addEventListener("input", filterAndRender);
    roleFilter.addEventListener("change", filterAndRender);

    loadCSV();
});
