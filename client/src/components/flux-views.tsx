import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts'
import {
  TrendingUp,
  Box,
  Activity,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  MoreHorizontal,
  Share2,
  Save,
  FileText,
  Cpu,
  Server,
  Zap,
  MapPin,
  ShoppingCart,
  User,
  Users,
  Check,
  Loader2,
  Calendar,
  FileCheck,
  Mail,
  Phone,
  MapPin as MapPinIcon,
  Briefcase,
} from 'lucide-react'
import { useState } from 'react'

// --- Types ---
export type ViewType = 'blank' | 'marketing' | 'inventory' | 'org' | 'operations' | 'supply-chain'

// --- Mock Data ---
const marketingData = [
  { name: 'Jan', spend: 4000, leads: 240, amt: 2400 },
  { name: 'Feb', spend: 3000, leads: 139, amt: 2210 },
  { name: 'Mar', spend: 2000, leads: 980, amt: 2290 },
  { name: 'Apr', spend: 2780, leads: 390, amt: 2000 },
  { name: 'May', spend: 1890, leads: 480, amt: 2181 },
  { name: 'Jun', spend: 2390, leads: 380, amt: 2500 },
  { name: 'Jul', spend: 3490, leads: 430, amt: 2100 },
]

const spendBreakdown = [
  { name: 'Google Ads', value: 8500, color: '#4285F4' },
  { name: 'LinkedIn', value: 4200, color: '#0077B5' },
  { name: 'Meta', value: 3100, color: '#1877F2' },
  { name: 'Events', value: 2400, color: '#E1306C' },
  { name: 'Sponsorships', value: 1350, color: '#F4B400' },
]

const inventoryData = [
  {
    id: 1,
    item: 'MacBook Pro M3',
    stock: 124,
    status: 'In Stock',
    value: '$248,000',
    supplier: 'Apple Enterprise',
  },
  {
    id: 2,
    item: 'Dell UltraSharp 27',
    stock: 45,
    status: 'Low Stock',
    value: '$15,750',
    supplier: 'Dell Commercial',
  },
  {
    id: 3,
    item: 'Logitech MX Master',
    stock: 89,
    status: 'In Stock',
    value: '$8,900',
    supplier: 'Logitech B2B',
  },
  {
    id: 4,
    item: 'Herman Miller Aeron',
    stock: 12,
    status: 'Critical',
    value: '$18,000',
    supplier: 'Herman Miller Inc.',
  },
]

const orgData = [
  {
    id: 1,
    name: 'Alice Chen',
    role: 'VP of Engineering',
    department: 'Engineering',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    email: 'alice@liquiderp.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    reports: 12,
    projects: ['Core Platform', 'AI Engine'],
    skills: ['Leadership', 'System Architecture', 'React'],
  },
  {
    id: 2,
    name: 'Mark Zuckerberg',
    role: 'Product Lead',
    department: 'Product',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    email: 'mark@liquiderp.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    reports: 8,
    projects: ['Mobile App', 'User Growth'],
    skills: ['Product Strategy', 'UX Research', 'Data Analysis'],
  },
  {
    id: 3,
    name: 'Sarah Connor',
    role: 'Head of Design',
    department: 'Design',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    email: 'sarah@liquiderp.com',
    phone: '+1 (555) 456-7890',
    location: 'Remote (London)',
    reports: 5,
    projects: ['Design System', 'Rebranding'],
    skills: ['UI/UX', 'Brand Identity', 'Figma'],
  },
]

const operationsData = [
  { time: '00:00', load: 30, temp: 45 },
  { time: '04:00', load: 25, temp: 42 },
  { time: '08:00', load: 65, temp: 58 },
  { time: '12:00', load: 85, temp: 75 },
  { time: '16:00', load: 70, temp: 65 },
  { time: '20:00', load: 45, temp: 50 },
]

// --- Components ---

const ViewHeader = ({
  title,
  subtitle,
  onSave,
}: {
  title: string
  subtitle: string
  onSave: () => void
}) => (
  <div className="flex justify-between items-start mb-6">
    <div>
      <h2 className="text-2xl font-display font-bold tracking-tight">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
    <div className="flex gap-2">
      <Button variant="outline" size="sm" className="gap-2" onClick={onSave}>
        <Save className="w-4 h-4" /> Save View
      </Button>
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="w-4 h-4" />
      </Button>
    </div>
  </div>
)

