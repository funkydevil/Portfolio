import meditationProject from "../../assets/projects/meditation/project.json";
import walletProject from "../../assets/projects/wallet/project.json";
import copyProject from "../../assets/projects/copy/project.json";

import { ProjectEntry } from "../types/project";

type ProjectFileLink = {
  label: string;
  url: string;
};

type ProjectFileVideo = {
  poster?: string;
  source: string;
};

type ProjectFile = {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  links?: ProjectFileLink[];
  cover: string;
  images: string[];
  video?: ProjectFileVideo;
  featured?: boolean;
};

const assetUrl = (path: string) => new URL(path, import.meta.url).href;

const buildProject = (basePath: string, project: ProjectFile): ProjectEntry => {
  return {
    id: project.id,
    kicker: project.kicker,
    title: project.title,
    summary: project.summary,
    links: project.links?.length ? project.links : undefined,
    cover: assetUrl(`${basePath}/${project.cover}`),
    images: project.images.map((image, index) => ({
      alt: `${project.title} screen ${index + 1}`,
      source: assetUrl(`${basePath}/${image}`),
    })),
    video: project.video
      ? {
          source: assetUrl(`${basePath}/${project.video.source}`),
          poster: project.video.poster
            ? assetUrl(`${basePath}/${project.video.poster}`)
            : undefined,
        }
      : undefined,
    featured: project.featured,
  };
};

export const portfolioProjects: ProjectEntry[] = [
  buildProject("../../assets/projects/copy", copyProject as ProjectFile),
  buildProject("../../assets/projects/wallet", walletProject as ProjectFile),
  buildProject("../../assets/projects/meditation", meditationProject as ProjectFile),
];
