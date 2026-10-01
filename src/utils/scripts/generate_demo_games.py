import datetime
import random

colors = ['tan', 'blue', 'pink', 'green', 'copper']
shapes = ['round', 'square', 'tall', 'short']
shape_genes = ['R', 'S', 'T']
spots = ['plain', 'speckled', 'spot']
spot_genes = ['O', 'o']
expressions = ['neutral', 'smile', 'frown']
apples = 5
apple_rarity = 0.25
hats = ['boss-of-the-plains', 'bowler', 'ten-gallon', 'top']
hat_rarity = 0.25
attributes = ['color', 'shape', 'spots', 'expression', 'hat', 'apples']

def generate_horse():
    has_hat = random.choices([True, False], [hat_rarity, 1-hat_rarity], k=1)
    has_apple = random.choices([True, False], [apple_rarity, 1-apple_rarity], k=1)

    horse = {
        'color': random.choice(colors),
        'shape': random.choices(shape_genes, k=3),
        'spots': random.choices(spot_genes, k=2),
        'expression': random.choice(expressions),
        'hat': random.choice(hats) if has_hat[0] else None,
        'apples': 1 if has_apple[0] else 0
    }

    return horse

def generate_different_horse(horse):
    new_horse = generate_horse()

    interpreted_horse = interpret_horse(horse)

    while interpret_horse(new_horse) == interpreted_horse:
        new_horse = generate_horse()

    return new_horse

def translate_horse_shape(shape):
    if shape.count('R') > 1:
        return 'round'
    if shape.count('T') > 1:
        return 'tall'
    if shape.count('S') > 1:
        return 'square'
    return 'short'

def translate_horse_spots(spots):
    big_gene_count = spots.count('O')
    if big_gene_count == 2:
        return 'spot'
    if big_gene_count == 1:
        return 'speckled'
    return 'plain'

def interpret_horse(horse):
    return {
        **horse,
        'shape': translate_horse_shape(horse['shape']),
        'spots': translate_horse_spots(horse['spots'])
    }

def get_horse_title(horse):
    return f"{horse['shape']}-{horse['color']}-{horse['spots']}-{horse['expression']}"

def flatten_horse(horse):
    return f"{horse['shape']}-{horse['color']}-{horse['spots']}-{horse['expression']}-{'hat' if horse['hat'] else 'nohat'}-{horse['apples']}"

def merge_horses(horse1, horse2):
    new_shape = random.sample(horse1['shape'], 2) + [random.choice(horse2['shape'])]
    translated_new_shape = translate_horse_shape(new_shape)
    old_shape = translate_horse_shape(horse1['shape'])
    merge_shape = translate_horse_shape(horse2['shape'])

    expression = 'neutral'

    if translated_new_shape == old_shape:
        expression = horse1['expression']
    elif translated_new_shape == merge_shape:
        expression = horse2['expression']

    hat = random.choice([horse1['hat'], horse2['hat']])
    hat_got_stolen = False
    hat_acquired = False

    if (horse1['hat'] is not None) and (hat is None):
        hat_got_stolen = True
    elif (horse1['hat'] is None) and hat is not None:
        hat_acquired = True

    random_new_color = horse1['color']
    while random_new_color == horse1['color']:
        random_new_color = random.choice(colors)
    
    return {
        'color': horse1['color'] if horse1['color'] != horse2['color'] else random_new_color,
        'shape': new_shape,
        'spots': random.choice(horse1['spots']) + random.choice(horse2['spots']),
        'expression': 'smile' if hat_acquired else 'frown' if hat_got_stolen else expression,
        'hat': hat,
        'apples': horse1['apples'] + horse2['apples'] if horse2['apples'] else random.choices([max(horse1['apples'] - 1, 0), horse1['apples']*2], [0.75, 0.25], k=1)[0]
    }

# 15 weeks for the trial starting yesterday
start_date = datetime.date(2026, 9, 28)

