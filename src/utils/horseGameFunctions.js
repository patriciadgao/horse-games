import { weekInfo, weekMapping } from "./horseDemoInfo";
import { interpretHorse, mergeHorses } from "./horseFunctions";
import { updateStable } from "./horseStorageFunctions";

export function startGame(week) {
    const weekData = weekInfo[week];
    localStorage.setItem('playing_date', weekData.dateList[0]);
    localStorage.setItem('playing_state', 'playing');
    localStorage.setItem('current_horse', JSON.stringify(weekData.startingHorse));
    localStorage.setItem('left_horse', JSON.stringify(weekData.choiceList[weekData.dateList[0]].left));
    localStorage.setItem('right_horse', JSON.stringify(weekData.choiceList[weekData.dateList[0]].right));
    localStorage.setItem('lineage', JSON.stringify([weekData.startingHorse]));
    localStorage.setItem('goals', JSON.stringify(weekData.goals));
    localStorage.setItem('playing_week', JSON.stringify(week));
    localStorage.removeItem('week_finished');
}

export function getCurrentDate() {
    return new Date().toLocaleString('sv-SE', {
        timeZone: 'America/Los_Angeles'
    }).split(" ")[0];
}

export function refreshGameStatus() {
    const currentDate = getCurrentDate();

    const currentWeek = weekMapping[currentDate];
    const playingWeek = JSON.parse(localStorage.getItem('playing_week'));

    const playingDate = localStorage.getItem('playing_date');

    const playingState = localStorage.getItem('playing_state');

    if (playingWeek !== currentWeek) {
        startGame(currentWeek);
    } else if (playingState === 'paused' && playingDate === currentDate) {
        localStorage.setItem('playing_state', 'playing');
    }
}

export function getGoalText(goalType, goal) {
    switch (goalType) {
        case 'shape':
        case 'color':
            return `horse is ${goal}`;
        case 'expression':
            switch (goal) {
                case 'smile':
                    return 'horse is smiling';
                case 'frown':
                    return 'horse is frowning';
                case 'neutral':
                default:
                    return 'horse has neutral expression'
            }
        case 'spots':
            switch (goal) {
                case 'speckled':
                    return 'horse is speckled';
                case 'spot':
                    return 'horse has a big spot';
                case 'plain':
                default:
                    return 'horse has no spots'
            }
        case 'apples':
            return `horse has ${goal} apples`;
        case 'hat':
        default:
            return goal === 'yes' ? 'horse has hat' : 'horse has no hat';
    }
}

export function isGoalMet(goalType, goal, interpretedHorse) {
    if (['shape', 'color', 'expression', 'spots'].includes(goalType)) {
        return interpretedHorse[goalType] === goal;
    } else if (goalType === 'apples') {
        return interpretedHorse.apples === goal;
    } else if (goalType === 'hat') {
        return goal === 'yes' ? interpretedHorse.hat !== undefined : interpretedHorse.hat === undefined;
    }
    return false
}

export function analyzeGoalsMet(goals, horse) {
    const horseInfo = interpretHorse(horse);

    const goalsCopy = { ...goals };

    for (const [key, value] of Object.entries(goals)) {
        goalsCopy[key] = isGoalMet(key, value, horseInfo);
    }

    return goalsCopy
}

export function chooseHorse(option) {
    const currentHorse = JSON.parse(localStorage.getItem("current_horse"));
    const chosenHorse = JSON.parse(localStorage.getItem(`${option}_horse`));
    const currentDate = getCurrentDate();

    const newHorse = mergeHorses(currentHorse, chosenHorse);

    const currentWeek = JSON.parse(localStorage.getItem('playing_week'));
    const weekData = weekInfo[currentWeek];

    const playingDate = localStorage.getItem('playing_date');

    // pause if we just played today's date
    if (playingDate === currentDate) {
        localStorage.setItem('playing_state', 'paused');
    }

    // increment day if week is unfinished
    let weekFinished = false
    if (playingDate !== weekData.dateList[-1]) {
        const nextIndex = weekData.dateList.indexOf(playingDate) + 1;
        localStorage.setItem('playing_date', weekData.dateList[nextIndex]);
        localStorage.removeItem('week_finished');
    } else {
        weekFinished = true;
        localStorage.setItem('week_finished', 'yes');
    }

    // add options to lineage
    const lineage = JSON.parse(localStorage.getItem('lineage'));
    lineage.push(chosenHorse, newHorse);
    localStorage.setItem('lineage', JSON.stringify(lineage));

    // update horses
    const leftHorse = weekFinished ? null : weekData.choiceList[playingDate].left;
    const rightHorse = weekFinished ? null : weekData.choiceList[playingDate].right;
    localStorage.setItem('current_horse', JSON.stringify(newHorse));
    localStorage.setItem('left_horse', JSON.stringify(leftHorse));
    localStorage.setItem('right_horse', JSON.stringify(rightHorse));

    // update stable
    updateStable(newHorse);
}