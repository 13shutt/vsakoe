const data = [
  {
    name: 'Alicia Keys',
    age: 26,
    from: 'Zalupivka',
    image: 'https://randomuser.me/api/portraits/women/82.jpg'
  },
  {
    name: 'Vanda Lupski',
    age: 19,
    from: 'Muhosransk',
    image: 'https://randomuser.me/api/portraits/women/22.jpg'
  },
  {
    name: 'Aelita',
    age: 25,
    from: 'Mars',
    image: 'https://randomuser.me/api/portraits/women/13.jpg'
  }
];

const profiles = profileIterator(data);

getNextProfile();

document.getElementById('next').addEventListener('click', getNextProfile)

function getNextProfile() {
  const currentProfile = profiles.next().value;
  if(currentProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">From: ${currentProfile.from}</li>
      </ul>
    `
    document.getElementById('logoDisplay').innerHTML = `
      <img src="${currentProfile.image}">
    `
  } else {
    window.location.reload();
  }
}

function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length ?
      { value: profiles[nextIndex++], done: false } :
      { done: true }
    }
  }
}