const params = new URLSearchParams(window.location.search);

const eventId = params.get('eventId');


fetch(`${window.location.origin}/api/events/${eventId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Event data:', data);
        document.querySelector('#eventName').innerHTML = data.eventName;
        document.querySelector('#eventDescription').innerHTML = data.eventDescription;
        document.querySelector('#eventDate').innerHTML = data.eventDate;
        document.querySelector('#eventLocation').innerHTML = data.eventAdress;
        document.querySelector('#organizerName').innerHTML = data.OrganizationName;
        document.querySelector('#organizerEmail').innerHTML = data.organizerEmail;

        // Teams
        for (const list of data.teams) {
            const name = list.name;
            const size = list.size;
            const teamDiv = document.createElement('div');
            const nameDiv = document.createElement('div');
            const descDiv = document.createElement('div');
            nameDiv.innerHTML = `<h2>${name}</h2>Capacity: ${size}`;
            nameDiv.className = 'teamName';
            descDiv.innerHTML = `<p>${list.description}</p>`;
            descDiv.className = 'teamDesc';
            document.querySelector('.peopleContainer').appendChild(teamDiv);
            teamDiv.appendChild(nameDiv);
            teamDiv.appendChild(descDiv);
            teamDiv.className = 'team';
            for (const person of list.people) {
                const personDiv = document.createElement('div');
                personDiv.className = 'person';
                personDiv.innerHTML = `${person.firstName} ${person.lastName}`
                teamDiv.appendChild(personDiv);
            }
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });