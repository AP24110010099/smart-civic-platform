const form = document.getElementById("issueForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const issueData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    location: document.getElementById("location").value,
    type: document.getElementById("type").value,
    status: "pending"
  };

  try {
    const response = await fetch("http://localhost:5000/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(issueData)
    });

    if (response.ok) {
      message.innerText = "Issue reported successfully!";
      form.reset();
    } else {
      message.innerText = "Failed to report issue";
    }
  } catch (error) {
    message.innerText = "Server error";
  }
});

async function loadIssues() {
  const table = document.getElementById("issueTable");
  if (!table) return;

  try {
    const response = await fetch("http://localhost:5000/api/issues");
    const issues = await response.json();

    table.innerHTML = "";

    issues.forEach(issue => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${issue.title}</td>
        <td>${issue.type}</td>
        <td>${issue.location}</td>
        <td>${issue.status}</td>
      `;

      table.appendChild(row);
    });

  } catch (error) {
    console.error("Error loading issues");
  }
}

loadIssues();
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");

  if (submitBtn) {
    submitBtn.addEventListener("click", submitIssue);
  }
});

async function submitIssue() {
  const title = document.getElementById("title")?.value;
  const description = document.getElementById("description")?.value;
  const location = document.getElementById("location")?.value;
  const type = document.getElementById("type")?.value;

  if (!title || !description || !location || !type) {
    alert("⚠️ Please fill all fields");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        location,
        type,
        status: "pending",
      }),
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    alert("✅ Complaint submitted successfully!");

    // Clear form
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";
    document.getElementById("type").value = "";
  } catch (error) {
    console.error(error);
    alert("❌ Server error. Please try again.");
  }
}


