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
                .map(line => line.split(',').map(cell => cell.trim()));
            renderTable(data);
        } catch (error) {
            console.error("🚨 Lỗi khi tải file CSV:", error);
        }
    }

    function renderTable(filteredData) {
        tableBody.innerHTML = "";
        filteredData.forEach(row => {
            let cleanRow = row.map(cell => cell.trim());
            if (cleanRow.length < 3) cleanRow[2] = "Chưa xác định";

            const tr = document.createElement("tr");
            cleanRow.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
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
        let value = searchInput.value.toLowerCase().trim();
        let selectedRole = roleFilter.value;

        let filteredData = data.filter(row => {
            const matchesSearch = row.some(cell => cell.toLowerCase().includes(value));
            const matchesRole = selectedRole === "" || row[2].trim() === selectedRole;
            return matchesSearch && matchesRole;
        });

        renderTable(filteredData);
    }

    searchInput.addEventListener("input", filterAndRender);
    roleFilter.addEventListener("change", filterAndRender);

    loadCSV();
});
