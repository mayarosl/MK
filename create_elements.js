import {LOGS} from './logs.js';
import {getRandom, gethoursMinSec} from './utils.js';
import {ATTACK_DIR, HIT} from './AttackConsts.js';
import {Player} from './player_class.js';

const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');
const $formFight = document.querySelector('.control');

const player1 = new Player({
    player: 1,
    name: 'Yan',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
});
const player2 = new Player({
    player: 2,
    name: 'Dasha',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
});

/**
 * Функция создает кнопку перезагрузки игры
 */
function createReloadButton () {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Reload';
    $reloadButton.addEventListener('click', function (){
        window.location.reload();
    });
    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}

/**
 * Функция создает HTML элемент
 * @param {string} el
 * @param {string} className
 * @returns {HTMLElement}
 */
function createElement(el, className) {
    const $el = document.createElement(el);

    if (className) {
        $el.classList.add(className);
    }

    return $el;
}

/**
 * Функция генерирует удар противника
 * @returns {{hit: string, defence: string, value: number}}
 */
function enemyAttack() {
    const hit = ATTACK_DIR[getRandom(ATTACK_DIR.length) - 1];
    const defence = ATTACK_DIR[getRandom(ATTACK_DIR.length) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

/**
 * Функция обрабатывает комбинации удара и защиты из формы
 * @param {Element} formFight
 * @returns {{hit: string, defence: string, value: number}}
 */
function playerAttack(formFight) {
    const attack = {
        value: 0,
        hit: '',
        defence: '',
    };

    if (formFight) {
        for (let item of formFight) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
            item.checked = false;
        }
    }
    return attack;
}

/**
 * Функция создает игрока
 * @param player
 * @param hp
 * @param name
 * @param img
 * @returns {HTMLElement}
 */
function createPlayer({player, hp, name, img}) {
    const $player = createElement('div', `player${player}`);
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

    $img.src = img;
    $name.innerText = name;
    $life.style.width = hp + '%';

    return $player;
}

function makeMove () {

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
}

/**
 * Функция возвращает div с именем победителя
 * @param {string} name
 * @returns {HTMLElement}
 */
function showResultText(name) {
    const $loseTitle = createElement('div', 'loseTitle');

    if (name) {
        $loseTitle.innerText = name + ' wins';
    } else {
        $loseTitle.innerText = 'Draw';
    }

    return $loseTitle;
}

/**
 * Функция выводит победителя, ничего не возвращает, нет слова return, она просто рисует результаты
 * @param player1
 * @param player2
 */
function compareResults({name: name1, hp: hp1} = {}, {name: name2, hp: hp2} = {}) {
    // const {name: name1, hp: hp1} = player1;
    // const {name: name2, hp: hp2} = player2;

    if (hp1 === 0 || hp2 === 0) {
        createReloadButton();
    }

    if (hp1 === 0 && hp1 < hp2) {
        $arenas.appendChild(showResultText(name2));
        generateLogs('end', player2, player1);
    } else if (hp2 === 0 && hp2 < hp1) {
        $arenas.appendChild(showResultText(name1));
        generateLogs('end', player1, player2);
    } else if (hp1 === 0 && hp2 === 0) {
        $arenas.appendChild(showResultText());
        generateLogs('draw', player1, player2);
    }
}

/**
 * Функция создает текст для поля с логами игры
 * @param type
 * @param name1
 * @param name2
 * @returns {*}
 */
function getTextLog (type, name1, name2) {
    const hoursMinSec = gethoursMinSec();
    const text = LOGS[type][getRandom(LOGS[type].length-1)]
        .replace('[time]', hoursMinSec)
        .replace('[player1]', name1)
        .replace('[player2]', name2)
        .replace('[playerWins]', name1)
        .replace('[playerLose]', name2)
        .replace('[playerKick]', name1)
        .replace('[playerDefence]', name2);
    return text;
}

/**
 * Функция рисует лог боя
 * @param type
 * @param player1
 * @param player2
 * @param value
 */
function generateLogs(type, {name: name1} = {}, {name: name2, hp: hp2} = {}, value) {
    const hoursMinSec = gethoursMinSec();
    let text = getTextLog(type, name1, name2);

    switch (type) {
        case 'hit':
            text = `${hoursMinSec} ${text} -${value} [${name2} HP: ${hp2}/100]`;
            break;
        case 'end':
        case 'defence':
        case 'draw':
            text = `${hoursMinSec} ${text}`;
            break;
        default:
            break;
    }

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

export {createElement, createPlayer, createReloadButton, showResultText, compareResults, generateLogs, makeMove};