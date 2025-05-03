
// Get DOM elements
const statusFilter = document.getElementById('statusFilter');
const eventsContainer = document.getElementById('eventsContainer');
const paginationButtons = document.querySelectorAll('.page-btn');

// Add event listener for status filter
statusFilter.addEventListener('change', function() {
    const selectedFilter = this.value;
    // In a real application, this would fetch filtered events from a server
    fetchEvents(selectedFilter, 1);
});

// Pagination event listeners
paginationButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        paginationButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // In a real application, this would fetch the appropriate page of events
        const page = this.textContent.includes('Next') ? 
            parseInt(document.querySelector('.page-btn.active').textContent) + 1 : 
            parseInt(this.textContent);
        
        fetchEvents(statusFilter.value, page);
    });
});

// Function to fetch events (simulated)
function fetchEvents(status, page) {
    // In a real application, this would be an API call
    console.log(`Fetching ${status} events for page ${page}`);
    
    // For demo purposes, simulate loading with empty state
    eventsContainer.innerHTML = '<div class="empty-state"><p>Loading events...</p></div>';
    
    
    // In a real application, you would replace this with actual data loading
    // and then build the event cards dynamically
}

// Function to create event card (for use when loading real data)
function createEventCard(event) {
    // This would create the HTML structure for an event card
    // based on the event data received from the server
}

// Function to handle event approval
function approveEvent(eventId) {
    // In a real application, this would send an API request to approve the event
    console.log(`Approving event ${eventId}`);
}

// Function to handle event denial
function denyEvent(eventId) {
    // In a real application, this would send an API request to deny the event
    console.log(`Denying event ${eventId}`);
}