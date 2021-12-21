import {ATTACK_DIR, HIT} from './AttackConsts.js';
import {getRandom} from './utils.js';

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

export {enemyAttack, playerAttack};