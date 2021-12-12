const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'SASHA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['smile'],
    attack: function(name) {
        console.log(name + ' ' + 'Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'DASHA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['beauty'],
    attack: function(name) {
        console.log(name + ' ' + 'Fight...');
    }
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    // условие: создаем класс, только если мы его передали
    // undefined при приведении к логическому типу вернет нам false
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(playerObj) {
    const $player = createElement('div', 'player'+playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $character.appendChild($img);

    return $player;
}

// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    const $randomNumber = Math.floor(Math.random() * 20);

    if (player.hp > 0) {
        player.hp -= $randomNumber;
    } else {
        player.hp = 0;
    }

    $playerLife.style.width = player.hp + '%';
    console.log(player.hp + '%');

    const playerFirst = player1;
    const playerSecond = player2;

    if (playerFirst.hp <= 0 && playerSecond.hp > 0) {
        $arenas.appendChild(playerWon(playerSecond.name));
        $randomButton.disabled = true;
    }
    if (playerFirst.hp > 0 && playerSecond.hp <= 0) {
        $arenas.appendChild(playerWon(playerFirst.name));
        $randomButton.disabled = true;
    }
    if (playerFirst.hp <= 0 && playerSecond.hp <= 0) {
        $arenas.appendChild(draft());
        $randomButton.disabled = true;
    }
}

function playerWon(name) {
    const $wonTitle = createElement('div', 'wonTitle');
    $wonTitle.innerText = name + ' won';

    return $wonTitle;
}

function draft () {
    const $draftTitle = createElement('div', 'draftTitle');
    $draftTitle.innerText = 'DRAFT';

    return $draftTitle;
}

$randomButton.addEventListener('click', function () {
    console.log('###: Click Random Button');
    changeHP(player1);
    changeHP(player2);
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
