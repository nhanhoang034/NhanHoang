document.addEventListener("DOMContentLoaded", function () {
    let data = [];

    async function loadCSV() {
        try {
            let response = await fetch('data.csv');
            let csvData = await response.text();
            console.log("Dữ liệu CSV tải về:", csvData); // Kiểm tra dữ liệu

            // Kiểm tra dữ liệu có rỗng không
            if (!csvData) {
                console.error("File CSV rỗng!");
                return;
            }

            data = csvData.split("\n").slice(1).map(line => line.split(','));

            // Kiểm tra bảng có tồn tại không
            const tableBody = document.getElementById("memberTable");
            if (!tableBody) {
                console.error("Không tìm thấy phần tử 'memberTable'. Kiểm tra HTML.");
                return;
            }

            renderTable(data);
        } catch (error) {
            console.error("Lỗi khi tải file CSV:", error);
        }
    }

    function renderTable(filteredData) {
        const tableBody = document.getElementById("memberTable");
        if (!tableBody) {
            console.error("Lỗi: Không tìm thấy bảng để hiển thị dữ liệu!");
            return;
        }

        tableBody.innerHTML = ""; // Xóa dữ liệu cũ

        filteredData.forEach(row => {
            if (row.length >= 3) {
                const tr = document.createElement("tr");
                row.forEach(cell => {
                    const td = document.createElement("td");
                    td.textContent = cell.trim();
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            }
        });
    }

    document.getElementById("searchInput").addEventListener("input", function () {
        const value = this.value.toLowerCase();
        let filteredData = data.filter(row => 
            row[0]?.toLowerCase().includes(value) ||  // Họ và tên
            row[1]?.toLowerCase().includes(value) ||  // Mã hội viên
            row[2]?.toLowerCase().includes(value)     // Quyền
        );
        renderTable(filteredData);
    });

    // Chặn favicon request gây lỗi 404
    document.head.insertAdjacentHTML("beforeend", "<link rel='icon' href='data:,'>");

    loadCSV();
});
