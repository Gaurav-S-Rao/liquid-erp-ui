import { Switch, Route } from 'wouter'
import FluxCore from '@/pages/home'
import NotFound from '@/pages/not-found'
import { Toaster } from '@/components/ui/toaster'

function Router() {
  return (
    <Switch>
      <Route path="/" component={FluxCore} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  )
}

export default App
