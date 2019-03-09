declare module 'react-syntax-highlighter/dist/prism' {
  export default class SyntaxHighlighter extends React.Component<SyntaxHighlighterProps> {}
}

interface LocalStorageRecord {
  id: string;
  parsed: { key: string, value: string };
  stringified: string;
};

interface LocalStorageEntries {
  [key: string]: LocalStorageRecord;
};

interface ThemeColors {
  name: string;
  darker: string;
  dark: string;
  light: string;
  lighter: string;
  foreground: string;
};

type ThemeMode = 'dark' | 'light';

interface AppTheme {
  representation: string;
  light: ThemeColors;
  dark: ThemeColors;
};

interface AppThemes {
  [key: string]: AppTheme;
};

interface AppSettings {
  theme: ThemeColors;
  mode: ThemeMode;
  color: string;
  availableThemes: string[];
  version: string;
};

interface AppState {
  entries: LocalStorageEntries;
  entryIds: string[];
  settings: AppSettings;
  showSettings: boolean;
  tab: chrome.tabs.Tab;
};

interface AppThemeContext {
  theme: ThemeColors;
  mode: ThemeMode;
  availableThemes: string[];
  toggleTheme: (color: string) => void;
  toggleMode: () => void;
};

interface TabMessage {
  payload: string;
};
