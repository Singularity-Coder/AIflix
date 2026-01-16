
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  genre: string;
  videoUrl: string;
  duration: string;
  isAIGenerated: boolean;
  style?: CinematicStyle;
  likes?: number;
}

export type CinematicStyle = 'Cinematic' | 'Anime' | 'Cyberpunk' | 'Noir' | 'Claymation' | 'Hand-Drawn';

export interface Scene {
  id: string;
  prompt: string;
  status: 'idle' | 'generating' | 'completed' | 'failed';
  videoUrl?: string;
  operationId?: string;
  styleRefinement?: string;
}

export interface Script {
  title: string;
  soundtrackPrompt: string;
  scenes: {
    description: string;
    dialogue: string;
    visualPrompt: string;
  }[];
}

export enum AppTab {
  HOME = 'home',
  STUDIO = 'studio',
  MY_MOVIES = 'my_movies'
}
