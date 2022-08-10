import {
  AreaChart as RCAreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
} from 'recharts'
import {ChartProps} from './index'

export const AreaChart = ({totals}: ChartProps) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <RCAreaChart data={totals}
                   margin={{top: 50}}
      >
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='date'/>
        <YAxis allowDecimals={false}/>
        <Tooltip/>
        <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
      </RCAreaChart>
    </ResponsiveContainer>
  )
}
