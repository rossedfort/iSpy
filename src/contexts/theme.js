import React from 'react';

export const themes = {
  purple: {
    representation: '#686686',
    light: {
      name: 'purple',
      darker: '#a2a1b8',
      dark: '#c1c0d0',
      light: '#e0e0e7',
      lighter: '#f6f6f8',
      foreground: '#333333'
    },
    dark: {
      name: 'purple',
      darker: '#343243',
      dark: '#48475e',
      light: '#686686',
      lighter: '#a2a1b8',
      foreground: '#fafafa'
    },
  },
  green: {
    representation: '#85a94a',
    light: {
      name: 'green',
      darker: '#bed39b',
      dark: '#d3e2bc',
      light: '#e9f0de',
      lighter: '#f8fbf5',
      foreground: '#333333'
    },
    dark: {
      name: 'green',
      darker: '#4a5e29',
      dark: '#67843a',
      light: '#85a94a',
      lighter: '#e9f0de',
      foreground: '#fafafa'
    },
  },
  blue: {
    representation: '#456f93',
    light: {
      name: 'blue',
      darker: '#6993b8',
      dark: '#9bb7d0',
      light: '#cddbe7',
      lighter: '#f0f4f8',
      foreground: '#333333'
    },
    dark: {
      name: 'blue',
      darker: '#172531',
      dark: '#253a4e',
      light: '#456f93',
      lighter: '#9bb7d0',
      foreground: '#fafafa'
    },
  },
};

export const ThemeContext = React.createContext({
  theme: themes.purple.dark,
  mode: 'dark',
  availableThemes: Object.keys(themes),
  toggleTheme: () => {},
  toggleMode: () => {},
});