
const input = document.querySelector('input');
const btn = document.querySelector('button');
const gameCard = document.querySelector('.card');
const container = document.querySelector('.container');

input.focus();
btn.addEventListener('click', getGame);

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7be95db53emsh9d637b8c6335d1dp130721jsndb1ccb04fd4e',
        'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
    }
}

// Get array of all game objects
async function getGameList() {
    const response = await fetch('https://mmo-games.p.rapidapi.com/games', options);
    const list = await response.json();

    return list;
}

// Get game by Id
async function getGame() {
    const searchTerm = input.value.toLowerCase();
    const list = await getGameList().catch(alert);
    console.log(list);
    for (let game of list) {
        if (game.title.toLowerCase() === searchTerm) {
            const gameId = game.id;
            try {
                const response = await fetch(`https://mmo-games.p.rapidapi.com/game?id=${gameId}`, options);
                const data = await response.json();
                console.log(data);
                displayCard(data.title, data.genre, data.platform, data.thumbnail, data.short_description);
                input.value = '';
                input.focus();
                return;

            } catch (err) {

                console.log(err);
            }
        }

    } alert('game not found');

}


function displayCard(title, gen, plat, thumbnail, des) {

    // create card elements
    const div = document.createElement('div');
    const heading = document.createElement('h2');
    const genre = document.createElement('p');
    const platform = document.createElement('p');
    const img = document.createElement('img');
    const description = document.createElement('p');

    // update content
    heading.textContent = title;
    genre.textContent = `Genre: ${gen}`;
    platform.textContent = `Platform: ${plat}`;
    img.src = thumbnail;
    description.textContent = des;

    // add classes for styling
    div.classList.add('card');
    heading.classList.add('title');
    genre.classList.add('genre');
    platform.classList.add('platform');
    description.classList.add('description');

    // append elements
    div.append(heading, genre, platform, img, description);
    container.appendChild(div);
}
