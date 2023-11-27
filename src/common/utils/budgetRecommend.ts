export function calculateBudget(totalBudget: number, ratio: number): number {
  return Math.round(totalBudget * (ratio / 100))
}

export function calculateOthers(findBudgetRatio: any): number {
  console.log(findBudgetRatio)
  return Object.keys(findBudgetRatio).reduce((others, key) => {
    if (findBudgetRatio[key] <= 10) {
      others += findBudgetRatio[key]
    }
    return others
  }, 0)
}

export function calculateRecommendedBudget(
  findBudgetRatio: any,
  calculateBudget: Function,
): object {
  return Object.keys(findBudgetRatio).reduce((result, key) => {
    if (findBudgetRatio[key] > 0) {
      result[key] = calculateBudget(findBudgetRatio[key])
    }
    return result
  }, {})
}
