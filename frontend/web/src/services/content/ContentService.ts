import type { ContentDocument } from '../../types/content';

export interface ContentService {
  getById(id: string): Promise<ContentDocument | null>;
}
