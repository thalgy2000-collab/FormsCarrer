import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Target, Sparkles, RefreshCcw, ArrowRight } from 'lucide-react';
import { mockQuestions } from './data/questions';
import { mockRoles } from './data/roles';
import { getInitialScores, analyzeUser, type AnalysisResult } from './utils/scoring';
import { supabase } from './lib/supabaseClient';
import type { UserScores, QuestionOption, Category } from './types';
import './index.css';

const DISCLAIMER_TEXT = "Não há resposta certa ou errada. Todas as respostas apenas demonstram seu viés no momento de tomar uma decisão.";

function App() {
  const [screen, setScreen] = useState<'intro' | 'questions' | 'lead' | 'result-category' | 'result-roles'>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<UserScores>(getInitialScores());
  const [answers, setAnswers] = useState<string[]>([]);
  const [lead, setLead] = useState({ name: '', email: '' });
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

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
    setAnswers(prev => [...prev, option.text]);

    if (qIndex < mockQuestions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setScreen('lead');
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lead.name.trim() && lead.email.trim()) {
      const result = analyzeUser(scores, mockRoles);
      setAnalysis(result);
      
      // Fire and forget Supabase insert
      const saveToSupabase = async () => {
        if (!supabase) return;
        try {
          const payload = {
            name: lead.name,
            email: lead.email,
            answers: answers,
            score_x: scores.axis.x,
            score_y: scores.axis.y,
            category_scores: scores.categories,
            dominant_category: result.dominantCategory,
            secondary_category: result.secondaryCategory,
            top_3_cargos: result.topRoles.map(r => ({ name: r.role.name, score: r.score }))
          };
          const { error } = await supabase.from('quiz_responses').insert([payload]);
          if (error) {
            console.error('Silent error: Failed to save to Supabase:', error);
          }
        } catch (err) {
          console.error('Unexpected error while saving to Supabase:', err);
        }
      };
      saveToSupabase();

      setScreen('result-category');
    }
  };

  const handleReset = () => {
    setScores(getInitialScores());
    setAnswers([]);
    setQIndex(0);
    setLead({ name: '', email: '' });
    setAnalysis(null);
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
            
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '1.2rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: '1.5' }}>
                {DISCLAIMER_TEXT}
              </p>
            </div>

            <div>
              <button className="btn-primary" onClick={handleStart} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Iniciar Avaliação <ChevronRight size={20} />
              </button>
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Leva menos de 3 minutos.
            </p>
          </motion.div>
        )}

        {screen === 'questions' && (
          <motion.div key={`q-${qIndex}`} {...fadeVariants} className="glass-panel" style={{ padding: '2.5rem 2.5rem 5.5rem 2.5rem', position: 'relative' }}>
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
            
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '0', width: '100%', padding: '0 2.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
                {DISCLAIMER_TEXT}
              </p>
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
                placeholder="Seu e-mail (obrigatório)"
                className="form-input"
                required
                value={lead.email}
                onChange={e => setLead({ ...lead, email: e.target.value })}
              />
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Ver Meus Resultados
              </button>
            </form>
          </motion.div>
        )}

        {screen === 'result-category' && analysis && (
          <motion.div key="result-category" {...fadeVariants} className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--brand-gradient)', padding: '16px', borderRadius: '50%' }}>
                <Target size={40} color="white" />
              </div>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Seu perfil dominante é:
            </p>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', textTransform: 'uppercase' }} className="text-gradient">
              {analysis.dominantCategory}
            </h2>
            
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'white' }}>
              Sua forma de resolver problemas mostrou um viés forte por <strong>{analysis.dominantCategory.toUpperCase()}</strong> — {analysis.dominantPattern}.
            </p>

            {analysis.secondaryCategory && (
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'inline-block' }}>
                <span style={{ opacity: 0.7 }}>Influência secundária:</span> <strong style={{ color: '#d8b4fe', opacity: 1 }}>{analysis.secondaryCategory}</strong>
              </p>
            )}
            
            <div style={{ display: 'block' }}>
              <button className="btn-primary" onClick={() => setScreen('result-roles')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Ver meus cargos ideais <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'result-roles' && analysis && (
          <motion.div key="result-roles" {...fadeVariants} className="glass-panel" style={{ padding: '3rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                Seu Match de <span className="text-gradient">Carreira</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Baseado no seu perfil dominante ({analysis.dominantCategory}), aqui estão os 3 papéis mais compatíveis na matriz.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {analysis.topRoles.map((match, idx) => (
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
