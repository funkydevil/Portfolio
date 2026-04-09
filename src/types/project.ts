export type PortfolioLink = {
  label: string;
  url: string;
};

export type MediaImage = {
  source: string;
  alt: string;
};

export type MediaVideo = {
  source: string;
  poster?: string;
};

export type ProjectEntry = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  links?: PortfolioLink[];
  cover: string;
  images: MediaImage[];
  video?: MediaVideo;
  featured?: boolean;
};
