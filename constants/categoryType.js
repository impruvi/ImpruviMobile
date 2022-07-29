export const CategoryType = {
    Warmup: 'WARM_UP',
    Juggling: 'JUGGLING',
    Dribbling: 'DRIBBLING',
    Passing: 'PASSING',
    Shooting: 'SHOOTING',
}

export const getCategoryDisplayValue = (category) => {
    if (!category) {
        return null;
    }
    return Object.entries(CategoryType).find(categoryType => categoryType[1] === category)[0];
}