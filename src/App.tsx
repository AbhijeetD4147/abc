import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PtHomePage from './pages/home/PtHomePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<PtHomePage />} />
      </Routes>
    </Router>
  )
}

export default App