export type CareerTrack = 'tech' | 'meetings' | 'data' | 'support' | 'sales';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type UserRole = 'learner' | 'org_admin' | 'platform_admin';
export type SessionStatus = 'in_progress' | 'completed' | 'abandoned' | 'error';
export type SessionType = 'diagnostic' | 'practice' | 'assessment';
export type Speaker = 'user' | 'ai';
export type SubscriptionPlan = 'free' | 'basic' | 'pro' | 'pro_coach' | 'enterprise';
export type ConsentType = 'audio_recording' | 'data_processing' | 'marketing' | 'audio_storage';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Goal {
  id: CareerTrack;
  label: string;
  sub: string;
  icon: string;
}

export interface SkillScores {
  fluency: number;
  grammar: number;
  vocabulary: number;
  clarity: number;
  pronunciation: number;
  relevance: number;
  professionalTone: number;
  confidence: number;
}

export interface Correction {
  original: string;
  better: string;
  whyPt: string;
  category: string;
}

export interface ConsentItem {
  id: string;
  label: string;
  required: boolean;
}

export interface ScenarioSummary {
  id: string;
  title: string;
  titlePt: string;
  careerTrack: CareerTrack;
  difficulty: Difficulty;
  estimatedMinutes: number;
  aiRole: string;
}

export interface WSMessage {
  type: 'audio' | 'transcript' | 'ai_text' | 'ai_audio' | 'turn' | 'control' | 'session_end' | 'error';
  data?: ArrayBuffer;
  text?: string;
  isFinal?: boolean;
  speaker?: Speaker;
  action?: 'start' | 'stop' | 'end' | 'pause';
  code?: string;
  message?: string;
}
