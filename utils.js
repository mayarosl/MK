import {ATTACK_DIR, HIT} from './AttackConsts.js';

/**
 * Функция генерирует случайное число в диапазоне 1...num
 * @param {number} num
 * @returns {number}
 */
const getRandom = (num) => {
    return Math.ceil(Math.random() * num);
}

/**
 * Функция генерирует текущее время в формате HH:MM:SS
 * @returns {string}
 */
function gethoursMinSec() {
    const time = new Date();
    return time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + ':' + (time.getSeconds()<10?'0':'') + time.getSeconds();
}

export {getRandom, gethoursMinSec};