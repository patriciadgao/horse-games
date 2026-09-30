import { colors, expressions, hats, shapeGenes, spotGenes } from "./horseBasics";

export function choose(list, number = 1, repeat = false) {
    let listCopy = [...list];

    let choices = [];

    for (let i = 0; i < number; i++) {
        let r = Math.floor(Math.random() * listCopy.length);
        choices.push(listCopy[r]);

        if (!repeat) {
            listCopy.splice(r, 1);
        }
    }

    return choices.length === 1 ? choices[0] : choices;
}

export function translateShape(shape) {
    if (shape.filter(i => i === 'R').length > 1) {
        return 'round'
    } else if (shape.filter(i => i === 'S').length > 1) {
        return 'square'
    } else if (shape.filter(i => i === 'T').length > 1) {
        return 'tall'
    }
    return 'short'
}

export function translateSpots(spots) {
    const bigSpotCount = spots.filter((s) => s === 'O').length;

    if (bigSpotCount > 1) {
        return "spot"
    } else if (bigSpotCount > 0) {
        return "speckled"
    }
    return "plain"
}

export function interpretHorse(horse) {
    return {
        ...horse,
        shape: translateShape(horse.shape),
        spots: translateSpots(horse.spots)
    }
}

export function flattenHorse(horse) {
    return getHorseImageTitle(horse);
}

export function getHorseImageTitle(h) {
    const horse = interpretHorse(h);
    return `${horse.shape}-${horse.color}-${horse.spots}-${horse.expression}`
}

export function getRandomAppleInt() {
    return Math.floor(Math.random() * 5) + 1;
}

export function getAppleImageTitle() {
    return `apple-${getRandomAppleInt()}`
}

export function generateHorse() {
    const hasHat = choose([true, false, false, false]);
    const hasApple = choose([true, false, false, false]);

    return {
        color: choose(colors),
        shape: choose(shapeGenes, 3, true),
        spots: choose(spotGenes, 2, true),
        expression: choose(expressions),
        hat: hasHat ? choose(hats) : undefined,
        apples: hasApple ? 1 : 0
    }
}

export function generateDifferentHorse(horse) {
    let newHorse = generateHorse();
    const horseInterpreted = interpretHorse(horse);

    while (interpretHorse(newHorse) === horseInterpreted) {
        newHorse = generateHorse();
    }

    return newHorse;
}

export function mergeHorses(horse1, horse2) {
    const newShape = choose(horse1.shape, 2).concat([(choose(horse2.shape))]);
    const translatedNewShape = translateShape(newShape);
    const oldShape = translateShape(horse1.shape);
    const mergeShape = translateShape(horse2.shape);

    let expression = 'neutral';

    if (translatedNewShape === oldShape) {
        expression = horse1.expression;
    } else if (translatedNewShape === mergeShape) {
        expression = horse2.expression;
    }

    const hat = choose([horse1.hat, horse2.hat]);
    let hatGotStolen, hatAcquired = false;

    if (horse1.hat && !hat) {
        hatGotStolen = true;
    } else if (!horse1.hat && hat) {
        hatAcquired = true;
    }

    const minusApples = Math.max(horse1.apples - 1, 0);
    let apples = horse1.apples;

    if (horse2.apples) {
        apples = horse1.apples + horse2.apples;
    } else {
        apples = choose([minusApples, minusApples, minusApples, horse1.apples * 2])
    }

    return {
        color: horse1.color !== horse2.color ? horse1.color : choose(colors),
        shape: newShape,
        spots: [choose(horse1.spots), choose(horse2.spots)],
        expression: hatAcquired ? 'smile' : hatGotStolen ? 'frown' : expression,
        hat,
        apples
    }
}