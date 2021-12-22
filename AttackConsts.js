/**
 * массив, который понадобится для генерации удара со стороны противника
 * @type {string[]}
 */
export const ATTACK_DIR = ['head', 'body', 'foot'];
/**
 * объект, который содержит три ключа и числа для генерации случайного удара
 * @type {{head: number, body: number, foot: number}}
 */
export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};