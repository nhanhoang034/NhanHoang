document.getElementById("fileInput").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        let csvData = e.target.result;
        let lines = csvData.split("\n");
        let tableBody = document.getElementById("tableBody");

        tableBody.innerHTML = ""; // Xóa dữ liệu cũ

        for (let i = 0; i < lines.length; i++) {
            let columns = lines[i].split(",");
            if (columns.length < 3) continue; // Bỏ qua dòng không đủ cột

            let row = document.createElement("tr");
            columns.forEach(col => {
                let cell = document.createElement("td");
                cell.textContent = col.trim();
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        }

        console.log("Dữ liệu đã được nạp vào bảng");
    };

    reader.readAsText(file);
});

function searchTable() {
    let searchTerm = document.getElementById("search").value.toLowerCase();
    console.log("Tìm kiếm: " + searchTerm); // Kiểm tra giá trị nhập vào

    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? "" : "none";
    });
}
