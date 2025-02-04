export interface HeaderProps {
  user?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  onThemeToggle?: () => void;
  onSearch?: (query: string) => void;
}
