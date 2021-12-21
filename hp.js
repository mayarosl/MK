/**
 * Функция уменьшает HP игрока на величину damage
 * @param {number} damage
 */
function changeHP(damage) {
    this.hp -= damage;

    if (this.hp < 0) {
        this.hp = 0;
    }
}

/**
 * Функция отрисовывает жизнь игрока
 * @returns {string}
 */
function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

/**
 * Функция возвращает элемент
 * @returns {Element}
 */
function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}

export {changeHP, renderHP, elHP};