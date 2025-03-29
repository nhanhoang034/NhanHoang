let memberData = [];

document.getElementById("csvFileInput").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        processCSV(text);
    };
    reader.readAsText(file);
});

function processCSV(csvText) {
    const rows = csvText.split("\n").map(row => row.split(","));
    memberData = rows.slice(1).map(row => ({
        name: row[0]?.trim(),
        id: row[1]?.trim(),
        role: row[2]?.trim()
    }));
    displayMembers(memberData);
}

function displayMembers(members) {
    const tableBody = document.getElementById("memberTable");
    tableBody.innerHTML = ""; // Xóa dữ liệu cũ
    members.forEach(member => {
        const row = `<tr>
            <td>${member.name}</td>
            <td>${member.id}</td>
            <td>${member.role}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function searchTable() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.getElementById("memberTable").getElementsByTagName("tr");
    for (let row of rows) {
        let text = row.textContent.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    }
}
