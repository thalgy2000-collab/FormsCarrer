import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Target, Sparkles, RefreshCcw, ArrowRight, DollarSign, BookOpen, Lightbulb, Wrench } from 'lucide-react';
import { roleContents } from './data/roleContent';
import marketCourses from './data/marketCourses';
import { mockQuestions } from './data/questions';
import { mockRoles } from './data/roles';
import { categoryDefaults } from './data/categoryDefaults';
import { getInitialScores, analyzeUser, type AnalysisResult } from './utils/scoring';
import { supabase } from './lib/supabaseClient';
import type { UserScores, QuestionOption, Category } from './types';
import './index.css';

const DISCLAIMER_TEXT = "Não há resposta certa ou errada. Todas as respostas apenas demonstram seu viés no momento de tomar uma decisão.";

const urlParams = new URLSearchParams(window.location.search);
const canal = urlParams.get('canal');

function App() {
  const [screen, setScreen] = useState<'intro' | 'questions' | 'lead' | 'loading' | 'result-category' | 'result-roles' | 'action-plan'>('intro');
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);

  const loadingMessages = [
    "Analisando sua tomada de decisão e Product Taste...",
    "Cruzando seu perfil com as demandas do mercado de tecnologia...",
    "Estruturando os próximos passos do seu PDI...",
    "Tudo pronto!"
  ];

  React.useEffect(() => {
    if (screen === 'loading') {
      let currentIdx = 0;
      setLoadingIndex(0);
      const textInterval = setInterval(() => {
        currentIdx++;
        if (currentIdx < loadingMessages.length) {
          setLoadingIndex(currentIdx);
        }
      }, 1500);

      const timeout = setTimeout(() => {
        clearInterval(textInterval);
        setScreen('result-category');
      }, 5500);

      return () => {
        clearInterval(textInterval);
        clearTimeout(timeout);
      };
    }
  }, [screen]);
  const [scores, setScores] = useState<UserScores>(getInitialScores());
  const [scoresHistory, setScoresHistory] = useState<UserScores[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [lead, setLead] = useState({ name: '', email: '' });
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);

  const currentQuestion = mockQuestions[qIndex];
  const progress = ((qIndex) / mockQuestions.length) * 100;

  const handleStart = () => setScreen('questions');

  const handleOptionSelect = (option: QuestionOption) => {
    setScoresHistory(prev => [...prev, JSON.parse(JSON.stringify(scores))]);
    
    // Update scores using a deep copy to prevent mutating history states
    const newScores = JSON.parse(JSON.stringify(scores));
    
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

  const handleBack = () => {
    if (qIndex > 0) {
      const newHistory = [...scoresHistory];
      const previousScores = newHistory.pop();
      
      setQIndex(qIndex - 1);
      setScoresHistory(newHistory);
      if (previousScores) {
        setScores(previousScores);
      }
      setAnswers(prev => prev.slice(0, -1));
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

      // Envia para o Webhook
      const sendToWebhook = async () => {
        try {
          const webhookPayload = {
            nome: lead.name,
            email: lead.email,
            area: result.dominantCategory,
            cargo1: result.topRoles[0]?.role.name || '',
            cargo2: result.topRoles[1]?.role.name || '',
            cargo3: result.topRoles[2]?.role.name || '',
            dataHora: new Date().toISOString()
          };
          await fetch('https://rebuff-user-ability.ngrok-free.dev/webhook-test/b9a367fa-2c9f-4b80-b75b-bb2aacdc6247', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(webhookPayload)
          });
        } catch (err) {
          console.error('Erro ao enviar para o webhook:', err);
        }
      };
      sendToWebhook();

      setScreen('loading');
    }
  };

  const handleReset = () => {
    setScores(getInitialScores());
    setScoresHistory([]);
    setAnswers([]);
    setQIndex(0);
    setLead({ name: '', email: '' });
    setAnalysis(null);
    setSelectedRoleIndex(0);
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
            style={{ padding: 'clamp(1.5rem, 5vw, 3rem)', textAlign: 'center' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--brand-gradient)', padding: '16px', borderRadius: '50%' }}>
                <Target size={40} color="white" />
              </div>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 8vw, 2.5rem)', marginBottom: '1rem', wordBreak: 'break-word' }}>
              Descubra seu <span className="text-gradient">Caminho Ideal</span> em Tech
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: 'clamp(0.95rem, 4vw, 1.1rem)', lineHeight: '1.6' }}>
              Com base na Matriz de Carreira PM3, identifique os papéis em Produto e Tecnologia que mais combinam com o seu perfil, seja você especialista ou generalista, executor ou líder.
            </p>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '1.2rem', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              <p style={{ fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)', color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: '1.5' }}>
                {DISCLAIMER_TEXT}
              </p>
            </div>

            <div>
              <button className="btn-primary" onClick={handleStart} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: 'clamp(1rem, 4vw, 1.1rem)' }}>
                Iniciar Avaliação <ChevronRight size={20} />
              </button>
            </div>
            <p style={{ marginTop: '1.5rem', fontSize: 'clamp(0.8rem, 3vw, 0.9rem)', color: 'var(--text-secondary)' }}>
              Leva menos de 3 minutos.
            </p>
          </motion.div>
        )}

        {screen === 'questions' && (
          <motion.div key={`q-${qIndex}`} {...fadeVariants} className="glass-panel" style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontWeight: 600, fontSize: 'clamp(0.9rem, 3.5vw, 1rem)' }}>
                Pergunta {qIndex + 1} de {mockQuestions.length}
              </p>
              {qIndex > 0 && (
                <button 
                  onClick={handleBack}
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    color: 'var(--text-secondary)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    cursor: 'pointer',
                    fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)',
                    fontFamily: 'Outfit',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <ChevronLeft size={16} /> Voltar
                </button>
              )}
            </div>
            <h2 style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', marginBottom: '2rem', lineHeight: '1.4', wordBreak: 'break-word' }}>
              {currentQuestion.text}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
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
            
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(0.75rem, 3vw, 0.85rem)', color: 'rgba(255,255,255,0.35)', margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
                {DISCLAIMER_TEXT}
              </p>
            </div>
          </motion.div>
        )}

        {screen === 'lead' && (
          <motion.div key="lead" {...fadeVariants} className="glass-panel" style={{ padding: 'clamp(1.5rem, 5vw, 3rem)', textAlign: 'center' }}>
            <Sparkles size={40} color="#a855f7" style={{ margin: '0 auto 1.5rem' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', marginBottom: '1rem' }}>Quase lá!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: 'clamp(0.95rem, 4vw, 1rem)' }}>
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
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', fontSize: 'clamp(1rem, 4vw, 1.1rem)' }}>
                Ver Meus Resultados
              </button>
            </form>
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div
            key="loading"
            {...fadeVariants}
            className="glass-panel"
            style={{ padding: 'clamp(3rem, 8vw, 5rem)', textAlign: 'center', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                border: '4px solid rgba(255, 255, 255, 0.1)',
                borderLeftColor: '#a855f7',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <div style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={loadingIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', fontWeight: 500, color: 'white', margin: 0, lineHeight: '1.4' }}
                  >
                    {loadingMessages[loadingIndex]}
                  </motion.h3>
                </AnimatePresence>
              </div>
            </div>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </motion.div>
        )}

        {screen === 'result-category' && analysis && (
          <motion.div key="result-category" {...fadeVariants} className="glass-panel" style={{ padding: 'clamp(1.5rem, 5vw, 3rem)', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--brand-gradient)', padding: '16px', borderRadius: '50%' }}>
                <Target size={40} color="white" />
              </div>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 4vw, 1.1rem)', marginBottom: '0.5rem' }}>
              Seu perfil dominante é:
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', marginBottom: '1.5rem', textTransform: 'uppercase', wordBreak: 'break-word' }} className="text-gradient">
              {analysis.dominantCategory}
            </h2>
            
            <p style={{ fontSize: 'clamp(1rem, 4.5vw, 1.2rem)', lineHeight: '1.6', marginBottom: '1.5rem', color: 'white' }}>
              Sua forma de resolver problemas mostrou um viés forte por <strong>{analysis.dominantCategory.toUpperCase()}</strong> — {analysis.dominantPattern}.
            </p>

            {analysis.secondaryCategory && (
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 3.5vw, 1rem)', marginBottom: '2.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'inline-block' }}>
                <span style={{ opacity: 0.7 }}>Influência secundária:</span> <strong style={{ color: '#d8b4fe', opacity: 1, wordBreak: 'break-word' }}>{analysis.secondaryCategory}</strong>
              </p>
            )}
            
            <div style={{ display: 'block' }}>
              <button className="btn-primary" onClick={() => setScreen('result-roles')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: 'clamp(0.95rem, 4vw, 1.1rem)' }}>
                Ver meus cargos ideais <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'result-roles' && analysis && (
          <motion.div key="result-roles" {...fadeVariants} className="glass-panel" style={{ padding: 'clamp(1.5rem, 5vw, 3rem)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 7vw, 2.5rem)', marginBottom: '0.5rem', wordBreak: 'break-word' }}>
                Seu Match de <span className="text-gradient">Carreira</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 4vw, 1rem)' }}>
                Baseado no seu perfil dominante ({analysis.dominantCategory}), aqui estão os 3 papéis mais compatíveis na matriz.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {analysis.topRoles.map((match, idx) => {
                const richContent = roleContents[match.role.name];
                
                return (
                  <div key={match.role.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-glass)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {idx === 0 && (
                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '4px', height: '100%',
                        background: 'var(--brand-gradient)'
                      }}></div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ flex: '1 1 auto', minWidth: '0' }}>
                        <h3 style={{ fontSize: 'clamp(1.1rem, 4.5vw, 1.3rem)', color: idx === 0 ? '#d8b4fe' : 'white', wordBreak: 'break-word', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                          {idx + 1}. {match.role.name}
                        </h3>
                        {richContent && (
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px', marginBottom: 0, opacity: 0.9 }}>
                            {richContent.tagline}
                          </p>
                        )}
                      </div>
                      <span className="badge" style={{ flexShrink: 0 }}>{match.role.category}</span>
                    </div>
                    
                    <div>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '1.05rem', margin: 0 }}>
                        <BookOpen size={18} color="#a855f7" /> Sobre a carreira
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, marginTop: '8px' }}>
                        {richContent ? richContent.description : match.explanation}
                      </p>
                    </div>

                    <div style={{ marginTop: '0.5rem' }}>
                      <button 
                        onClick={() => { setSelectedRoleIndex(idx); setScreen('action-plan'); }}
                        style={{ 
                          background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', 
                          color: '#d8b4fe', padding: '10px 20px', borderRadius: '8px',
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 500, fontSize: '0.95rem',
                          transition: 'all 0.2s ease',
                          width: '100%', justifyContent: 'center'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'; }}
                      >
                        Ver detalhes completos <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {screen === 'action-plan' && analysis && (
          <motion.div
            key="action-plan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Informações do Cargo</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Seu próximo passo prático para migrar para <strong>{analysis.topRoles[selectedRoleIndex].role.name}</strong>.
              </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <button 
                onClick={() => setScreen('result-roles')}
                style={{ 
                  background: 'transparent', border: 'none', 
                  color: 'var(--text-secondary)',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  cursor: 'pointer', fontFamily: 'Outfit', fontSize: '1rem',
                  padding: 0
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <ChevronLeft size={20} /> Voltar aos resultados
              </button>
            </div>

            {(() => {
              const role = analysis.topRoles[selectedRoleIndex].role;
              const content = roleContents[role.name];
              const categoryDefault = categoryDefaults[role.category] || {
                reading: { title: "N/A", author: "N/A", description: "Leitura não encontrada para esta categoria." },
                nextSteps: ["Pesquisar mais sobre a área."]
              };
              const track = content?.recommendedTrack || categoryDefault.recommendedTrack;
              
              const isExternalChannel = canal && canal !== 'pm3';
              const specificMarketCourses = marketCourses[role.name];
              const extCourses = specificMarketCourses 
                ? specificMarketCourses.map(c => ({ title: c.title, provider: c.institution, description: c.reason, link: undefined }))
                : (content?.externalCourses || categoryDefault.externalCourses || []);
                
              const readings = content?.recommendedReading && content.recommendedReading.length > 0 ? content.recommendedReading : categoryDefault.reading;
              const nextSteps = content?.nextSteps && content.nextSteps.length > 0 ? content.nextSteps : categoryDefault.nextSteps;
              const hardSkills = content?.hardSkills || categoryDefault.hardSkills || [];
              const softSkills = content?.softSkills || categoryDefault.softSkills || [];

              const showMarketCourses = isExternalChannel && extCourses.length > 0;

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {track && (track.formacoes.length > 0 || track.sprints.length > 0) && (
                    <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d8b4fe', margin: '0 0 0.5rem 0' }}>
                        <Target size={20} /> Cursos Sugeridos
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', margin: '0 0 1.5rem 0', fontSize: '0.9rem' }}>
                        Formações e cursos para evoluir nesta carreira.
                      </p>

                      {showMarketCourses ? (
                        <div>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {extCourses.map((course, i) => (
                              <li key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #3b82f6' }}>
                                <div style={{ fontWeight: 600, color: 'white' }}>{course.title}</div>
                                <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '4px' }}>Por {course.provider}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{course.description}</div>
                                {course.link && <a href={course.link} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '8px', fontSize: '0.85rem', color: '#d8b4fe', textDecoration: 'none' }}>Ver curso →</a>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <>
                          {track.formacoes.length > 0 && (
                            <div style={{ marginBottom: '1rem' }}>
                              <h4 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.5rem', margin: 0 }}>Formações</h4>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {track.formacoes.map((formacao, i) => (
                                  <li key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #a855f7' }}>
                                    <div style={{ fontWeight: 600, color: 'white' }}>{formacao.title}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{formacao.description}</div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {track.sprints.length > 0 && (
                            <div>
                              <h4 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.5rem', margin: 0 }}>Sprints</h4>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {track.sprints.map((sprint, i) => (
                                  <span key={i} style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#d8b4fe', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem' }}>
                                    {sprint.title}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {content && (
                    <>
                      {/* Insights */}
                      <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d8b4fe', margin: '0 0 1rem 0' }}>
                          <Lightbulb size={20} /> Insights do Panorama 2024-2025
                        </h3>
                        {content.insights.length > 0 ? (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                            {content.insights.map((insight, i) => (
                              <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <h5 style={{ fontSize: '0.9rem', color: '#d8b4fe', margin: 0, marginBottom: '0.25rem' }}>{insight.title}</h5>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>{insight.value}</div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0, marginBottom: '0.5rem' }}>{insight.description}</p>
                                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>Fonte: {insight.source}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', margin: 0 }}>
                              Sem indicador específico para esta carreira nos dados carregados. Veja a página de mercado para o quadro geral.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Salário */}
                      <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d8b4fe', margin: '0 0 1rem 0' }}>
                          <DollarSign size={20} /> Faixa Salarial Base
                        </h3>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>
                                {content.salaryRange.currency} {content.salaryRange.min.toLocaleString('pt-BR')} - {content.salaryRange.max.toLocaleString('pt-BR')}{content.salaryRange.maxOpenEnded ? '+' : ''}
                              </span>
                              {content.salaryRange.panoramaAverage && (
                                <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '16px' }}>
                                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                                    {content.salaryRange.panoramaAverageLabel || 'Média'}
                                  </span>
                                  <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#d8b4fe' }}>
                                    {content.salaryRange.currency} {content.salaryRange.panoramaAverage.toLocaleString('pt-BR')}
                                  </span>
                                </div>
                              )}
                            </div>
                            <span style={{ 
                              fontSize: '0.75rem', 
                              padding: '2px 8px', 
                              borderRadius: '100px', 
                              background: content.salaryConfidence === 'alta' ? 'rgba(34, 197, 94, 0.2)' : content.salaryConfidence === 'media' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                              color: content.salaryConfidence === 'alta' ? '#4ade80' : content.salaryConfidence === 'media' ? '#facc15' : '#f87171',
                              border: `1px solid ${content.salaryConfidence === 'alta' ? 'rgba(34,197,94,0.3)' : content.salaryConfidence === 'media' ? 'rgba(234,179,8,0.3)' : 'rgba(239,68,68,0.3)'}`
                            }}>
                              Confiança {content.salaryConfidence.charAt(0).toUpperCase() + content.salaryConfidence.slice(1)}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                            Fonte: {content.salarySource} ({content.salaryRange.period})
                          </p>
                          {content.salaryRange.note && (
                            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', margin: 0, marginTop: '4px', fontStyle: 'italic' }}>
                              {content.salaryRange.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {readings && readings.length > 0 && (
                    <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d8b4fe', margin: '0 0 1rem 0' }}>
                        <BookOpen size={20} /> Leitura Recomendada
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {readings.map((reading, i) => (
                          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontWeight: 600, color: 'white', fontSize: '1.1rem', marginBottom: '2px' }}>
                              {reading.link ? (
                                <a href={reading.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }} onMouseOver={(e) => e.currentTarget.style.color = '#d8b4fe'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}>
                                  {reading.title} <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>↗</span>
                                </a>
                              ) : (
                                reading.title
                              )}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>por {reading.author}</div>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>{reading.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(hardSkills.length > 0 || softSkills.length > 0) && (
                    <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d8b4fe', margin: '0 0 1rem 0' }}>
                        <Wrench size={20} /> Habilidades para Desenvolver
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {hardSkills.length > 0 && (
                          <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Hard Skills</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {hardSkills.map((skill, i) => (
                                <span key={i} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.9rem' }}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {softSkills.length > 0 && (
                          <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Soft Skills</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {softSkills.map((skill, i) => (
                                <span key={i} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.9rem' }}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {nextSteps.length > 0 && (
                    <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2rem)' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d8b4fe', margin: '0 0 1rem 0' }}>
                        <Sparkles size={20} /> Próximos Passos
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {nextSteps.map((step, i) => (
                          <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe', fontSize: '0.8rem', fontWeight: 600, flexShrink: 0 }}>
                              {i + 1}
                            </span>
                            <span style={{ color: 'white', lineHeight: '1.5', marginTop: '2px' }}>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })()}

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
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
