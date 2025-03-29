// Tự động tải file CSV khi trang load
async function loadCSV() {
    try {
        let response = await fetch('data.csv');
        let csvData = await response.text();
        console.log("Nội dung file CSV:\n", csvData);
        processCSV(csvData);
    } catch (error) {
        console.error("Lỗi khi tải file CSV:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadCSV);

// Xử lý dữ liệu CSV
function processCSV(csvData) {
    let rows = csvData.split("\n").map(row => row.split(","));
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    
    rows.forEach((row, index) => {
        if (index > 0 && row.length === 3) { // Bỏ qua tiêu đề
            let newRow = document.createElement("tr");
            newRow.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td>`;
            tableBody.appendChild(newRow);
        }
    });
}

// Lọc dữ liệu khi nhập vào ô tìm kiếm
document.getElementById("searchInput").addEventListener("input", function () {
    let searchText = this.value.toLowerCase();
    let rows = document.querySelectorAll("#tableBody tr");
    
    rows.forEach(row => {
        let name = row.cells[0].textContent.toLowerCase(); // Họ và Tên
        let permission = row.cells[2].textContent.toLowerCase(); // Quyền
        
        if (isNaN(searchText)) { // Nếu nhập chữ, tìm theo tên
            row.style.display = name.includes(searchText) ? "" : "none";
        } else { // Nếu nhập số, tìm theo quyền
            row.style.display = permission.includes(searchText) ? "" : "none";
        }
    });
});
