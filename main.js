const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'YAN',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['smile'],
    changeHP: changeHP,
    renderHP: renderHP,
    elHP: elHP,
    attack: attack
};

const player2 = {
    player: 2,
    name: 'DASHA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['beauty'],
    changeHP: changeHP,
    renderHP: renderHP,
    elHP: elHP,
    attack: attack
};

function elHP() {
    return document.querySelector('.player'+ this.player + ' .life');
}

function renderHP() {
    return this.elHP().style.width = this.hp + '%';
}

function changeHP(damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}
function attack() {
    console.log(this.name + ' Fight...');
}

function createElement(el, className) {
    const $el = document.createElement(el);

    if (className) {
        $el.classList.add(className);
    }

    return $el;
}

function createPlayer(player) {
    const $player = createElement('div', 'player'+player.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($img);
    $player.appendChild($progressbar)
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $img.src = player.img;
    $name.innerText = player.name;
    $life.style.width = player.hp + '%';

    return $player;
}

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

function showResultText(name) {
    const $wonTitle = createElement('div', 'wonTitle');

    if (name) {
        $wonTitle.innerText = name + ' wins';
    } else {
        $wonTitle.innerText = 'Draw';
    }

    return $wonTitle;
}

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
    player1.renderHP();
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        const $reloadButton = createReloadButton();

        $reloadButton.addEventListener('click', function (){
            window.location.reload();
        });

        $arenas.appendChild($reloadButton);
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(showResultText(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(showResultText(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(showResultText());
    }
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

