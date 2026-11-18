import { weekInfo } from "./horseDemoInfo";
import { interpretHorse } from "./horseFunctions";
import { getNumGoalsMet } from "./horseGameFunctions";
import { getStableInfo } from "./horseStorageFunctions";

export const achievements = [
    {
        label: 'Yeah Yeah Yeah',
        description: 'at least one goal met every day in a week',
        has: false
    },
    {
        label: 'Consolation Prize',
        description: 'no points at all in a week',
        has: false
    },
    {
        label: 'Horse Apprentice',
        description: 'all goals met during the week, but not at the end of the week',
        has: false
    },
    {
        label: 'Horse Master',
        description: 'all weekly goals met',
        has: false,
    },
    {
        label: 'Hat Swapper',
        description: 'has swapped hats 5+ times',
        hatSwapCount: 0,
        has: false
    },
    {
        label: 'Milliner’s Friend',
        description: '5+ hats achieved',
        has: false
    },
    {
        label: 'Milliner’s Favorite',
        description: 'all hats achieved',
        has: false
    },
    {
        label: 'Horse Party',
        description: '30+ horse types',
        has: false
    },
    {
        label: 'Large Horse Party',
        description: '50+ horse types',
        has: false,
    },
    {
        label: 'Hundred Horses',
        description: '100+ horse types',
        has: false
    },
    {
        label: 'Juggler',
        description: '3+ apples at a time',
        has: false
    },
    {
        label: 'Apple Collector',
        description: '5+ apples at a time',
        has: false
    },
    {
        label: 'Apple Menace',
        description: '10+ apples at a time',
        has: false
    }, {
        label: 'Unhappy Week',
        description: 'no smiles all week',
        has: false
    }, {
        label: 'Happy Week',
        description: 'no frowns all week',
        has: false
    }, {
        label: 'Horse Month!',
        description: 'played 4+ weeks',
        has: false,
    }, {
        label: 'Mostly There',
        description: 'average > 200, played 4+ weeks',
        has: false,
    }, {
        label: 'Too Easy',
        description: 'average > 300, played 4+ weeks',
        has: false
    }, {
        label: 'Funky Spotty',
        description: 'spots changed every day for a week',
        has: false
    }, {
        label: 'Funky Shapey',
        description: 'shape changed every day for a week',
        has: false
    },
    {
        label: 'Shapely',
        description: 'shape did not change for a week',
        has: false
    },
    {
        label: 'Shapeshifter',
        description: 'all 4 shapes achieved in a week',
        has: false
    }, {
        label: 'Stay Short',
        description: 'merge two short horses and get a short horse',
        has: false
    }, {
        label: 'What!!',
        description: 'merge two non-short horses and get the other non-short horse shape',
        has: false
    }
];