total_settings = []

for week in range(15):
    options = []

    starting_horse = generate_horse()

    for day in range(7):
        day = start_date + datetime.timedelta(weeks=week, days=day)
        day_formatted = day.strftime('%Y-%m-%d')

        left_horse = generate_horse()
        right_horse = generate_different_horse(left_horse)
        options.append((day_formatted, left_horse, right_horse))

    # obtain 100 possible horses 
    possible_horses = []

    for x in range(1000):
        # go through the week and choose 
        horse = starting_horse
        for day in range(7):
            horse = merge_horses(horse, random.choice(options[day][1:]))

        possible_horses.append(horse)

    result_dict = {}
    horse_type_dict = {}

    for horse in possible_horses:
        interpreted_horse = interpret_horse(horse)
        flattened_horse = flatten_horse(interpreted_horse)
        title = get_horse_title(interpreted_horse)
        if flattened_horse in result_dict:
            result_dict[flattened_horse] += 1
        else:
            result_dict[flattened_horse] = 1
        if title in horse_type_dict:
            horse_type_dict[title] += 1
        else:
            horse_type_dict[title] = 1

    max_key = max(result_dict, key=result_dict.get)
    # print('\n\n')
    # print('horses achieved: ', len(horse_type_dict), '/180')
    # print('max number of horses with this', result_dict[max_key])
    horse_attributes = max_key.split('-')
    goal_horse = {
        'shape': horse_attributes[0],
        'color': horse_attributes[1],
        'spots': horse_attributes[2],
        'expression': horse_attributes[3],
        'hat': 'yes' if horse_attributes[4] == 'hat' else 'no',
        'apples': horse_attributes[5]
    }

    # choose three attributes of this horse to store as goals 
    goals = {}
    goal_categories = random.sample(attributes, k=3)

    for c in goal_categories:
        goals[c] = goal_horse[c]

    total_settings.append({
        'starting_horse': starting_horse,
        'choices': options,
        'goals': goals,
        'week_number': week
    })

# print map of date to week number
week_number = 1
week_counter = 0
date_map = []
for x in range(15*7):
    week_counter += 1
    if week_counter > 7:
        week_counter = 1
        week_number += 1

    date = start_date + datetime.timedelta(days=x)

    date_formatted = date.strftime("%Y-%m-%d")
    date_map.append((date_formatted, week_number))

# print(date_map)

# for mapping in date_map:
#     print(f"'{mapping[0]}': {mapping[1]},")

for setting in total_settings:
    print(setting['week_number']+1, ":", "{",f"startingHorse: {setting['starting_horse']},")
    print("dateList: [")
    for day in setting['choices']:
        print(f"'{day[0]}',")
    print("],")
    print("choiceList: {"),
    for day in setting['choices']:
        print(f"'{day[0]}':","{")
        print(f"left: {day[1]},")
        print(f"right: {day[2]}","},")
    print("},")
    print("goals: ", setting['goals'],",")
    print("},")

# print(total_settings)

# segment October -> December 2026 into weeks (starting Monday, ending Sunday)

# function that generates a random horse with a hat and apples

# function that transforms a horse from its genes to a horse type

# for each week, choose a starting horse

# then choose two option horses for each day

# analyze the possib
# le horses that you could end up with at the end of this week 
# for the first five weeks, choose the horse that is most likely (break ties randomly)
# choose from its attributes for the weekly goals
# three goals every week 
# for the first seven weeks, one of the goals can have two options for outcome (make sure they are possible)

# types of horses: 
# - shape 
# - color 
# - spot pattern
# - expression 
# - number of apples 
# - presence of a hat

# output this into a database that has date, then the option horses (and a starting horse if it's a Monday)
# okay just generate date AND day of the week to be helpful

# your horse ALWAYS gets added to the stable even during the week while you are working towards your goal
# if you haven't seen it before