export const getTrialPlan = (pricingPlans) => {
    return pricingPlans.find(plan => plan.type === 'Trial');
}
