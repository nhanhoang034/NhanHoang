let data = [];

// Tự động tải file CSV khi trang load
document.addEventListener("DOMContentLoaded", function () {
    fetch('data.csv')
        .then(response => response.text())
        .then(csvData => {
            data = csvData.split("\n").slice(1).map(line => line.split(','));
            renderTable(data);
        })
        .catch(error => console.error("Lỗi khi tải file CSV:", error));

    // Lọc dữ liệu khi nhập vào ô tìm kiếm
    document.getElementById("searchInput").addEventListener("input", function () {
        let searchText = this.value.toLowerCase().trim();
        let filteredData = [];

        if (searchText !== "") {
            if (!isNaN(searchText)) {
                filteredData = data.filter(row => row[2] && row[2].toLowerCase().includes(searchText)); // Lọc theo Quyền
            } else {
                filteredData = data.filter(row => row[0] && row[0].toLowerCase().includes(searchText)); // Lọc theo Họ và Tên
            }
        } else {
            filteredData = data; // Nếu không nhập gì, hiển thị full
        }

        renderTable(filteredData);
    });
});

function renderTable(filteredData) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    filteredData.forEach(row => {
        if (row.length >= 3) {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        }
    });
}
