import { Routes, Route } from 'react-router-dom';
import NavBar from './components/molecules/navBar/navBar';
import Home from './pages/home';
import Personal from './pages/personal';


function App() {
  return (
    <div className="app bg-[#ede9e9]">
      <NavBar />
      <div className='mx-4'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
