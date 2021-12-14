<<<<<<< Updated upstream
const Player1 = {
    name: 'YAN',
    hp: 12,
=======
const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'YAN',
    hp: 100,
>>>>>>> Stashed changes
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['smile'],
    changeHP: changeHP,
    renderHP: renderHP,
    elHP: elHP,
    attack: function(name) {
        console.log('YAN' + ' Fight...');
    }
};

const Player2 = {
    name: 'DASHA',
    hp: 83,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['beauty'],
    changeHP: changeHP,
    renderHP: renderHP,
    elHP: elHP,
    attack: function(name) {
        console.log('DASHA' + ' Fight...');
    }
};

function createPlayer(playerClass, player) {
    const $arenas = document.querySelector('.arenas');

    const $player1 = document.createElement('div');
    $player1.classList.add(playerClass);
    $arenas.appendChild($player1);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');
    $player1.appendChild($progressbar)

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = player.hp + '%';
    $progressbar.appendChild($life);
<<<<<<< Updated upstream
=======
    $progressbar.appendChild($name);

    $character.appendChild($img);

    return $player;
}

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

function elHP () {
    return document.querySelector('.player'+ this.player + ' .life');
}

function renderHP (playerLife) {
    const $playerLife = playerLife;
    return $playerLife.style.width = this.hp + '%';
}

function changeHP(n) {
    this.hp -= n;
    console.log(this.name + ': ' + this.hp);

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

function showResultText(name) {
    const $wonTitle = createElement('div', 'wonTitle');
    if (name) {
        $wonTitle.innerText = name + ' won';
    } else {
        $wonTitle.innerText = 'draw';
    }
>>>>>>> Stashed changes

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = player.name;
    $progressbar.appendChild($name);

<<<<<<< Updated upstream
    const $character = document.createElement('div');
    $character.classList.add('character');
    $player1.appendChild($character);

    const $img = document.createElement('img');
    $img.src = player.img;
    $character.appendChild($img);
}

createPlayer('player1', Player1);
createPlayer('player2', Player2);
=======
function createReloadButton () {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';
    $reloadWrap.appendChild($reloadButton);

    return $reloadWrap;
}

$randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20));
    player2.changeHP(getRandom(20));
    player1.renderHP(player1.elHP());
    player2.renderHP(player2.elHP());

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        const $reloadButton = createReloadButton();
        $arenas.appendChild($reloadButton);

        $reloadButton.addEventListener('click', function (){
            window.location.reload();
        })
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(showResultText(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(showResultText(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(showResultText());
    }
})
>>>>>>> Stashed changes

