export type ContentBlock =
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'heading';
      level: 2 | 3;
      text: string;
    }
  | {
      type: 'image';
      src: string;
      alt: string;
      caption?: string;
    };

export type ContentDocument = {
  id: string;
  title: string;
  body: ContentBlock[];
};
