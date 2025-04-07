document.addEventListener("DOMContentLoaded", function () {
    let data = [];
    const totalCount = document.getElementById("totalCount");
    const tableBody = document.getElementById("memberTable");
    const searchInput = document.getElementById("searchInput");
    const roleFilter = document.getElementById("roleFilter");

    // Modal để hiển thị ảnh lớn
    const imageModal = document.createElement("div");
    imageModal.id = "imageModal";

    const closeBtn = document.createElement("span");
    closeBtn.id = "closeBtn";
    closeBtn.textContent = "×"; // Dấu X để đóng
    imageModal.appendChild(closeBtn);

    const modalImg = document.createElement("img");
    imageModal.appendChild(modalImg);
    document.body.appendChild(imageModal);

    closeBtn.addEventListener("click", function () {
        imageModal.style.display = "none";
    });

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
                    if (cells.length < 4) cells[3] = ""; // Nếu thiếu ảnh, gán mặc định là rỗng
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

            // Cột Họ và Tên
            const nameCell = document.createElement("td");
            nameCell.textContent = row[0]; // Họ và Tên
            nameCell.style.backgroundColor = bgColor;
            nameCell.style.color = textColor;
            tr.appendChild(nameCell);

            // Cột Mã Hội Viên
            const memberCodeCell = document.createElement("td");
            memberCodeCell.textContent = row[1]; // Mã Hội Viên
            memberCodeCell.style.backgroundColor = bgColor;
            memberCodeCell.style.color = textColor;
            tr.appendChild(memberCodeCell);

            // Cột Quyền
            const roleCell = document.createElement("td");
            roleCell.textContent = row[2]; // Quyền
            roleCell.style.backgroundColor = bgColor;
            roleCell.style.color = textColor;
            tr.appendChild(roleCell);

            // Cột Ảnh
            const imgCell = document.createElement("td");
            const img = document.createElement("img");
            img.src = row[3]; // Link ảnh từ cột Ảnh trong CSV
            img.alt = "Chưa có ảnh";
            img.style.width = "50px";
            img.style.height = "50px";
            img.style.cursor = "pointer"; // Thêm con trỏ khi hover lên ảnh
            img.addEventListener("click", function () {
                modalImg.src = img.src; // Gán ảnh vào modal
                imageModal.style.display = "flex"; // Mở modal
            });
            imgCell.appendChild(img);
            imgCell.style.backgroundColor = bgColor;
            imgCell.style.color = textColor;
            tr.appendChild(imgCell);

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
