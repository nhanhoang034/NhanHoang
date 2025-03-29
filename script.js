document.addEventListener("DOMContentLoaded", function () {
    let data = [];

    async function loadCSV() {
        try {
            let response = await fetch('data.csv');
            let csvData = await response.text();
            console.log("Dữ liệu CSV tải về:", csvData); // Kiểm tra dữ liệu
            data = csvData.split("\n").slice(1).map(line => line.split(','));
            renderTable(data);
        } catch (error) {
            console.error("Lỗi khi tải file CSV:", error);
        }
    }

    function renderTable(filteredData) {
        const tableBody = document.getElementById("memberTable");
        tableBody.innerHTML = "";
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
            row[0]?.toLowerCase().includes(value) ||  // Tên
            row[1]?.toLowerCase().includes(value) ||  // Mã Hội Viên
            row[2]?.toLowerCase().includes(value)     // Quyền
        );
        renderTable(filteredData);
    });

    loadCSV();
});