export const MarketingView = ({
  onDetail,
  onSave,
  onAction,
}: {
  onDetail: (type: string, data?: any) => void
  onSave: () => void
  onAction: (action: string) => void
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
    className="w-full max-w-6xl"
  >
    <ViewHeader
      title="Marketing Intelligence"
      subtitle="Real-time campaign performance & spend analysis"
      onSave={onSave}
    />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        className="glass-panel border-none md:col-span-2 cursor-pointer hover:border-primary/20 transition-colors"
        onClick={() =>
          onDetail('analytics', { title: 'Spend vs Acquisition Trend', data: marketingData })
        }
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Spend vs Acquisition</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            Analytics Deep Dive <ArrowRight className="ml-1 w-3 h-3" />
          </Button>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketingData}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-chart-3)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  background: 'var(--color-popover)',
                }}
              />
              <Area
                type="monotone"
                dataKey="spend"
                stroke="var(--color-primary)"
                fillOpacity={1}
                fill="url(#colorSpend)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="leads"
                stroke="var(--color-chart-3)"
                fillOpacity={1}
                fill="url(#colorLeads)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card
          className="glass-panel border-none hover:bg-white/40 dark:hover:bg-black/20 transition-colors cursor-pointer"
          onClick={() =>
            onDetail('spend-breakdown', { title: 'Total Spend Breakdown', data: spendBreakdown })
          }
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold">$19,550</div>
            <div className="text-sm text-green-500 flex items-center mt-1">
              <TrendingUp className="w-4 h-4 mr-1" /> +12.5% MoM
            </div>
            <div className="mt-4 h-1 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[70%]" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="glass-panel border-none hover:bg-white/40 dark:hover:bg-black/20 transition-colors cursor-pointer"
          onClick={() => onDetail('analytics', { title: 'CPL Analysis', data: marketingData })}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cost Per Lead
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display font-bold">$7.42</div>
            <div className="text-sm text-muted-foreground mt-1">Target: $10.00</div>
            <div className="mt-4 h-1 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[45%]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </motion.div>
)

export const InventoryView = ({
  onDetail,
  onSave,
  onAction,
}: {
  onDetail: (type: string, data?: any) => void
  onSave: () => void
  onAction: (action: string, item?: string) => void
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
    className="w-full max-w-5xl"
  >
    <ViewHeader
      title="Global Inventory"
      subtitle="Warehouse A • Real-time Tracking"
      onSave={onSave}
    />

    <Card className="glass-panel border-none overflow-hidden">
      <div className="p-0">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium">
            <tr>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Stock Level</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item, i) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b last:border-0 hover:bg-muted/30 transition-colors group"
              >
                <td
                  className="px-6 py-4 font-medium flex items-center gap-3 cursor-pointer"
                  onClick={() => onDetail('product', item)}
                >
                  <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-muted-foreground">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    {item.item}
                    <div className="text-xs text-muted-foreground font-normal">{item.supplier}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-full bg-secondary h-2 rounded-full max-w-[100px] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.stock < 20 ? 'bg-red-500' : 'bg-primary'}`}
                      style={{ width: `${(item.stock / 150) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {item.stock} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                    ${
                      item.status === 'Critical'
                        ? 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900'
                        : item.status === 'Low Stock'
                          ? 'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-900'
                          : 'bg-green-500/10 text-green-600 border-green-200 dark:border-green-900'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'Critical'
                          ? 'bg-red-500'
                          : item.status === 'Low Stock'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                    />
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
                    onClick={() => onAction(`Reorder ${item.item}`, item.item)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Reorder
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </motion.div>
)

export const OrgView = ({
  onDetail,
  onSave,
  onAction,
}: {
  onDetail: (type: string, data?: any) => void
  onSave: () => void
  onAction: (action: string) => void
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
    className="w-full max-w-6xl"
  >
    <ViewHeader title="Org Structure" subtitle="Engineering & Product Leadership" onSave={onSave} />

    <div className="flex flex-wrap justify-center gap-8">
      {orgData.map((person, i) => (
        <motion.div
          key={person.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <Card
            className="w-72 glass-panel border-none hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer overflow-hidden"
            onClick={() => onDetail('profile', person)}
          >
            <div className="h-24 bg-linear-to-br from-blue-500/20 to-purple-500/20" />
            <CardContent className="p-6 pt-0 flex flex-col items-center text-center -mt-12">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-background shadow-lg relative group-hover:scale-105 transition-transform">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display font-semibold text-xl">{person.name}</h3>
              <p className="text-primary font-medium mb-1">{person.role}</p>
              <p className="text-sm text-muted-foreground mb-4">{person.department}</p>

              <div className="w-full pt-4 border-t border-dashed border-border grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-secondary/50 rounded-lg">
                  <div className="text-muted-foreground mb-1">Reports</div>
                  <div className="font-bold text-lg">{person.reports}</div>
                </div>
                <div className="text-center p-2 bg-secondary/50 rounded-lg">
                  <div className="text-muted-foreground mb-1">Projects</div>
                  <div className="font-bold text-lg">{person.projects.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </motion.div>
)

export const OperationsView = ({
  onDetail,
  onSave,
  onAction,
}: {
  onDetail: (type: string, data?: any) => void
  onSave: () => void
  onAction: (action: string) => void
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, filter: 'blur(10px)' }}
    className="w-full max-w-5xl"
  >
    <ViewHeader
      title="System Operations"
      subtitle="Live Infrastructure Monitoring"
      onSave={onSave}
    />

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Server Load', value: '42%', icon: Server, color: 'text-blue-500' },
        { label: 'Power Usage', value: '1.2kW', icon: Zap, color: 'text-yellow-500' },
        { label: 'Active Nodes', value: '8/10', icon: Cpu, color: 'text-green-500' },
        { label: 'Region', value: 'US-East', icon: MapPin, color: 'text-purple-500' },
      ].map((stat, i) => (
        <Card key={i} className="glass-panel border-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`p-2 rounded-full bg-secondary ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card
      className="glass-panel border-none cursor-pointer"
      onClick={() => onDetail('analytics', { title: 'Load Analysis', data: operationsData })}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Load vs Temperature</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 text-xs">
          Deep Dive <ArrowRight className="ml-1 w-3 h-3" />
        </Button>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={operationsData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="load"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="var(--color-destructive)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </motion.div>
)
