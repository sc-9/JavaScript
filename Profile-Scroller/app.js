const data = [
    {
        name: 'John Doe',
        age: 32,
        gender: 'male',
        lookingfor: 'female',
        location: 'Boston MA',
        image: 'https://randomuser.me/api/portraits/men/20.jpg'
    },
    {
        name: 'Todd Chavaz',
        age: 24,
        gender: 'male',
        lookingfor: 'female',
        location: 'Chicago IL',
        image: 'https://randomuser.me/api/portraits/men/47.jpg'
    },
    {
        name: 'Jennifer William',
        age: 25,
        gender: 'female',
        lookingfor: 'male',
        location: 'San Jose CA',
        image: 'https://randomuser.me/api/portraits/women/79.jpg'
    }
];

const profiles = profileIterator(data);

//call first profile
nextProfile();


//Next Event
document.getElementById('next').addEventListener('click', nextProfile);

//Next Profile display
function nextProfile() {
    const currentProfile = profiles.next().value;
if(currentProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
        <ul class="list-group>
            <li class="list-group-item">Name: ${currentProfile.name}</li>
            <li class="list-group-item">Age: ${currentProfile.age}</li>
            <li class="list-group-item">Gender: ${currentProfile.gender}</li>
            <li class="list-group-item">Looking For: ${currentProfile.lookingfor}</li>
            <li class="list-group-item">Location: ${currentProfile.location}</li>
        </ul>
    `;
    
    document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}">`
    } else {
        //No more profiles
        window.location.reload();
    }
}

//Profile Iterator
function profileIterator(profiles) {
    let nextIndex = 0;
    return {
        next: function() {
            return nextIndex < profiles.length ? {value: profiles[nextIndex++], done: false} 
            : {done: true}
        }
    }
}