/*
    This is only meant to be run upon the week being finished
    (that just makes it easier to calculate)
*/
export function updateAchievements(thisWeekPoints, thisWeekBonus) {
    const lineage = JSON.parse(localStorage.getItem('lineage'));

    /* 
        If somehow it's not the end of a week, abort!
    */
    if (lineage.length < 15) {
        return;
    }

    const interpretedLineage = lineage.map((h) => interpretHorse(h));
    const achievementsSoFar = JSON.parse(localStorage.getItem('achievements')) ?? [...achievements];
    const stableInfo = getStableInfo();

    const yourHorsesThisWeek = lineage.filter((_, i) => i % 2 === 0);
    const yourHorsesThisWeekInterpreted = yourHorsesThisWeek.map((h) => interpretHorse(h));

    const newAchivements = achievementsSoFar.map((a) => {
        if (a.has) {
            return a;
        }

        const trueVersion = { ...a, has: true };

        // all weekly goals met
        if (a.label === 'Horse Master') {
            if ((thisWeekPoints - thisWeekBonus) > 300) {
                return trueVersion;
            }
            return a;
        }

        // all goals met during the week, but not at the end of the week
        if (a.label === 'Horse Apprentice') {
            if (thisWeekPoints === thisWeekBonus) {
                return trueVersion;
            }
            return a;
        }

        // no points this week
        if (a.label === 'Consolation Prize') {
            if (thisWeekPoints === 0) {
                return trueVersion;
            }
            return a;
        }

        // all hats achieved
        if (a.label === 'Milliner’s Favorite') {
            if (stableInfo.achievedHatNumber === 13) {
                return trueVersion;
            }
            return a;
        }

        // 5+ hats achieved
        if (a.label === 'Milliner’s Friend') {
            if (stableInfo.achievedHatNumber > 4) {
                return trueVersion;
            }
            return a;
        }

        // 100 horse types achieved
        if (a.label === 'Hundred Horses') {
            if (stableInfo.achievedHorses > 99) {
                return trueVersion;
            }
            return a;
        }

        // 50 horse types achieved
        if (a.label === 'Large Horse Party') {
            if (stableInfo.achievedHorses > 49) {
                return trueVersion;
            }
            return a;
        }

        // 30 horse types achieved
        if (a.label === 'Horse Party') {
            if (stableInfo.achievedHorses > 29) {
                return trueVersion;
            }
            return a;
        }

        // 10+ apples achieved
        if (a.label === 'Apple Menace') {
            if (stableInfo.maxApples > 9) {
                return trueVersion;
            }
            return a;
        }

        // 5+ apples achieved
        if (a.label === 'Apple Collector') {
            if (stableInfo.maxApples > 4) {
                return trueVersion;
            }
            return a;
        }

        // 3+ apples achieved
        if (a.label === 'Juggler') {
            if (stableInfo.maxApples > 2) {
                return trueVersion;
            }
            return a;
        }

        // no smiles all week
        if (a.label === 'Unhappy Week') {
            const smilingHorses = yourHorsesThisWeek.filter((h) => h.expression === 'smile');

            if (smilingHorses.length === 0) {
                return trueVersion;
            }
            return a;
        }

        // no frowns all week
        if (a.label === 'Happy Week') {
            const frowningHorses = yourHorsesThisWeek.filter((h) => h.expression === 'frown');

            if (frowningHorses.length === 0) {
                return trueVersion;
            }
            return a;
        }

        // played 4+ weeks
        if (a.label === 'Horse Month!') {
            if (stableInfo.totalWeeks > 3) {
                return trueVersion;
            }
            return a;
        }

        // average > 200, played 4+ weeks
        if (a.label === 'Mostly There') {
            if (stableInfo.totalWeeks > 3 && (stableInfo.totalPoints / stableInfo.totalWeeks) > 200) {
                return trueVersion;
            }
            return a;
        }

        // average > 300, played 4+ weeks
        if (a.label === 'Too Easy') {
            if (stableInfo.totalWeeks > 3 && (stableInfo.totalPoints / stableInfo.totalWeeks) > 300) {
                return trueVersion;
            }
            return a;
        }

        // has swapped hats 5+ times
        if (a.label === "Hat Swapper") {
            let numHatSwaps = a.hatSwapCount;

            for (const horseNum of [2, 4, 6, 8, 10, 12]) {
                const originalHat = lineage[horseNum - 2].hat;
                const otherHat = lineage[horseNum - 1].hat;
                const horseHat = lineage[horseNum].hat;

                if (originalHat && otherHat && horseHat && originalHat !== otherHat && otherHat === horseHat) {
                    numHatSwaps += 1;
                    if (numHatSwaps > 4) {
                        return {
                            ...trueVersion,
                            hatSwapCount: numHatSwaps
                        };
                    }
                }
            }

            return {
                ...a,
                hatSwapCount: numHatSwaps
            }
        }

        // spots changed every day for a week
        if (a.label === 'Funky Spotty') {
            let spotChanges = 0;

            yourHorsesThisWeek.forEach((_, i) => {
                if (i > 0) {
                    if (yourHorsesThisWeekInterpreted[i - 1].spots !== yourHorsesThisWeekInterpreted[i].spots) {
                        spotChanges += 1;
                    }
                }
            })
            if (spotChanges === 7) {
                return trueVersion;
            }

            return a;
        }

        // shape changed every day for a week / shape did not change for a week
        if (a.label === 'Funky Shapey' || a.label === 'Shapely') {
            let shapeChanges = 0;

            yourHorsesThisWeek.forEach((_, i) => {
                if (i > 0) {
                    const prevHorse = yourHorsesThisWeekInterpreted[i - 1];
                    const currentHorse = yourHorsesThisWeekInterpreted[i];

                    if (prevHorse.shape !== currentHorse.shape) {
                        shapeChanges += 1;
                    }
                }
            })
            if (a.label === 'Funky Shapey' && shapeChanges === 7) {
                return trueVersion;
            }
            if (a.label === 'Shapely' && shapeChanges === 0) {
                return trueVersion;
            }

            return a;
        }

        // all 4 shapes achieved in a week 
        if (a.label === 'Shapeshifter') {
            const shapesThisWeek = [];

            yourHorsesThisWeekInterpreted.forEach((h) => {
                if (!shapesThisWeek.includes(h.shape)) {
                    shapesThisWeek.push(h.shape);
                }
            });

            if (shapesThisWeek.length === 4) {
                return trueVersion;
            }
            return a;
        }

        // merge two short horses and get a short horse / merge two non-short horses and get the other non-short horse shape
        if (a.label === 'Stay Short' || a.label === 'What!!') {
            for (const horseNum of [2, 4, 6, 8, 10, 12]) {
                const originalShape = interpretedLineage[horseNum - 2].shape;
                const otherShape = interpretedLineage[horseNum - 1].shape;
                const horseShape = interpretedLineage[horseNum].shape;

                if (a.label === 'Stay Short' && originalShape === 'short' && otherShape === 'short' && horseShape === 'short') {
                    return trueVersion;
                }

                if (a.label === 'What!!' && originalShape !== 'short' && otherShape !== originalShape && otherShape !== 'short'
                    && horseShape !== originalShape && horseShape !== otherShape && horseShape !== 'short'
                ) {
                    return trueVersion;
                }
            }

            return a;
        }

        // at least one goal met every day in the week
        if (a.label === 'Yeah Yeah Yeah') {
            const currentWeek = JSON.parse(localStorage.getItem('playing_week'));
            const weekData = weekInfo[currentWeek];

            const goals = weekData.goals;

            let daysWithGoalMet = 0;

            yourHorsesThisWeek.forEach((h, i) => {
                if (i > 0) {
                    const goalsMet = getNumGoalsMet(goals, h);

                    if (goalsMet > 0) {
                        daysWithGoalMet += 1;
                    } else {
                        return a;
                    }
                }
            });

            if (daysWithGoalMet === 7) {
                return trueVersion;
            }

            return a;
        }
    });

    localStorage.setItem('achievements', JSON.stringify(newAchivements));
}

export function getAchievements() {
    const storedAchievements = JSON.parse(localStorage.getItem("achievements"));

    if (storedAchievements === null) {
        return achievements;
    }
    return storedAchievements;
} 