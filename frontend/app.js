const apiBase = "http://localhost:5000/api"; // Base URL of the backend API

// Fetch All Leads
document.getElementById("fetchLeads").addEventListener("click", async () => {
    try {
        const response = await fetch(`${apiBase}/leads`);
        if (!response.ok) throw new Error('Failed to fetch leads');
        const leads = await response.json();
        console.log('Leads data:', leads); // Debug the response here
        displayLeads(leads);
    } catch (error) {
        alert("Error fetching leads: " + error.message);
    }
});

function displayLeads(leads) {
    const leadsDiv = document.getElementById("leads");
    leadsDiv.innerHTML = ""; // Clear previous content

    // Access the rows array from the leads object
    const leadsArray = leads.rows;

    // Check if there are leads to display
    if (!leadsArray || leadsArray.length === 0) {
        leadsDiv.innerHTML = "<p>No leads found</p>";
        return;
    }

    // Iterate over the leads array and create elements
    leadsArray.forEach(lead => {
        const leadElement = document.createElement("div");
        leadElement.innerHTML = `
            <strong>${lead.name}</strong> (${lead.status})<br>
            Address: ${lead.address}<br>
            Contact: ${lead.contact_number || 'N/A'}<br>
            Assigned KAM: ${lead.assignedKAM || 'Not Assigned'}<br>
            <hr>
        `;
        leadsDiv.appendChild(leadElement);
    });
}


// Add New Lead
document.getElementById("leadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const lead = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        contact_number: document.getElementById("contactNumber").value,
        status: document.getElementById("status").value,
        assigned_kam: document.getElementById("assignedKAM").value || null,
    };

    console.log("Lead to submit:", lead);

    try {
        const response = await fetch(`${apiBase}/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead),
        });

        if (response.ok) {
            alert("Lead added successfully!");
            document.getElementById("leadForm").reset();
        } else {
            const error = await response.json();
            alert("Error adding lead: " + error.message);
        }
    } catch (error) {
        alert("Error adding lead: " + error.message);
    }
});


document.getElementById("logInteractionForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const interactionData = {
        date: document.getElementById("interactionDate").value,
        type: document.getElementById("interactionType").value,
        notes: document.getElementById("interactionNotes").value,
        followUpRequired: document.getElementById("followUpRequired").checked,
        restaurantId: 1,  // Example restaurant ID
    };

    try {
        const response = await fetch(`${apiBase}/interactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(interactionData),
        });

        if (response.ok) {
            alert('Interaction logged successfully!');
        } else {
            throw new Error('Failed to log interaction');
        }
    } catch (error) {
        alert("Error logging interaction: " + error.message);
    }
});

// Fetch Today's Interactions
// Fetch Today's Interactions
document.getElementById("fetchInteractions").addEventListener("click", async () => {
    try {
        const response = await fetch(`${apiBase}/interactions/today`);
        if (!response.ok) throw new Error('Failed to fetch interactions');
        const interactions = await response.json();

        // If the API returns an object with a "rows" property, use that
        displayInteractions(interactions.rows ? interactions.rows : interactions);  
    } catch (error) {
        alert("Error fetching interactions: " + error.message);
    }
});

function displayInteractions(interactions) {
    const interactionsDiv = document.getElementById("interactions");
    interactionsDiv.innerHTML = ""; // Clear previous content
    interactions.forEach(interaction => {
        const interactionElement = document.createElement("div");
        interactionElement.innerHTML = `
            <strong>Date:</strong> ${interaction.date}<br>
            <strong>Type:</strong> ${interaction.type}<br>
            <strong>Notes:</strong> ${interaction.notes}<br>
            <strong>Follow-Up Required:</strong> ${interaction.followUpRequired ? "Yes" : "No"}<br>
            <hr>
        `;
        interactionsDiv.appendChild(interactionElement);
    });
}
