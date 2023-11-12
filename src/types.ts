export interface TableData {
  name: string;
  owner: string;
  key: React.Key;
  details: React.ReactNode;
}

export interface Column {
  key: React.Key;
  text: string;
  align?: 'left' | 'right' | 'center';
}