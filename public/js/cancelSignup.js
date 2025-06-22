

const eventId = new URLSearchParams(window.location.search).get('eventId');
const personId = new URLSearchParams(window.location.search).get('personId');
if (eventId && personId) {
    document.getElementById('cancelSignupButton').addEventListener('click', function() {
        fetch(`/api/email/cancelSignup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ eventId: eventId, personId: personId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message || "Signup cancelled successfully!");
            window.location.href = '/volunteer'; // Redirect to events page
        })
        .catch(err => {
            alert("Error cancelling signup. Please try again.");
            console.error("Cancellation error:", err);
        });
    });
} else {
    console.error("Event ID or Person ID is missing in the URL.");
    alert("Invalid request. Please try again.");
}