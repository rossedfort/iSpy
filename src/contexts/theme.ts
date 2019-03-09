import React from 'react';

export const themes: AppThemes = {
  blue: {
    dark: {
      dark: '#253a4e',
      darker: '#172531',
      foreground: '#fafafa',
      light: '#456f93',
      lighter: '#9bb7d0',
      name: 'blue',
    },
    light: {
      dark: '#9bb7d0',
      darker: '#6993b8',
      foreground: '#333333',
      light: '#cddbe7',
      lighter: '#f0f4f8',
      name: 'blue',
    },
    representation: '#456f93',
  },
  green: {
    dark: {
      dark: '#67843a',
      darker: '#4a5e29',
      foreground: '#fafafa',
      light: '#85a94a',
      lighter: '#e9f0de',
      name: 'green',
    },
    light: {
      dark: '#d3e2bc',
      darker: '#bed39b',
      foreground: '#333333',
      light: '#e9f0de',
      lighter: '#f8fbf5',
      name: 'green',
    },
    representation: '#85a94a',
  },
  mono: {
    dark: {
      dark: '#606463',
      darker: '#454846',
      foreground: '#ffffff',
      light: '#7c817f',
      lighter: '#a1a5a4',
      name: 'mono',
    },
    light: {
      dark: '#d0d2d1',
      darker: '#b9bcba',
      foreground: '#111111',
      light: '#e8e9e8',
      lighter: '#f8f8f8',
      name: 'mono',
    },
    representation: '#606463',
  },
  purple: {
    dark: {
      dark: '#48475e',
      darker: '#343243',
      foreground: '#fafafa',
      light: '#686686',
      lighter: '#a2a1b8',
      name: 'purple',
    },
    light: {
      dark: '#c1c0d0',
      darker: '#a2a1b8',
      foreground: '#333333',
      light: '#e0e0e7',
      lighter: '#f6f6f8',
      name: 'purple',
    },
    representation: '#686686',
  },
};

export const ThemeContext = React.createContext<AppThemeContext>({
  availableThemes: Object.keys(themes),
  mode: 'dark',
  theme: themes.purple.dark,
  toggleMode: () => { return; },
  toggleTheme: () => { return; },
});
