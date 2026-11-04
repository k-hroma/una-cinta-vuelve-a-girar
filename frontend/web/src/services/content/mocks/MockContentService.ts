import type { ContentService } from '../ContentService';
import { contentFixtures } from './content.fixtures';

export class MockContentService implements ContentService {
  async getById(id: string) {
    return contentFixtures.find((document) => document.id === id) ?? null;
  }
}
