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
    const weekFinished = localStorage.getItem('week_finished') === 'yes';

    if (playingWeek !== currentWeek) {
        if (currentWeek > 15) {
            localStorage.setItem('demo_over', 'yes');
        } else {
            startGame(currentWeek);
        }
    } else if (playingState === 'paused' && playingDate === currentDate && !weekFinished) {
        localStorage.setItem('playing_state', 'playing');
    }
}

export function getGoalPoints(goalType, goal) {
    const playingWeek = JSON.parse(localStorage.getItem('playing_week'));
    const weekData = weekInfo[playingWeek];
    const startingHorse = weekData.startingHorse;
    const interpretedHorse = interpretHorse(startingHorse);

    // base points for every goal 
    let points = 100;

    // up to 30 points depending on how far the starting horse is
    switch (goalType) {
        case 'expression':
        case 'color':
            if (startingHorse[goalType] !== goal) {
                points += 30;
            }
            break;
        case 'shape':
            if (interpretedHorse.shape === 'short' && goal !== 'short') {
                points += 10;
            } else {
                const goalLetter = goal === 'tall' ? 'T' : goal === 'square' ? 'S' : 'R';

                const horseLetterCount = startingHorse.shape.filter((g) => g === goalLetter).length;
                if (horseLetterCount == 1) {
                    points += 15;
                } else if (horseLetterCount === 0) {
                    points += 30;
                }
            }
            break;
        case 'spot':
            if (interpretedHorse.spots !== goal) {
                if (goal === 'speckled' || interpretedHorse.spots === 'speckled') {
                    points += 15;
                } else {
                    points += 30;
                }
            }
            break;
        case 'hat':
            if (interpretedHorse.hat && goal === 'yes') {
                if (goal === 'yes') {
                    points += 20;
                } else {
                    points += 10;
                }
            } else {
                if (goal === 'yes') {
                    points += 30;
                }
            }
            break;
        case 'apples':
            if (goal > 1) {
                points += 30;
            } else {
                points += 10;
            }
            break;
        default:
            break;
    }

    // up to 20 points based on goal difficulty
    switch (goalType) {
        case 'expression':
        case 'color':
            points += 20;
            break;
        case 'shape':
            if (goal === 'short') {
                points += 20;
            } else {
                points += 10;
            }
            break;
        case 'spot':
            if (goal === 'speckled') {
                points += 10;
            } else {
                points += 20;
            }
            break;
        case 'hat':
            if (goal === 'yes') {
                points += 20;
            }
            break;
        case 'apples':
            if (goal > 0) {
                points += 10;
            }
            if (goal > 1) {
                points += 10;
            }
            break;
        default:
            break;
    }

    return points;
}

export function getGoalBaseText(goalType, goal) {
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
            if (goal === 1) {
                return `horse has 1 apple`;
            }
            return `horse has ${goal} apples`;
        case 'hat':
        default:
            return goal === 'yes' ? 'horse has hat' : 'horse has no hat';
    }
}

export function getGoalText(goalType, goal) {
    let goalText = getGoalBaseText(goalType, goal);
    const goalPoints = getGoalPoints(goalType, goal);

    return `${goalText} (${goalPoints} points)`;
}

export function isGoalMet(goalType, goal, interpretedHorse) {
    if (['shape', 'color', 'expression', 'spots'].includes(goalType)) {
        return interpretedHorse[goalType] === goal;
    } else if (goalType === 'apples') {
        return interpretedHorse[goalType] === Number(goal);
    } else if (goalType === 'hat') {
        return goal === 'yes' ? interpretedHorse.hat !== undefined : interpretedHorse.hat === undefined;
    }
    return false
}

export function getPointsTotal(goals, horse) {
    const horseInfo = interpretHorse(horse);
    let totalPoints = 0;

    for (const [key, value] of Object.entries(goals)) {
        if (isGoalMet(key, value, horseInfo)) {
            totalPoints += getGoalPoints(key, value);
        }
    }

    return totalPoints;
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
    if (playingDate !== weekData.dateList.at(-1)) {
        const nextIndex = weekData.dateList.indexOf(playingDate) + 1;
        localStorage.setItem('playing_date', weekData.dateList[nextIndex]);
        localStorage.removeItem('week_finished');
    } else {
        weekFinished = true;
        localStorage.setItem('week_finished', 'yes');
        // upon finishing the week, update average points 
        let totalPoints = JSON.parse(localStorage.getItem('total_points')) ?? 0;
        let totalWeeks = JSON.parse(localStorage.getItem('total_weeks')) ?? 0;
        const thisWeekPoints = getPointsTotal(weekData.goals, newHorse);

        localStorage.setItem('total_points', JSON.stringify(totalPoints + thisWeekPoints));
        localStorage.setItem('total_weeks', JSON.stringify(totalWeeks + 1));
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