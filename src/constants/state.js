import { themes } from '../contexts';

export const DEFAULT_SETTINGS = {
  theme: themes.purple.dark,
  mode: 'dark',
  color: 'purple',
  availableThemes: Object.keys(themes),
  version: '',
};

export const INITIAL_STATE = {
  entries: {},
  entryIds: [],
  settings: DEFAULT_SETTINGS,
  showSettings: false,
  tab: {},
};
