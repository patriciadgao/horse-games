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
    const totalWeeks = JSON.parse(localStorage.getItem('total_weeks'));
    const totalPoints = JSON.parse(localStorage.getItem('total_points'));
    const savedHorse1 = JSON.parse(localStorage.getItem('saved_horse_1'));
    const savedHorse2 = JSON.parse(localStorage.getItem('saved_horse_2'));

    return {
        achievedHorses: achievedHorses.length,
        achievedHats: achievedHats.length,
        missingHorse,
        maxApples: maxApples ?? 0,
        totalWeeks: totalWeeks ?? 0,
        totalPoints: totalPoints ?? 0,
        savedHorse1,
        savedHorse2
    }
}

export function updateStable(newHorse) {
    let achievedHorses = JSON.parse(localStorage.getItem('achieved_horses')) ?? [];
    let achievedHats = JSON.parse(localStorage.getItem('achieved_hats')) ?? [];
    let missingHorse = localStorage.getItem('missing_horse');
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
            let missingHorse = undefined;
            if (newMissingHorseOptions.length > 0) {
                missingHorse = choose(newMissingHorseOptions);
            }

            localStorage.setItem('missing_horse', missingHorse);
        }
    }

    localStorage.setItem('achieved_horses', JSON.stringify(achievedHorses));
    localStorage.setItem('achieved_hats', JSON.stringify(achievedHats));
}

export function saveHorse(weekToReplace = undefined) {
    const savedHorse1 = JSON.parse(localStorage.getItem('saved_horse_1'));
    const savedHorse1Week = JSON.parse(localStorage.getItem('saved_horse_1_week'));

    const currentHorse = JSON.parse(localStorage.getItem('current_horse'));
    const currentWeek = JSON.parse(localStorage.getItem('playing_week'));

    if (weekToReplace === 1 || !savedHorse1 || currentWeek === savedHorse1Week) {
        localStorage.setItem('saved_horse_1', JSON.stringify(currentHorse));
        localStorage.setItem('saved_horse_1_week', JSON.stringify(currentWeek));
        return;
    } else {
        localStorage.setItem('saved_horse_2', JSON.stringify(currentHorse));
        localStorage.setItem('saved_horse_2_week', JSON.stringify(currentWeek));
        return;
    }
}

export function removeSavedHorse(horseNumber) {
    if (horseNumber === 1) {
        const savedHorse2 = JSON.parse(localStorage.getItem('saved_horse_2'));
        const savedHorse2Week = JSON.parse(localStorage.getItem('saved_horse_2_week'));

        localStorage.setItem('saved_horse_1', JSON.stringify(savedHorse2));
        localStorage.setItem('saved_horse_1_week', JSON.stringify(savedHorse2Week));
    }
    localStorage.removeItem('saved_horse_2');
    localStorage.removeItem('saved_horse_2_week');
}