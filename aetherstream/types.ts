
export interface AIMovie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  genre: string;
  duration: string;
  creator: string;
  timestamp?: number;
  isGenerated?: boolean;
}

export interface AISeries {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  creator: string;
  episodes: AIMovie[];
}

export interface GenerationState {
  isGenerating: boolean;
  status: string;
  progress: number;
}

export interface PromptConfig {
  prompt: string;
  style: string;
  aspectRatio: '16:9' | '9:16';
  resolution: '720p' | '1080p';
}

export enum AppRoute {
  HOME = 'home',
  STUDIO = 'studio',
  PLAY = 'play',
  SERIES = 'series',
  LIBRARY = 'library'
}
