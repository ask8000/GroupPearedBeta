// console.log('admin.js loaded');
// // Get DOM elements
// const statusFilter = document.getElementById('statusFilter');
// const eventsContainer = document.getElementById('eventsContainer');
// const paginationButtons = document.querySelectorAll('.page-btn');
// const emptyStateMessage = document.querySelector('.empty-state');
// // Add event listener for status filter
// fetchEvents(statusFilter.value, 1); // Initial fetch on page load
// statusFilter.addEventListener('change', function() {
//     const selectedFilter = this.value;
//     // In a real application, this would fetch filtered events from a server
//     fetchEvents(selectedFilter, 1);
// });

// // Pagination event listeners
// paginationButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Remove active class from all buttons
//         paginationButtons.forEach(btn => btn.classList.remove('active'));
//         // Add active class to clicked button
//         this.classList.add('active');
        
//         // In a real application, this would fetch the appropriate page of events
//         const page = this.textContent.includes('Next') ? 
//             parseInt(document.querySelector('.page-btn.active').textContent) + 1 : 
//             parseInt(this.textContent);
        
//         fetchEvents(statusFilter.value, page);
//     });
// });
// function createEventCard(event) {
//     // Create a card element for the event
//     const card = document.createElement('div');
//     card.classList.add('event-card');
    
//     // Populate the card with event details
//     card.innerHTML = `
//         <h3>${event.eventName}</h3>
//         <p>${event.eventAdress}</p>
//         <p>Status: ${event.status}</p>
//     `; // TODO: Approve/deny buttons and also is there a better way to handle this? - Nathan

//     return card;
// }

// // Function to fetch events (real)
// async function fetchEvents(status, page) {
//     console.log(`Fetching ${status} events for page ${page}`);
//     // test credentials for debugging
//     let valid = false;
//     // try {
//     //     const response = await fetch(`http://localhost:3000/api/checkLogin`, { credentials: 'include' });
//     //     if (response.ok) {
//     //         const data = await response.json();
//     //         valid = data.loggedIn; // Check if the user is logged in

//     //     } else {
//     //         throw new Error('Not logged in or session expired');
//     //     }
//     // } catch (error) {
//     //     console.error('Error checking session:', error);
//     //     // Redirect to login page or show an error message
//     //     window.location.href = 'adminLogin.html';
//     // }
//     // // Fetch events from the server using the backend API with status filtering
//     // if (!valid) {
//     //     return; // Prevent fetching if not logged in
//     // }
//     // TODO: make this work lololol
//     fetch(`${window.location.origin}/api/grabit?status=${status}&page=${page}`)
//         .then(response => response.json())
//         .then(data => {
//             // Clear the events container
//             eventsContainer.innerHTML = ''; // Clear previous events
            
//             // Iterate through the events and create event cards
//             data.events.forEach(event => {
//                 const eventCard = createEventCard(event); // Assuming createEventCard returns an HTML element
//                 eventsContainer.appendChild(eventCard);
//             });
            
//             if (data.events.length === 0) {
//                 emptyStateMessage.style.display = 'block'; 
//             } else {
//                 emptyStateMessage.style.display = 'none'; 
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching events:', error);
//         });
// }


// // Function to handle event approval
// function approveEvent(eventId) {
//     // In a real application, this would send an API request to approve the event
//     console.log(`Approving event ${eventId}`);
// }

// // Function to handle event denial
// function denyEvent(eventId) {
//     // In a real application, this would send an API request to deny the event
//     console.log(`Denying event ${eventId}`);
// }
// === betterAdmin.js ===
console.log('Modern admin.js loaded');


const statusFilter = document.getElementById('statusFilter');
const eventsContainer = document.getElementById('eventsContainer');
const paginationButtons = document.querySelectorAll('.page-btn');
const emptyStateMessage = document.getElementById('emptyState');


window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});


fetchEvents(statusFilter.value, 1);


statusFilter.addEventListener('change', function () {
    fetchEvents(this.value, 1);
});


paginationButtons.forEach(button => {
    button.addEventListener('click', function () {
        paginationButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const page = this.textContent.includes('Next')
            ? parseInt(document.querySelector('.page-btn.active').textContent) + 1
            : parseInt(this.textContent);
        fetchEvents(statusFilter.value, page);
    });
});


