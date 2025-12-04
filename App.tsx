import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { UFRView } from './pages/UFR';
import { Resources } from './pages/Resources';
import { Admin } from './pages/Admin';
import { Amicale } from './pages/Amicale';
import { Login } from './pages/Login';
import { AIChat } from './components/AIChat';

const { HashRouter: Router, Routes, Route } = ReactRouterDOM;

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ufr/:id" element={<UFRView />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/amicale" element={<Amicale />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
        <AIChat />
      </Router>
    </AppProvider>
  );
}

export default App;