import { IoBarChartSharp, MdQueryStats, FaWpforms, ImProfile } from '../Dashboard'

export const sidebarLinks = [
  {
    id: 1,
    text: 'stats',
    to: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: 'all job',
    to: 'job',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'add job',
    to: 'add-job',
    icon: <FaWpforms />,
  },

  {
    id: 4,
    text: 'profile',
    to: 'profile',
    icon: <ImProfile />,
  },
]
