import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/index';
import PokemonDetails from '@/pages/PokemonDetails/index';
import ErrorPage from '@/pages/Error/index';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:id" element={<PokemonDetails />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
