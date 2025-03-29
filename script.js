async function loadCSV() {
    try {
        const response = await fetch('data.csv');
        if (!response.ok) throw new Error("Không tìm thấy file CSV!");
        const data = await response.text();
        console.log("Dữ liệu CSV nhận được:", data);
        processCSV(data);
    } catch (error) {
        console.error("Lỗi tải file CSV:", error);
    }
}

function processCSV(data) {
    const rows = data.split('\n').map(row => row.split(';')); // Chuyển dấu ; thành ,
    const tableBody = document.getElementById('memberTable');
    tableBody.innerHTML = ""; // Xóa dữ liệu cũ nếu có
    
    for (let i = 1; i < rows.length; i++) {
        if (rows[i].length < 3) continue;
        let row = document.createElement('tr');
        rows[i].forEach(cell => {
            let td = document.createElement('td');
            td.textContent = cell.trim();
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    }
}

function searchTable() {
    let input = document.getElementById('search').value.toLowerCase();
    let rows = document.getElementById('memberTable').getElementsByTagName('tr');
    for (let row of rows) {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(input) ? '' : 'none';
    }
}

loadCSV();