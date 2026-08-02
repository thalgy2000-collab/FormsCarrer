import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Target, Sparkles, RefreshCcw, ArrowRight, DollarSign, BookOpen, Lightbulb, Wrench } from 'lucide-react';
import { roleContents } from './data/roleContent';
import { mockQuestions } from './data/questions';
import { mockRoles } from './data/roles';
import { categoryDefaults } from './data/categoryDefaults';
import { getInitialScores, analyzeUser, type AnalysisResult } from './utils/scoring';
import { supabase } from './lib/supabaseClient';
import type { UserScores, QuestionOption, Category } from './types';
import './index.css';

const DISCLAIMER_TEXT = "Não há resposta certa ou errada. Todas as respostas apenas demonstram seu viés no momento de tomar uma decisão.";

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
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

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
    setExpandedRole(null);
    setScreen('intro');
  };

  const toggleExpandedRole = (roleName: string) => {
    setExpandedRole(prev => prev === roleName ? null : roleName);
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
                const categoryDefault = categoryDefaults[match.role.category];
                const isExpanded = expandedRole === match.role.name;
                
                const track = richContent?.recommendedTrack || categoryDefault?.recommendedTrack;
                const hardSkills = richContent?.hardSkills || categoryDefault?.hardSkills || [];
                const softSkills = richContent?.softSkills || categoryDefault?.softSkills || [];
                const nextSteps = (richContent?.nextSteps && richContent.nextSteps.length > 0) ? richContent.nextSteps : (categoryDefault?.nextSteps || []);

                return (
                  <div key={match.role.id} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-glass)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => toggleExpandedRole(match.role.name)}
                  >
                    {idx === 0 && (
                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '4px', height: '100%',
                        background: 'var(--brand-gradient)'
                      }}></div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ flex: '1 1 auto', minWidth: '0' }}>
                        <h3 style={{ fontSize: 'clamp(1.1rem, 4.5vw, 1.3rem)', color: idx === 0 ? '#d8b4fe' : 'white', wordBreak: 'break-word', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                          {idx + 1}. {match.role.name}
                          <span style={{ color: 'var(--text-secondary)', display: 'flex' }}>
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </span>
                        </h3>
                        {richContent && (
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px', marginBottom: 0, opacity: 0.9 }}>
                            {richContent.tagline}
                          </p>
                        )}
                      </div>
                      <span className="badge" style={{ flexShrink: 0 }}>{match.role.category}</span>
                    </div>
                    
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 3.5vw, 0.95rem)', lineHeight: '1.6', wordBreak: 'break-word', marginBottom: isExpanded ? '1.5rem' : '0' }}>
                      {match.explanation}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                          onClick={(e) => e.stopPropagation()} // prevent accordion toggle when interacting inside
                        >
                          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            
                            {/* Conteúdo Específico do Cargo (se existir) */}
                            {richContent && (
                              <>
                                {/* Descrição */}
                                <div>
                                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '1.05rem', margin: 0 }}>
                                    <BookOpen size={18} color="#a855f7" /> Sobre a carreira
                                  </h4>
                                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, marginTop: '8px' }}>
                                    {richContent.description}
                                  </p>
                                </div>

                                {/* Salário */}
                                <div>
                                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '1.05rem', margin: 0 }}>
                                    <DollarSign size={18} color="#a855f7" /> Faixa Salarial Base
                                  </h4>
                                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white' }}>
                                          {richContent.salaryRange.currency} {richContent.salaryRange.min.toLocaleString('pt-BR')} - {richContent.salaryRange.max.toLocaleString('pt-BR')}{richContent.salaryRange.maxOpenEnded ? '+' : ''}
                                        </span>
                                        {richContent.salaryRange.panoramaAverage && (
                                          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '16px' }}>
                                            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                                              {richContent.salaryRange.panoramaAverageLabel || 'Média'}
                                            </span>
                                            <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#d8b4fe' }}>
                                              {richContent.salaryRange.currency} {richContent.salaryRange.panoramaAverage.toLocaleString('pt-BR')}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                      <span style={{ 
                                        fontSize: '0.75rem', 
                                        padding: '2px 8px', 
                                        borderRadius: '100px', 
                                        background: richContent.salaryConfidence === 'alta' ? 'rgba(34, 197, 94, 0.2)' : richContent.salaryConfidence === 'media' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                        color: richContent.salaryConfidence === 'alta' ? '#4ade80' : richContent.salaryConfidence === 'media' ? '#facc15' : '#f87171',
                                        border: `1px solid ${richContent.salaryConfidence === 'alta' ? 'rgba(34,197,94,0.3)' : richContent.salaryConfidence === 'media' ? 'rgba(234,179,8,0.3)' : 'rgba(239,68,68,0.3)'}`
                                      }}>
                                        Confiança {richContent.salaryConfidence.charAt(0).toUpperCase() + richContent.salaryConfidence.slice(1)}
                                      </span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                                      Fonte: {richContent.salarySource} ({richContent.salaryRange.period})
                                    </p>
                                    {richContent.salaryRange.note && (
                                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', margin: 0, marginTop: '4px', fontStyle: 'italic' }}>
                                        {richContent.salaryRange.note}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Insights */}
                                <div>
                                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '1.05rem', margin: 0 }}>
                                    <Lightbulb size={18} color="#a855f7" /> Insights do Panorama 2024-2025
                                  </h4>
                                  {richContent.insights.length > 0 ? (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '8px' }}>
                                      {richContent.insights.map((insight, i) => (
                                        <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                          <h5 style={{ fontSize: '0.9rem', color: '#d8b4fe', margin: 0, marginBottom: '0.25rem' }}>{insight.title}</h5>
                                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>{insight.value}</div>
                                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0, marginBottom: '0.5rem' }}>{insight.description}</p>
                                          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>Fonte: {insight.source}</p>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '8px' }}>
                                      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', margin: 0 }}>
                                        Sem indicador específico para esta carreira nos dados carregados. Veja a página de mercado para o quadro geral.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </>
                            )}

                            {/* Trilha (Fallback ou Específico) */}
                            {track && (track.formacoes.length > 0 || track.sprints.length > 0) && (
                              <div>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '1.05rem', margin: 0 }}>
                                  <Target size={18} color="#a855f7" /> Trilha Recomendada PM3
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '8px' }}>
                                  {track.formacoes.length > 0 && (
                                    <div>
                                      <h5 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', margin: 0, marginBottom: '0.5rem' }}>Formações</h5>
                                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {track.formacoes.map((formacao, i) => (
                                          <li key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '3px solid #a855f7' }}>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white' }}>{formacao.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formacao.description}</div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {track.sprints.length > 0 && (
                                    <div>
                                      <h5 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', margin: 0, marginBottom: '0.5rem' }}>Sprints</h5>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {track.sprints.map((sprint, i) => (
                                          <span key={i} style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', color: '#d8b4fe' }}>
                                            {sprint.title}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Skills (Fallback ou Específico) */}
                            {(hardSkills.length > 0 || softSkills.length > 0) && (
                              <div>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '1.05rem', margin: 0 }}>
                                  <Wrench size={18} color="#a855f7" /> Habilidades para Desenvolver
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '8px' }}>
                                  {hardSkills.length > 0 && (
                                    <div>
                                      <h5 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', margin: 0, marginBottom: '0.5rem' }}>Hard Skills</h5>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {hardSkills.map((skill, i) => (
                                          <span key={i} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '4px 10px', borderRadius: '100px', fontSize: '0.8rem' }}>
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {softSkills.length > 0 && (
                                    <div>
                                      <h5 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', margin: 0, marginBottom: '0.5rem' }}>Soft Skills</h5>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {softSkills.map((skill, i) => (
                                          <span key={i} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: '100px', fontSize: '0.8rem' }}>
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Próximos Passos (Fallback ou Específico) */}
                            {nextSteps.length > 0 && (
                              <div>
                                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', fontSize: '1.05rem', margin: 0 }}>
                                  <Sparkles size={18} color="#a855f7" /> Próximos Passos
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  {nextSteps.map((step, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe', fontSize: '0.75rem', fontWeight: 600, flexShrink: 0, marginTop: '2px' }}>
                                        {i + 1}
                                      </span>
                                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>{step}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setScreen('action-plan')}
                style={{ 
                  background: 'var(--accent)', border: 'none', 
                  color: 'white', padding: '16px 32px', borderRadius: '100px',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer', fontFamily: 'Outfit', fontWeight: 600, fontSize: '1.1rem'
                }}
              >
                Ver meu plano de ação <ArrowRight size={18} />
              </button>
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
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: '0 0 1rem 0' }}>Plano de Ação</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Seu próximo passo prático para migrar para <strong>{analysis.topRoles[0].role.name}</strong>.
              </p>
            </div>

            {(() => {
              const role = analysis.topRoles[0].role;
              const content = roleContents[role.name];
              const categoryDefault = categoryDefaults[role.category] || {
                reading: { title: "N/A", author: "N/A", description: "Leitura não encontrada para esta categoria." },
                nextSteps: ["Pesquisar mais sobre a área."]
              };
              const track = content?.recommendedTrack || categoryDefault.recommendedTrack;
              const reading = content?.recommendedReading && content.recommendedReading.length > 0 ? content.recommendedReading[0] : categoryDefault.reading;
              const nextSteps = content?.nextSteps && content.nextSteps.length > 0 ? content.nextSteps : categoryDefault.nextSteps;
              const hardSkills = content?.hardSkills || categoryDefault.hardSkills || [];
              const softSkills = content?.softSkills || categoryDefault.softSkills || [];

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {track && (track.formacoes.length > 0 || track.sprints.length > 0) && (
                    <div className="glass-panel">
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d8b4fe', margin: '0 0 1rem 0' }}>
                        <Target size={20} /> Trilha PM3 Recomendada
                      </h3>
                      {track.formacoes.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <h4 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Formações</h4>
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
                          <h4 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Sprints</h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {track.sprints.map((sprint, i) => (
                              <span key={i} style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#d8b4fe', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem' }}>
                                {sprint.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="glass-panel">
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d8b4fe', margin: '0 0 1rem 0' }}>
                      <BookOpen size={20} /> Leitura Recomendada
                    </h3>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
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
                  </div>

                  {(hardSkills.length > 0 || softSkills.length > 0) && (
                    <div className="glass-panel">
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d8b4fe', margin: '0 0 1rem 0' }}>
                        <Wrench size={20} /> Habilidades para Desenvolver
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {hardSkills.length > 0 && (
                          <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Hard Skills</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {hardSkills.map((skill, i) => (
                                <span key={i} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem' }}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {softSkills.length > 0 && (
                          <div>
                            <h4 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Soft Skills</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                              {softSkills.map((skill, i) => (
                                <span key={i} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem' }}>
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="glass-panel">
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
