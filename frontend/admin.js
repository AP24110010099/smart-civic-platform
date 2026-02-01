document.addEventListener("DOMContentLoaded", loadIssues);

async function loadIssues() {
    const tableBody = document.getElementById("issueTable");

    // Safety check
    if (!tableBody) {
        console.error("issueTable not found in HTML");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/issues");
        const issues = await response.json();

        tableBody.innerHTML = "";

        issues.forEach(issue => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${issue.title || issue.type.toUpperCase() + " Issue"}</td>
                <td>${issue.type}</td>
                <td>${issue.location}</td>
                <td>${issue.status}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading issues:", error);
    }
}
