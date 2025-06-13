const params = new URLSearchParams(window.location.search);
console.log(params);
const eventId = params.get('eventId');

// const infoContainer = document.querySelector('.info-container');
// infoContainer.innerHTML = eventId;
const curEvent = fetch(`${window.location.origin}/api/events/${eventId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(event => {
        const dropdown = document.querySelector('select');
        for (const team of event.teams) {
            const option = document.createElement('option');
            option.value = team._id; // Assuming each team has a unique _id
            option.textContent = team.name; // Assuming each team has a teamName
            if (team.people.length >= team.size) {
                option.disabled = true;
            }
            option.textContent += ` (${team.people.length}/${team.size})`; // Show current team size
            dropdown.appendChild(option);

        }
    })
    .catch(error => {
        console.error('Error fetching event data:', error);
        alert("Error fetching event data. Please try again.");
    });



const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData(this);
    const personData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        teamId: formData.get("team")
    };
    console.log("Submitting event data:", personData)
    fetch(`${window.location.origin}/api/signup?eventId=${eventId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        alert(data.message || "Person submitted successfully!");
        window.location.href = 'volunteer.html';
    })
    .catch(err => {
        alert("Error signing up. Please try again.");
        console.error("Submission error:", err);
    });
});

