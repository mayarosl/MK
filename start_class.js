import {compareResults, createPlayer, generateLogs, makeMove} from './create_elements.js';
import {Player} from './player_class.js';

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

const $arenas = document.querySelector('.arenas');
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

const $formFight = document.querySelector('.control');

class Game {
    start = () => {
        $formFight.addEventListener('submit', function (e) {
                e.preventDefault();
                makeMove();
                compareResults(player1, player2);
            }
        );
    }
}

export {Game};