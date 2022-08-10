export type MonthlyTotal = {
  date: string
  count: number
}

export interface ChartProps {
  totals: MonthlyTotal[]
}

export { Chart } from './Chart'
export { AreaChart } from './AreaChart'
export { BarChart } from './BarChart'