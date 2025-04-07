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
                .slice(1)
                .map(line => {
                    let cells = line.split(',').map(cell => cell.trim());
                    if (cells.length < 4 || !cells[3]) cells[3] = "images/default.jpg"; // nếu thiếu ảnh
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
            let bgColor = "#cccccc";
            let textColor = "#000000";

            switch (role) {
                case "2": bgColor = "#ffff66"; textColor = "#000000"; break;
                case "3": bgColor = "#66cc66"; textColor = "#ffffff"; break;
                case "4": bgColor = "#3399ff"; textColor = "#ffffff"; break;
                case "5": bgColor = "#ff9900"; textColor = "#000000"; break;
                case "6": bgColor = "#ff3333"; textColor = "#ffffff"; break;
                case "7": bgColor = "#cc0000"; textColor = "#ffffff"; break;
                case "8": bgColor = "#996633"; textColor = "#ffffff"; break;
                case "9": bgColor = "#9966cc"; textColor = "#ffffff"; break;
                case "20": bgColor = "#663399"; textColor = "#ffffff"; break;
                default: bgColor = "#cccccc"; textColor = "#000000"; break;
            }

            // Cột ảnh (đầu tiên)
            const imgTd = document.createElement("td");
            const img = document.createElement("img");
            img.src = row[3];
            img.alt = "Ảnh học viên";
            img.width = 60;
            img.height = 60;
            img.style.borderRadius = "10px";
            imgTd.appendChild(img);
            tr.appendChild(imgTd);

            // Các ô còn lại: Họ tên, mã hội viên, quyền
            for (let i = 0; i < 3; i++) {
                const td = document.createElement("td");
                td.textContent = row[i];
                td.style.backgroundColor = bgColor;
                td.style.color = textColor;
                tr.appendChild(td);
            }

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
            const matchKeyword = row.slice(0, 3).some(cell => cell.toLowerCase().includes(keyword));
            const matchRole = selectedRole === "" || row[2] === selectedRole;
            return matchKeyword && matchRole;
        });

        renderTable(filtered);
    }

    searchInput.addEventListener("input", filterAndRender);
    roleFilter.addEventListener("change", filterAndRender);

    loadCSV();
});
