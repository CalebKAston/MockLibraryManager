export interface Book {
  id: number;
  title: string;
  pages: number;
  isCheckedOut: boolean;
}

export const books: Book[] = [
  {
    id: 1,
    title: 'Mistborn',
    pages: 541,
    isCheckedOut: false,
  },
  {
    id: 2,
    title: 'Oathbringer',
    pages: 1248,
    isCheckedOut: true,
  },
  {
    id: 3,
    title: 'Warbreaker',
    pages: 592,
    isCheckedOut: true,
  },
];
