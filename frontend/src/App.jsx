import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApiConnectionForm from './components/apiConnection';
import SuccessPage from './components/successWindow';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>API Connection Tester</h1>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<ApiConnectionForm />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>
        
        <footer>
          <p>&copy; 2023 API Connection Tester</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;