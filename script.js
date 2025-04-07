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
                    if (cells.length < 4) cells[3] = "0"; // Gán mặc định quyền nếu thiếu
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

            const role = row[3];
            let bgColor = "#cccccc";  // mặc định: xám
            let textColor = "#000000";

            switch (role) {
                case "2":
                    bgColor = "#ffff66"; textColor = "#000000"; break;
                case "3":
                    bgColor = "#66cc66"; textColor = "#ffffff"; break;
                case "4":
                    bgColor = "#3399ff"; textColor = "#ffffff"; break;
                case "5":
                    bgColor = "#ff9900"; textColor = "#000000"; break;
                case "6":
                    bgColor = "#ff3333"; textColor = "#ffffff"; break;
                case "7":
                    bgColor = "#cc0000"; textColor = "#ffffff"; break;
                case "8":
                    bgColor = "#996633"; textColor = "#ffffff"; break;
                case "9":
                    bgColor = "#9966cc"; textColor = "#ffffff"; break;
                case "20":
                    bgColor = "#663399"; textColor = "#ffffff"; break;
                default:
                    bgColor = "#cccccc"; textColor = "#000000"; break;
            }

            // Tạo các ô: Họ và tên, Mã hội viên, Quyền
            for (let i = 1; i <= 3; i++) {
                const td = document.createElement("td");
                td.textContent = row[i];
                td.style.backgroundColor = bgColor;
                td.style.color = textColor;
                tr.appendChild(td);
            }

            // Cột ảnh (lấy từ cột ảnh trong CSV)
            const imgTd = document.createElement("td");
            const img = document.createElement("img");
            img.src = row[0]; // Lấy đường dẫn ảnh từ cột đầu tiên
            img.alt = "Ảnh";
            img.style.width = "60px";
            img.style.height = "60px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "8px";
            imgTd.appendChild(img);
            imgTd.style.textAlign = "center";
            imgTd.style.backgroundColor = bgColor;
            imgTd.style.color = textColor;
            tr.appendChild(imgTd);

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
            const matchKeyword = row.slice(1).some(cell => cell.toLowerCase().includes(keyword));
            const matchRole = selectedRole === "" || row[3] === selectedRole;
            return matchKeyword && matchRole;
        });

        renderTable(filtered);
    }

    searchInput.addEventListener("input", filterAndRender);
    roleFilter.addEventListener("change", filterAndRender);

    loadCSV();
});
