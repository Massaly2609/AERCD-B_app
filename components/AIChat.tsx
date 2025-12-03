import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, X, Loader2, Sparkles } from 'lucide-react';
import { UFRS } from '../constants';

// NOTE: In a real app, this key should be in process.env.API_KEY.
// For this generated code to work in a local test environment without .env setup, 
// ensure you have the API key available or mock the response.
// Here we assume standard setup.
const API_KEY = process.env.API_KEY || ''; 

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bonjour ! Je suis l\'assistant virtuel de l\'AERCD-B. Je peux vous aider à trouver votre orientation, des infos sur les UFR ou des cours. Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      if (!API_KEY) {
        // Fallback for demo if no key
        setTimeout(() => {
           setMessages(prev => [...prev, { role: 'model', text: "Pour utiliser l'IA, veuillez configurer une clé API Gemini valide. En attendant, je vous suggère de visiter la page 'Cours & TD'." }]);
           setLoading(false);
        }, 1000);
        return;
      }

      const ai = new GoogleGenAI({ apiKey: API_KEY });
      
      // Build context from constants
      const context = `
        Tu es un assistant pour le site de l'AERCD-B (Amicale des Étudiants Ressortissants de Diembering à Bambey).
        Voici les informations sur les UFRs de l'Université Alioune Diop de Bambey (UADB):
        ${JSON.stringify(UFRS)}
        
        Tes missions : 
        1. Orienter les nouveaux bacheliers.
        2. Expliquer les filières disponibles dans les UFR SATIC, SDD, ECOMIJ.
        3. Encourager à utiliser la section 'Cours' pour télécharger des documents.
        4. Être poli, concis, et motivant.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: context + "\n\nQuestion de l'étudiant: " + userMsg }] }
        ],
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "Désolé, je n'ai pas pu traiter votre demande." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Erreur de connexion au service IA." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-2xl w-80 sm:w-96 border border-slate-200 overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-yellow-300" />
              <h3 className="font-semibold">Assistant AERCD-B</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-3" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-lg rounded-bl-none shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                  <span className="text-xs text-slate-500">Réflexion...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              className="flex-grow border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Posez une question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};
