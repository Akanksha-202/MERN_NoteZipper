import './App.css';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import LandingPage from './screens/LandingPage/LandingPage';
import Login from './screens/Login/Login';
import SignUp from './screens/SignUp/SignUp';
import MyNotes from './screens/MyNotes/MyNotes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/mynotes' element={<MyNotes />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
