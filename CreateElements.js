import {generateLogs} from './chat.js';
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

const $arenas = document.querySelector('.arenas');
function createReloadButton () {
    const $reloadButtonDiv = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Reload';

    // прямо в этой функции мы создаем событие кнопки
    // ведь когда эта функция позовется, тогда и создастся элемнент, и мы создадим ему слушателя
    $reloadButton.addEventListener('click', function (){
        window.location.reload();
    });

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
    // return $reloadButtonDiv;
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
function compareResults(player1, player2) {
    const {name: name1, hp: hp1} = player1;
    const {name: name2, hp: hp2} = player2;

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

export {createElement, createReloadButton, showResultText, compareResults};