function createEventCard(event) {
    const card = document.createElement('div');
    card.classList.add('event-card');
    const statusClass = `status-${event.status.toLowerCase()}`;


    card.innerHTML = `
        <div class="event-header">
            <h3 class="event-title">${event.eventName}</h3>
            <div class="event-status ${statusClass}">${event.status}</div>
        </div>
        <div class="event-info">
            <div class="event-details">
                <h4>Event Details</h4>
                <p><strong>Location:</strong> ${event.eventAddress || 'Not specified'}</p>
                <p><strong>Date:</strong> ${event.eventDate || 'TBD'}</p>
            </div>
            <div class="event-details">
                <h4>Organization</h4>
                <p><strong>Host:</strong> ${event.organizationName || 'Not specified'}</p>
                <p><strong>Contact:</strong> ${event.contactEmail || 'Not provided'}</p>
            </div>
        </div>
        <div class="action-buttons">
            <button class="btn btn-view" onclick="viewEvent('${event.id}')">View Details</button>
            ${event.status.toLowerCase() === 'pending'
            ? `<button class="btn btn-approve" onclick="approveEvent('${event.id}')">Approve</button>
               <button class="btn btn-deny" onclick="denyEvent('${event.id}')">Deny</button>`
            : event.status.toLowerCase() === 'approved'
                ? `<button class="btn btn-deny" onclick="revokeEvent('${event.id}')">Revoke</button>`
                : ''}
        </div>
    `;


    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);


    return card;
}


async function fetchEvents(status, page) {
    console.log(`Fetching ${status} events for page ${page}`);
    eventsContainer.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">Loading events...</div>';


    try {
        const mockData = {
            events: status === 'all' ? [
                { id: '1', eventName: 'Community Garden Cleanup', eventAddress: 'Central Park', status: 'Pending' },
                { id: '2', eventName: 'Food Bank Distribution', eventAddress: 'Downtown Center', status: 'Approved' }
            ] : status === 'pending' ? [
                { id: '1', eventName: 'Community Garden Cleanup', eventAddress: 'Central Park', status: 'Pending' }
            ] : status === 'approved' ? [
                { id: '2', eventName: 'Food Bank Distribution', eventAddress: 'Downtown Center', status: 'Approved' }
            ] : []
        };


        eventsContainer.innerHTML = '';
        if (mockData.events.length > 0) {
            mockData.events.forEach((event, index) => {
                setTimeout(() => {
                    const card = createEventCard(event);
                    eventsContainer.appendChild(card);
                }, index * 100);
            });
            emptyStateMessage.style.display = 'none';
        } else {
            emptyStateMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching events:', error);
        eventsContainer.innerHTML = '<div style="text-align: center; padding: 2rem; color: #e74c3c;">Error loading events. Please try again.</div>';
    }
}


function approveEvent(eventId) {
    console.log(`Approving event ${eventId}`);
    const button = event.target;
    button.textContent = 'Approving...';
    button.disabled = true;
    setTimeout(() => {
        button.textContent = '✓ Approved';
        button.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        setTimeout(() => fetchEvents(statusFilter.value, 1), 1000);
    }, 1000);
}


function denyEvent(eventId) {
    console.log(`Denying event ${eventId}`);
    const button = event.target;
    button.textContent = 'Denying...';
    button.disabled = true;
    setTimeout(() => {
        button.textContent = '✗ Denied';
        button.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        setTimeout(() => fetchEvents(statusFilter.value, 1), 1000);
    }, 1000);
}


function revokeEvent(eventId) {
    console.log(`Revoking event ${eventId}`);
    const button = event.target;
    button.textContent = 'Revoking...';
    button.disabled = true;
    setTimeout(() => fetchEvents(statusFilter.value, 1), 1000);
}


function viewEvent(eventId) {
    alert(`Viewing details for event ${eventId}`);
}


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => e.target.style.transform = '', 150);
    }
});


function animateOnScroll() {
    const elements = document.querySelectorAll('.event-card');
    elements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}


window.addEventListener('scroll', animateOnScroll);
window.add









