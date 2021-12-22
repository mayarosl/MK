import {changeHP, renderHP, elHP} from './hp.js';
import {createElement, compareResults} from './CreateElements.js';
import {generateLogs} from './chat.js';
import { enemyAttack, playerAttack } from './attacks.js';

const player1 = {
    player: 1,
    name: 'YAN',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    changeHP,
    renderHP,
    elHP
};
const player2 = {
    player: 2,
    name: 'DASHA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    changeHP,
    renderHP,
    elHP
};

const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');


/**
 * Функция добавляет игрока в HTML
 * @param {string} player
 * @returns {HTMLElement}
 */
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();

    const player = playerAttack($formFight);
    const enemy = enemyAttack();

    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
        console.log(`${player1.name} ударил на ${player.value}, теперь у ${player2.name}`,  player2.hp, 'единиц здоровья');
    }
    if (player.hit === enemy.defence) {
        generateLogs('defence', player1, player2, 0);
        console.log('удар отражен')
        }
    if (enemy.hit !== player.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
        console.log(`${player2.name} ударил на ${enemy.value}, теперь у ${player1.name}`, player1.hp, 'единиц здоровья');
    }
    if (enemy.hit === player.defence) {
        generateLogs('defence', player2, player1, 0);
        console.log('удар отражен')
    }
    compareResults(player1, player2);
}
);