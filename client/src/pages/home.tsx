import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
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
} from 'recharts'
import {
  MarketingView,
  InventoryView,
  OrgView,
  OperationsView,
  ViewType,
} from '@/components/flux-views'
import {
  ArrowRight,
  Sparkles,
  Command,
  Save,
  Share2,
  LayoutGrid,
  MessageSquareText,
  Lightbulb,
  X,
  History,
  Settings2,
  MoreHorizontal,
  Maximize2,
  Check,
  CheckCircle2,
  Circle,
  Loader2,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
} from 'lucide-react'

// --- Components ---

const FluxIntelligence = ({
  isOpen,
  onClose,
  context,
}: {
  isOpen: boolean
  onClose: () => void
  context: ViewType
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 bottom-0 w-80 md:w-96 bg-background/80 backdrop-blur-2xl border-l border-border z-40 shadow-2xl p-6 pt-20"
        >
          <Button variant="ghost" size="icon" className="absolute top-6 right-6" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 text-primary font-display font-bold text-lg mb-6">
            <Sparkles className="w-5 h-5" />
            Flux Intelligence
          </div>

          <ScrollArea className="h-[calc(100vh-120px)] pr-4">
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Key Insight
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {context === 'marketing' &&
                    "Spend is trending up 12.5% but Cost Per Lead (CPL) is 25% below target. This suggests high campaign efficiency. Consider increasing budget on 'LinkedIn' channel."}
                  {context === 'inventory' &&
                    'MacBook Pro stock is healthy, but Herman Miller chairs are at critical levels. Reorder triggered automatically for 50 units.'}
                  {context === 'org' &&
                    "Engineering team is currently at 98% capacity. Two open roles in 'Platform' are blocking the Q3 roadmap."}
                  {context === 'operations' &&
                    'Server load spike detected at 12:00. Correlates with the marketing email blast. Auto-scaling handled the load successfully.'}
                  {context === 'blank' &&
                    "I'm ready to analyze your data. Generate a view to get started."}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Suggested Actions
                </h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-xs h-9">
                    Download PDF Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-xs h-9">
                    Share Snapshot with Team
                  </Button>
                  {context === 'marketing' && (
                    <Button variant="outline" className="w-full justify-start text-xs h-9">
                      Optimize Ad Spend
                    </Button>
                  )}
                  {context === 'inventory' && (
                    <Button variant="outline" className="w-full justify-start text-xs h-9">
                      Approve Reorder ($12k)
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const ActionHistoryPanel = ({
  isOpen,
  onClose,
  actions,
}: {
  isOpen: boolean
  onClose: () => void
  actions: { id: string; name: string; time: string; status: string }[]
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 bottom-0 w-80 md:w-96 bg-background/80 backdrop-blur-2xl border-l border-border z-40 shadow-2xl p-6 pt-20"
        >
          <Button variant="ghost" size="icon" className="absolute top-6 right-6" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 text-primary font-display font-bold text-lg mb-6">
            <History className="w-5 h-5" />
            Action History
          </div>

          <ScrollArea className="h-[calc(100vh-120px)] pr-4">
            <div className="space-y-3">
              {actions.length === 0 && (
                <div className="text-xs text-muted-foreground italic text-center py-4">
                  No actions executed yet.
                </div>
              )}
              {actions.map((action, i) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-3 rounded-lg bg-background border border-border/50 text-xs relative overflow-hidden group"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
                  <div className="font-medium mb-1 truncate">{action.name}</div>
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>{action.time}</span>
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-3 h-3" /> Done
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Profile Modal for Org View
const ProfileModal = ({ data, onClose }: { data: any; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-background/60 backdrop-blur-sm"
      onClick={onClose}
    />
    <motion.div
      layoutId={`person-${data.id}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="w-full max-w-2xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden relative z-10 flex flex-col md:flex-row h-[600px] md:h-[450px]"
    >
      <div className="w-full md:w-1/3 bg-muted/30 p-8 flex flex-col items-center border-r border-border/50">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl mb-6">
          <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
        </div>
        <h2 className="font-display font-bold text-xl text-center">{data.name}</h2>
        <p className="text-primary font-medium text-sm text-center mb-6">{data.role}</p>

        <div className="w-full space-y-3">
          <div className="flex items-center text-xs text-muted-foreground gap-3">
            <Mail className="w-4 h-4" /> {data.email}
          </div>
          <div className="flex items-center text-xs text-muted-foreground gap-3">
            <Phone className="w-4 h-4" /> {data.phone}
          </div>
          <div className="flex items-center text-xs text-muted-foreground gap-3">
            <MapPin className="w-4 h-4" /> {data.location}
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display font-bold text-lg">Employee Profile</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Direct Reports
            </div>
            <div className="text-2xl font-bold font-display">{data.reports}</div>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Tenure
            </div>
            <div className="text-2xl font-bold font-display">3.2 Yrs</div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" /> Active Projects
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.projects.map((p: string) => (
                <Badge key={p} variant="secondary">
                  {p}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" /> Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s: string) => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
)

// Generic Detail Modal for Charts
const ChartDetailModal = ({ data, onClose }: { data: any; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-3xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden relative z-10"
      >
        <div className="h-20 bg-linear-to-r from-primary/10 to-purple-500/10 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold">{data.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-6">
          {data.title === 'Total Spend Breakdown' ? (
            <div className="h-[400px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.data.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="spend"
                    stroke="var(--color-primary)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                  {data.data[0].leads && (
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="var(--color-chart-3)"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">Export Data</Button>
            <Button>Generate Report</Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Action Execution Modal
const ActionExecutionModal = ({
  action,
  onClose,
  onComplete,
}: {
  action: string
  onClose: () => void
  onComplete: () => void
}) => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    // Simulate action execution steps
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3200),
      setTimeout(() => {
        onComplete()
      }, 4000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const steps = [
    { label: 'Validating Request', desc: 'Checking inventory limits...' },
    { label: 'Generating Purchase Order', desc: 'PO #4928-B created...' },
    { label: 'Notifying Supplier', desc: 'Email sent to logistics@apple.com...' },
    { label: 'Action Completed', desc: 'Inventory updated.' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border shadow-2xl rounded-2xl overflow-hidden relative z-10 p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-xl font-display font-bold mb-2">Executing Action</h2>
          <p className="text-muted-foreground">{action}</p>
        </div>

        <div className="space-y-6 relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border -z-10" />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: step >= i ? 1 : 0.5, x: 0 }}
              className="flex gap-4 items-start"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors duration-500
                  ${
                    step > i
                      ? 'bg-green-500 border-green-500 text-white'
                      : step === i
                        ? 'bg-background border-primary text-primary'
                        : 'bg-background border-muted text-muted-foreground'
                  }`}
              >
                {step > i ? (
                  <Check className="w-4 h-4" />
                ) : step === i ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Circle className="w-3 h-3" />
                )}
              </div>
              <div className={`${step === i ? 'text-foreground' : 'text-muted-foreground'}`}>
                <div className="font-semibold text-sm">{s.label}</div>
                <div className="text-xs">{s.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const SavedViewsDock = ({
  views,
  onSelect,
}: {
  views: { id: string; name: string; type: ViewType }[]
  onSelect: (type: ViewType) => void
}) => (
  <motion.div
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 hidden xl:flex"
  >
    {views.map((v, i) => (
      <TooltipButton key={v.id} label={v.name} onClick={() => onSelect(v.type)}>
        <div className="w-10 h-10 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group">
          <LayoutGrid className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </TooltipButton>
    ))}
  </motion.div>
)

const TooltipButton = ({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
}) => (
  <div className="relative group flex items-center" onClick={onClick}>
    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
      {label}
    </div>
    {children}
  </div>
)

// --- Main Application ---

export default function FluxCore() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<ViewType>('blank')
  const [isThinking, setIsThinking] = useState(false)
  const [showIntelligence, setShowIntelligence] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [detailConfig, setDetailConfig] = useState<{ type: string; data: any } | null>(null)
  const [savedViews, setSavedViews] = useState<{ id: string; name: string; type: ViewType }[]>([])
  const [actionQueue, setActionQueue] = useState<
    { id: string; name: string; time: string; status: string }[]
  >([])
  const [executingAction, setExecutingAction] = useState<string | null>(null)

  // Suggested Actions based on current view
  const suggestions = {
    blank: [
      'Visualize marketing spend',
      'Summon inventory tracker',
      'View org hierarchy',
      'Monitor system ops',
    ],
    marketing: ['Add trend line', 'Compare with last year', 'Show ROI breakdown', 'Email to CFO'],
    inventory: [
      'Filter by critical stock',
      'Predict Q4 shortages',
      'Show supplier map',
      'Bulk reorder',
    ],
    org: ['Show open roles', 'Highlight flight risks', 'View salary bands', 'Reorg simulation'],
    operations: [
      'Show error logs',
      'Scale up database',
      'Restart regional pod',
      'View security audit',
    ],
    'supply-chain': [],
  }

  const processQuery = (q: string) => {
    if (!q.trim()) return
    setIsThinking(true)

    // Log the prompt as an action
    const newAction = {
      id: Math.random().toString(36),
      name: `Generated: ${q}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'done',
    }
    setActionQueue(prev => [newAction, ...prev])

    // Simulate AI latency
    setTimeout(() => {
      setIsThinking(false)
      const lowerQ = q.toLowerCase()

      // Intent mapping
      if (lowerQ.includes('save')) {
        handleSave()
        return
      }
      if (lowerQ.includes('analysis') || lowerQ.includes('insight') || lowerQ.includes('review')) {
        setShowIntelligence(true)
        return
      }
      if (lowerQ.includes('history') || lowerQ.includes('log') || lowerQ.includes('actions')) {
        setShowHistory(true)
        return
      }

      if (lowerQ.includes('market') || lowerQ.includes('spend')) setView('marketing')
      else if (lowerQ.includes('inventory') || lowerQ.includes('stock')) setView('inventory')
      else if (lowerQ.includes('org') || lowerQ.includes('people')) setView('org')
      else if (lowerQ.includes('ops') || lowerQ.includes('system') || lowerQ.includes('server'))
        setView('operations')
      else setView('marketing') // Fallback

      setQuery('') // Clear after success
    }, 1000)
  }

  const handleSave = () => {
    if (view === 'blank') return
    const newSave = {
      id: Math.random().toString(36),
      name: `${view.charAt(0).toUpperCase() + view.slice(1)} Dashboard`,
      type: view,
    }
    setSavedViews(prev => [...prev, newSave])
    setActionQueue(prev => [
      {
        id: Math.random().toString(36),
        name: `Saved View: ${view}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'done',
      },
      ...prev,
    ])
  }

  const handleActionStart = (actionName: string) => {
    setExecutingAction(actionName)
  }

  const handleActionComplete = () => {
    if (executingAction) {
      setActionQueue(prev => [
        {
          id: Math.random().toString(36),
          name: executingAction,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'done',
        },
        ...prev,
      ])
      setExecutingAction(null)
    }
  }

  const handleDetail = (type: string, data?: any) => {
    setDetailConfig({ type, data })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processQuery(query)
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden selection:bg-primary/10">
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Navigation / Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <div
          className="flex items-center gap-2 cursor-pointer font-display font-bold text-xl tracking-tight pointer-events-auto"
          onClick={() => setView('blank')}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
            FluxCore
          </span>
        </div>

        <div className="flex gap-2 pointer-events-auto">
          {savedViews.length > 0 && (
            <div className="flex -space-x-2 mr-4">
              {savedViews.map((v, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-[10px] font-bold uppercase"
                  title={v.name}
                >
                  {v.name[0]}
                </div>
              ))}
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full hover:bg-secondary transition-colors ${showHistory ? 'bg-secondary text-primary' : ''}`}
            onClick={() => {
              setShowHistory(!showHistory)
              setShowIntelligence(false)
            }}
            title="Action History"
          >
            <History className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full hover:bg-secondary transition-colors ${showIntelligence ? 'bg-secondary text-primary' : ''}`}
            onClick={() => {
              setShowIntelligence(!showIntelligence)
              setShowHistory(false)
            }}
            title="Flux Intelligence"
          >
            <MessageSquareText className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-secondary transition-colors"
          >
            <Settings2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <FluxIntelligence
        isOpen={showIntelligence}
        onClose={() => setShowIntelligence(false)}
        context={view}
      />
      <ActionHistoryPanel
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        actions={actionQueue}
      />

      {/* Modals */}
      <AnimatePresence>
        {detailConfig?.type === 'profile' && (
          <ProfileModal data={detailConfig.data} onClose={() => setDetailConfig(null)} />
        )}
        {(detailConfig?.type === 'analytics' || detailConfig?.type === 'spend-breakdown') && (
          <ChartDetailModal data={detailConfig.data} onClose={() => setDetailConfig(null)} />
        )}
        {executingAction && (
          <ActionExecutionModal
            action={executingAction}
            onClose={() => setExecutingAction(null)}
            onComplete={handleActionComplete}
          />
        )}
      </AnimatePresence>

      <SavedViewsDock views={savedViews} onSelect={setView} />

      {/* Main Content Area */}
      <main className="relative z-10 container mx-auto px-4 h-screen flex flex-col items-center justify-center">
        {/* Dynamic Generative View */}
        <div className="flex-1 w-full flex items-center justify-center min-h-0 py-20 md:py-8 overflow-y-auto md:overflow-visible no-scrollbar">
          <AnimatePresence mode="wait">
            {view === 'blank' && (
              <motion.div
                key="blank"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center space-y-6 max-w-lg"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium border border-secondary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Liquid ERP Engine Active
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-primary">
                  The Universal Interface Layer.
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Stop building dashboards. Summon them.
                  <br />
                  <span className="text-sm opacity-80 mt-2 block">
                    FluxCore acts as a liquid interface layer over your enterprise data. No menus,
                    no navigation—just the exact tool you need, the moment you need it.
                  </span>
                </p>
              </motion.div>
            )}

            {view === 'marketing' && (
              <MarketingView
                key="marketing"
                onDetail={handleDetail}
                onSave={handleSave}
                onAction={handleActionStart}
              />
            )}
            {view === 'inventory' && (
              <InventoryView
                key="inventory"
                onDetail={handleDetail}
                onSave={handleSave}
                onAction={handleActionStart}
              />
            )}
            {view === 'org' && (
              <OrgView
                key="org"
                onDetail={handleDetail}
                onSave={handleSave}
                onAction={handleActionStart}
              />
            )}
            {view === 'operations' && (
              <OperationsView
                key="operations"
                onDetail={handleDetail}
                onSave={handleSave}
                onAction={handleActionStart}
              />
            )}
          </AnimatePresence>
        </div>

        {/* The Prompt Bar */}
        <motion.div
          layout
          className={`w-full max-w-2xl mx-auto mb-8 z-30 transition-all duration-500 ${view === 'blank' ? 'scale-100' : 'scale-90 opacity-90 hover:opacity-100 hover:scale-100'}`}
        >
          {/* Suggestion Chips */}
          <div className="flex justify-center gap-2 mb-4 flex-wrap px-4">
            <AnimatePresence>
              {suggestions[view]?.map((s, i) => (
                <motion.button
                  key={s}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-md border border-white/20 dark:border-white/10 text-xs font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors shadow-sm"
                  onClick={() => setQuery(s)}
                >
                  {s}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="relative group">
            {/* Thinking Indicator Overlay */}
            <AnimatePresence>
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-10 left-0 right-0 flex justify-center"
                >
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-2 backdrop-blur-md border border-primary/20">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    Thinking...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing Border Effect */}
            <div
              className={`absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${isThinking ? 'animate-pulse-glow opacity-60' : ''}`}
            />

            {/* Input Container */}
            <div className="relative bg-background/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl overflow-hidden flex items-center p-2 transition-shadow group-focus-within:shadow-primary/20">
              <div className="pl-4 pr-3 text-muted-foreground">
                {isThinking ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5 text-purple-500" />
                  </motion.div>
                ) : (
                  <Command className="w-5 h-5" />
                )}
              </div>

              <Input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={
                  view === 'blank'
                    ? "Summon an interface (e.g., 'Visualize Q3 supply chain risks')"
                    : "Refine this view (e.g., 'Add a Gantt chart for timeline')"
                }
                className="border-none shadow-none focus-visible:ring-0 bg-transparent text-lg h-14 px-2 placeholder:text-muted-foreground/50 font-medium"
                autoFocus
              />

              <div className="flex items-center gap-1 pr-1">
                {query && (
                  <span className="hidden md:inline-flex text-[10px] uppercase font-bold text-muted-foreground mr-2 bg-muted px-1.5 py-0.5 rounded">
                    Enter
                  </span>
                )}
                <Button
                  type="submit"
                  size="icon"
                  className={`h-10 w-10 rounded-xl transition-all shadow-lg shrink-0 ${query ? 'bg-primary hover:bg-primary/90 hover:shadow-primary/25 translate-x-0 opacity-100' : 'bg-muted text-muted-foreground translate-x-2 opacity-0 pointer-events-none'}`}
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
