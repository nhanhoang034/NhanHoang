// Lắng nghe sự kiện khi người dùng chọn file CSV
const fileInput = document.getElementById("fileInput");
fileInput.addEventListener("change", function (event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let csvData = e.target.result;
            console.log("Nội dung file CSV:\n", csvData);
            processCSV(csvData);
        };
        reader.readAsText(file);
    } else {
        console.log("Chưa có file nào được chọn!");
    }
});

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
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(searchText) ? "" : "none";
    });
});
