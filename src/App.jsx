import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/index';
import PokemonDetails from '@/pages/PokemonDetails/index';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/pokemon/:id" element={<PokemonDetails />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
