export const CategoryType = {
    Dribbling: 'DRIBBLING',
    Passing: 'PASSING',
    Shooting: 'SHOOTING',
    Warmup: 'WARM_UP',
}

export const getCategoryDisplayValue = (category) => {
    if (!category) {
        return null;
    }
    return Object.entries(CategoryType).find(categoryType => categoryType[1] === category)[0];
}