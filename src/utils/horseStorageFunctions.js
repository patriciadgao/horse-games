import { horses } from "./horseBasics";
import { choose, flattenHorse } from "./horseFunctions";

export function clearStable() {
    localStorage.clear()
}

export function getStableInfo() {
    const achievedHorses = JSON.parse(localStorage.getItem('achieved_horses')) ?? [];
    const achievedHats = JSON.parse(localStorage.getItem('achieved_hats')) ?? [];
    const missingHorse = localStorage.getItem('missing_horse');
    const maxApples = JSON.parse(localStorage.getItem('max_apples'));

    return {
        achievedHorses: achievedHorses.length,
        achievedHats: achievedHats.length,
        missingHorse: missingHorse,
        maxApples: maxApples ?? 0
    }
}

export function updateStable(newHorse) {
    let achievedHorses = JSON.parse(localStorage.getItem('achieved_horses')) ?? [];
    let achievedHats = JSON.parse(localStorage.getItem('achieved_hats')) ?? [];
    let missingHorse = JSON.parse(localStorage.getItem('missing_horse'));
    let maxApples = JSON.parse(localStorage.getItem('max_apples'));

    const flattenedHorse = flattenHorse(newHorse);

    if (!achievedHorses.includes(flattenedHorse)) {
        achievedHorses.push(flattenedHorse);
    }

    if (newHorse.hat && !achievedHats.includes(newHorse.hat)) {
        achievedHats.push(newHorse.hat);
    }

    if (!maxApples || newHorse.apples > maxApples) {
        localStorage.setItem('max_apples', JSON.stringify(newHorse.apples));
    }

    if (flattenedHorse === missingHorse || !missingHorse) {
        if (achievedHorses.length === horses.length) {
            localStorage.removeItem('missing_horse');
        } else {
            const newMissingHorseOptions = horses.filter((h) => !achievedHorses.includes(h));
            const missingHorse = choose(newMissingHorseOptions);

            localStorage.setItem('missing_horse', missingHorse);
        }
    }

    localStorage.setItem('achieved_horses', JSON.stringify(achievedHorses));
    localStorage.setItem('achieved_hats', JSON.stringify(achievedHats));
}