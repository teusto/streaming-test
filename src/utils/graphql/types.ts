export interface Episode {
    id: string;
    series: string;
    title: string;
    description: string;
    seasonNumber: number;
    episodeNumber: number;
    releaseDate: string;
    imdbId: string;
  }
  
  export interface EpisodeInput {
    id?: string;
    series: string;
    title: string;
    description: string;
    seasonNumber: number;
    episodeNumber: number;
    releaseDate: string;
    imdbId: string;
  }
  
  export interface CreateEpisodeResponse {
    createEpisode: Episode;
  }