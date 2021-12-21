import {LOGS} from './logs.js';
import {getRandom, gethoursMinSec} from './utils.js';

const $chat = document.querySelector('.chat');

/**
 * Функция рисует лог боя
 * @param type
 * @param player1
 * @param player2
 * @param value
 */
function generateLogs(type, player1, player2, value) {
    const {name: name1} = player1;
    const {name: name2, hp: hp2} = player2;

    const hoursMinSec = gethoursMinSec()
    const text = LOGS[type][getRandom(LOGS[type].length-1)]
        .replace('[time]', hoursMinSec)
        .replace('[player1]', name1)
        .replace('[player2]', name2)
        .replace('[playerWins]', name1)
        .replace('[playerLose]', name2)
        .replace('[playerKick]', name1)
        .replace('[playerDefence]', name2);
    switch (type) {
        case 'start':
            const elStart = `<p>${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', elStart);
            break;
        case 'end':
            const elEnd = `<p>${hoursMinSec} ${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', elEnd);
            break;
        case 'hit':
            const elHit = `<p>${hoursMinSec} ${text} [-${value}] ${name2} HP: ${hp2}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', elHit);
            break;
        case 'defence':
            const elDefence = `<p>${hoursMinSec} ${text} [-${value}] ${name2} HP: ${hp2}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', elDefence);
            break;
        case 'draw':
            const elDraw = `<p>${hoursMinSec} ${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin', elDraw);
            break;
        default:
            break;
    }
}

export {generateLogs};