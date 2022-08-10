import {
  BarChart as RCBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {ChartProps} from './index'

export const BarChart = ({ totals }: ChartProps) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <RCBarChart data={totals}
                  margin={{top: 50}}
      >
        <CartesianGrid strokeDasharray='3 3'/>
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false}/>
        <Tooltip/>
        <Bar dataKey='count' fill='#2cb1bc' barSize={75}/>
      </RCBarChart>
    </ResponsiveContainer>
  )
}
