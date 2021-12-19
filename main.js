const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
// const $submitButton = document.querySelector('.button');
const $chat = document.querySelector('.chat');

/**
 * объект, который содержит три ключа и числа для генерации случайного удара
 * @type {{head: number, body: number, foot: number}}
 */
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

/**
 * массив, который понадобится для генерации удара со стороны противника
 * @type {string[]}
 */
const ATTACK = ['head', 'body', 'foot'];

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

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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

/**
 * Функция возвращает элемент
 * @returns {Element}
 */
function elHP() {
    return document.querySelector('.player'+ this.player + ' .life');
}

/**
 * Функция отрисовывает жизнь игрока
 * @returns {string}
 */
function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

/**
 * Функция уменьшает HP игрока на величину damage
 * @param {number} damage
 */
function changeHP(damage) {
    this.hp -= damage;

    if (this.hp <= 0) {
        this.hp = 0;
    }
}

/**
 * Функция генерирует случайное число в диапазоне 1...num
 * @param {number} num
 * @returns {number}
 */
function getRandom(num) {
    return Math.ceil(Math.random() * num);
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
 * Функция генерирует удар противника
 * @returns {{hit: string, defence: string, value: number}}
 */
function enemyAttack() {
    const length = ATTACK.length;
    // выбираем часть тела для атаки и защиты, getRandom нужен, чтобы компьютер сам решал, куда он бьет
    const hit = ATTACK[getRandom(length) - 1];
    const defence = ATTACK[getRandom(length) - 1];
    // возвращаем объект: силу удара компьютера в зависимости от места удара, куда удар, что защищено
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
 * Функция выводит победителя, ничего не возвращает, нет слова return, она просто рисует результаты
 * @param player1
 * @param player2
 */
function compareResults(player1, player2) {
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(showResultText(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(showResultText(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(showResultText());
        generateLogs('draw', player1, player2);
    }
}

/**
 * Функция рисует лог боя
 * @param type
 * @param player1
 * @param player2
 * @param value
 */
function generateLogs(type, player1, player2, value) {
    const time = new Date();
    const hoursMinSec = time.getHours() + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + ':' + (time.getSeconds()<10?'0':'') + time.getSeconds();

    switch (type) {
        case 'start':
            const textStart = logs[type].replace('[time]', hoursMinSec).replace('[player1]', player1.name).replace('[player2]', player2.name);
            const elStart = `<p>${textStart}</p>`;
            $chat.insertAdjacentHTML('afterbegin', elStart);
            break;
        case 'end':
            const textEnd = logs[type][getRandom(logs[type].length-1)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            const elEnd = `<p>${hoursMinSec} ${textEnd}</p>`;
            $chat.insertAdjacentHTML('afterbegin', elEnd);
            break;
        case 'hit':
            const textHit = logs[type][getRandom(logs[type].length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            const elHit = `<p>${hoursMinSec} ${textHit} ${value} ${player1.hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', elHit);
            break;
        case 'defence':
            const textDefence = logs[type][getRandom(logs[type].length-1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            const elDefence = `<p>${hoursMinSec} ${textDefence} ${value} ${player1.hp}/100</p>`;
            $chat.insertAdjacentHTML('afterbegin', elDefence);
            break;
        case 'draw':
            const textDraw = logs[type];
            const elDraw = `<p>${hoursMinSec} ${textDraw}</p>`;
            $chat.insertAdjacentHTML('afterbegin', elDraw);
            break;
        default:
            break;
    }
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();

    const player = playerAttack($formFight);
    const enemy = enemyAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player1, player2, enemy.value);
        }
    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('defence', player2, player1, player.value);
        }

    console.log(player1.hp);
    console.log(player2.hp);

    compareResults(player1, player2);
}
);