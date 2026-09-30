colors = ['tan', 'blue', 'pink', 'green', 'copper']
shapes = ['round', 'square', 'tall', 'short']
spots = ['plain', 'speckled', 'spot']
expressions = ['neutral', 'smile', 'frown']

for shape in shapes:
    for color in colors:
        for spot in spots:
            for expression in expressions:
                print(f'"{shape}-{color}-{spot}-{expression}",')