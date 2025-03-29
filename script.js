document.addEventListener("DOMContentLoaded", function () {
    let data = [];

    async function loadCSV() {
        try {
            let response = await fetch('data.csv');
            let csvData = await response.text();
            data = csvData.split("\n").slice(1).map(line => line.split(','));
            renderTable(data);
        } catch (error) {
            console.error("Lỗi khi tải file CSV:", error);
        }
    }

    function renderTable(filteredData) {
        const tableBody = document.getElementById("tableBody");
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
        let filteredData = [];

        if (!isNaN(value) && value !== "") {
            filteredData = data.filter(row => row[1] && row[1].toLowerCase().includes(value));
        } else {
            filteredData = data.filter(row => row[0] && row[0].toLowerCase().includes(value));
        }

        renderTable(filteredData);
    });

    loadCSV();
});
