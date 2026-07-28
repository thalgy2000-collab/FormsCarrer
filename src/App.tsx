import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, Sparkles, RefreshCcw } from 'lucide-react';
import { mockQuestions } from './data/questions';
import { mockRoles } from './data/roles';
import { getInitialScores, calculateTopRoles } from './utils/scoring';
import type { UserScores, QuestionOption, Category } from './types';
import './index.css';

function App() {
  const [screen, setScreen] = useState<'intro' | 'questions' | 'lead' | 'result'>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<UserScores>(getInitialScores());
  const [lead, setLead] = useState({ name: '', email: '' });

  const currentQuestion = mockQuestions[qIndex];
  const progress = ((qIndex) / mockQuestions.length) * 100;

  const handleStart = () => setScreen('questions');

  const handleOptionSelect = (option: QuestionOption) => {
    // Update scores
    const newScores = { ...scores };
    
    if (option.scoreImpact.axis) {
      newScores.axis.x += option.scoreImpact.axis.x || 0;
      newScores.axis.y += option.scoreImpact.axis.y || 0;
      
      // Clamp values between 0 and 10
      newScores.axis.x = Math.max(0, Math.min(10, newScores.axis.x));
      newScores.axis.y = Math.max(0, Math.min(10, newScores.axis.y));
    }
    
    if (option.scoreImpact.categories) {
      Object.entries(option.scoreImpact.categories).forEach(([cat, val]) => {
        newScores.categories[cat as Category] = (newScores.categories[cat as Category] || 0) + val;
      });
    }

    setScores(newScores);

    if (qIndex < mockQuestions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setScreen('lead');
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lead.name.trim()) {
      setScreen('result');
    }
  };

  const handleReset = () => {
    setScores(getInitialScores());
    setQIndex(0);
    setLead({ name: '', email: '' });
    setScreen('intro');
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <motion.div
            key="intro"
            {...fadeVariants}
            className="glass-panel"
            style={{ padding: '3rem', textAlign: 'center' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--brand-gradient)', padding: '16px', borderRadius: '50%' }}>
                <Target size={40} color="white" />
              </div>
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              Descubra seu <span className="text-gradient">Caminho Ideal</span> em Tech
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Com base na Matriz de Carreira PM3, identifique os papéis em Produto e Tecnologia que mais combinam com o seu perfil, seja você especialista ou generalista, executor ou líder.
            </p>
            <button className="btn-primary" onClick={handleStart} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Iniciar Avaliação <ChevronRight size={20} />
            </button>
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Leva menos de 3 minutos.
            </p>
          </motion.div>
        )}

        {screen === 'questions' && (
          <motion.div key={`q-${qIndex}`} {...fadeVariants} className="glass-panel" style={{ padding: '2.5rem' }}>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 600 }}>
              Pergunta {qIndex + 1} de {mockQuestions.length}
            </p>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.4' }}>
              {currentQuestion.text}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt.id}
                  className="btn-option"
                  onClick={() => handleOptionSelect(opt)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {screen === 'lead' && (
          <motion.div key="lead" {...fadeVariants} className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <Sparkles size={40} color="#a855f7" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Quase lá!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Para onde devemos enviar os detalhes completos do seu resultado?
            </p>
            <form onSubmit={handleLeadSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Seu nome (obrigatório)"
                className="form-input"
                required
                value={lead.name}
                onChange={e => setLead({ ...lead, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Seu e-mail (opcional)"
                className="form-input"
                value={lead.email}
                onChange={e => setLead({ ...lead, email: e.target.value })}
              />
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Ver Meus Resultados
              </button>
            </form>
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div key="result" {...fadeVariants} className="glass-panel" style={{ padding: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                Seu Match de <span className="text-gradient">Carreira</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Baseado nas suas respostas, aqui estão os 3 papéis mais compatíveis.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {calculateTopRoles(scores, mockRoles).map((match, idx) => (
                <div key={match.role.id} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-glass)',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {idx === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, width: '4px', height: '100%',
                      background: 'var(--brand-gradient)'
                    }}></div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem', color: idx === 0 ? '#d8b4fe' : 'white' }}>
                      {idx + 1}. {match.role.name}
                    </h3>
                    <span className="badge">{match.role.category}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {match.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={handleReset}
                style={{ 
                  background: 'transparent', border: '1px solid var(--border-glass)', 
                  color: 'white', padding: '12px 24px', borderRadius: '100px',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer', fontFamily: 'Outfit'
                }}
              >
                <RefreshCcw size={16} /> Refazer Teste
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
