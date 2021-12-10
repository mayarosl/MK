const Player1 = {
    name: 'YAN',
    hp: 12,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['smile'],
    attack: function(name) {
        console.log('YAN' + ' Fight...');
    }
};

const Player2 = {
    name: 'DASHA',
    hp: 23,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['beauty'],
    attack: function(name) {
        console.log('DASHA' + ' Fight...');
    }
};

function createPlayer(playerClass, player) {
    const $player1 = document.createElement('div');
    $player1.classList.add(playerClass);
    // progressbar
    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $player1.appendChild($progressbar)
    // div.life и div.name
    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = '100%'
    $progressbar.appendChild($life);
    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = player.name;
    $progressbar.appendChild($name);
    // character
    const $character = document.createElement('div');
    $character.classList.add('character');
    $player1.appendChild($character);
    // img
    const $img = document.createElement('img');
    $img.src = player.img;
    $character.appendChild($img);
    // arenas
    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player1);

}

createPlayer('player1', Player1);
createPlayer('player2', Player2);

