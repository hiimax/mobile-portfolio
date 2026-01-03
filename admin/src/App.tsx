import DashboardLayout from "@/components/layout/DashboardLayout"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Dashboard from "@/pages/Dashboard"
import Projects from "@/pages/Projects"

const Settings = () => (
  <div className="flex flex-col gap-6">
    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
    <div className="rounded-lg border p-6">
      <p className="text-muted-foreground">Site configuration settings will go here.</p>
    </div>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
