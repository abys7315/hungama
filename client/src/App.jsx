import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RegistrationForm from './components/RegistrationForm';
import SuccessPage from './components/SuccessPage';
import EventPage from './components/EventPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      {/* Navbar appears on all pages */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path='/success' element={<SuccessPage/>} />  
        <Route path='/event' element={<EventPage/>} />  
      </Routes>
      
      {/* Footer appears on all pages */}
      <Footer />
    </Router>
  )
}

export default App