const name = 'Allergen Assessment';

function createAllergensToIngredientsMap (lines) {
    const allergensToIngredients = {};
    lines.forEach((line) => {
        const [, ingText, allergenText] = line.match(/(.+) \(contains (.+)\)/);
        const ingredients = ingText.split(' ');
        const allergens = allergenText.split(', ');

        allergens.forEach((allg) => {
            const arr = allergensToIngredients[allg] || [];
            arr.push(ingredients);
            allergensToIngredients[allg] = arr;
        });
    });
    return allergensToIngredients;
}

function findPossibleAllergens (allergensToIngredients) {
    // filter ingredients common in all lists for each allergen
    Object.keys(allergensToIngredients).forEach((allg) => {
        const ingList = allergensToIngredients[allg];
        // intersection of ingList elements
        const commonIngredients = ingList[0]
            .filter((ing) => ingList.slice(1).every((l) => l.includes(ing)));
        // eslint-disable-next-line no-param-reassign
        allergensToIngredients[allg] = commonIngredients;
    });
}

function part1 (lines) {
    const allergensToIngredients = createAllergensToIngredientsMap(lines);

    const ingredientsLists = []
        .concat(...Object.values(allergensToIngredients))
        .filter((c, i, ls) => ls.indexOf(c) === i);

    const allIngredients = new Set(ingredientsLists.flatMap((l) => l));

    findPossibleAllergens(allergensToIngredients);

    // filter allIngredients to include uncommon ones
    Object.values(allergensToIngredients)
        .forEach((ingList) => ingList.forEach((ing) => allIngredients.delete(ing)));

    return Array.from(allIngredients)
        .map((i) => ingredientsLists.filter((l) => l.includes(i)).length)
        .reduce((acc, v) => acc + v, 0);
}

function part2 (lines) {
    const allergensToIngredients = createAllergensToIngredientsMap(lines);

    findPossibleAllergens(allergensToIngredients);

    const allergensList = Object.values(allergensToIngredients);
    for (let i = 1; i < allergensList.length; ++i) {
        allergensList.sort((l1, l2) => l1.length - l2.length);
        allergensList.slice(i).forEach((list) => {
            if (list.includes(allergensList[i - 1][0])) {
                list.splice(list.indexOf(allergensList[i - 1][0]), 1);
            }
        });
    }

    return Object.keys(allergensToIngredients)
        .sort()
        .flatMap((k) => allergensToIngredients[k])
        .join(',');
}

module.exports = { name, part1, part2 };
