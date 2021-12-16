const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control')
const $submitButton = document.querySelector('.button')

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'YAN',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    changeHP,
    renderHP,
    elHP,
    attack
};

const player2 = {
    player: 2,
    name: 'DASHA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    changeHP,
    renderHP,
    elHP,
    attack
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

    $reloadButton.addEventListener('click', function (){
        window.location.reload();
    });

    $reloadButtonDiv.appendChild($reloadButton);
    $arenas.appendChild($reloadButtonDiv);
}

// $randomButton.addEventListener('click', function () {
//     player1.changeHP(getRandom(20));
//     player2.changeHP(getRandom(20));
//     player1.renderHP();
//     player2.renderHP();
//
//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton();
//     }
//
//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(showResultText(player2.name));
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(showResultText(player1.name));
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arenas.appendChild(showResultText());
//     }
// })

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
    // выбираем часть тела для атаки и защиты
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    // возвращаем объект: силу удара в зависимости от места удара, куда удар, что защищено
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function compareResults(attack, enemy) {
    if (attack.hit !== enemy.defence) {
        return attack.value;
    }
}

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();

    // вражеские комбинации задаются рандомно функцией
    const enemy = enemyAttack();
    // мои комбинации записываются из формы
    const attack = {};

    // для каждого элемента в форме
    for (let item of $formFight) {
        // если элемент выбран и он в поле хит
        if (item.checked && item.name === 'hit') {
            // в объект атака под ключом вэлью запиши рандомное число из диапазона, соответствующего значению части тела
            attack.value = getRandom(HIT[item.value]);
            // в объект атака под ключом хит (цель удара) запиши часть тела
            attack.hit = item.value;
        }
        // если элемент выбран и он в поле защита
        if (item.checked && item.name === 'defence') {
            // в объект атака под ключом дифенс запиши, какую часть тела выбрали защищать
            attack.defence = item.value;
        }

        // сравниваем результаты
        // если цель удара совпадает с защитой противника, ничего не делаем
        if (attack.hit === enemy.defence) {
            continue;
        }
        // если не совпадает, надо отнять у противника из здоровья силу удара
        else {
            player1.changeHP(attack.value);
            player2.changeHP(attack.value);
            player1.renderHP();
            player2.renderHP();
        }



        // if (player1.hp === 0 && player1.hp < player2.hp) {
        //     $arenas.appendChild(showResultText(player2.name));
        //     console.log('Yan wins');
        // } else if (player2.hp === 0 && player2.hp < player1.hp) {
        //     $arenas.appendChild(showResultText(player1.name));
        //     console.log('Dasha wins');
        // } else if (player1.hp === 0 && player2.hp === 0) {
        //     $arenas.appendChild(showResultText());
        //     console.log('Draw')
        // }


        item.checked = false;

    }

    // if (player1.hp === 0 || player2.hp === 0) {
    //     $submitButton.disabled = true;
    //     createReloadButton();
    // }


    console.log('####: a', attack);
    console.log(player1.hp);
    console.log(player2.hp);
    console.log('----');
    console.log('####: e', enemy);
    console.log(player1.hp);
    console.log(player2.hp);
} );