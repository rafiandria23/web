import { Project } from './project';
import { Article } from './article';

export interface Tag {
  _id: string;
  name: string;
  slug: string;
  projects: Project[];
  articles: Article[];
}
