import { themes } from '../contexts';

export const DEFAULT_SETTINGS: AppSettings = {
  availableThemes: Object.keys(themes),
  color: 'purple',
  mode: 'dark',
  theme: themes.purple.dark,
  version: '',
};

export const INITIAL_STATE = {
  entries: {},
  entryIds: [],
  settings: DEFAULT_SETTINGS,
  showSettings: false,
  tab: {
    active: true,
    audible: false,
    autoDiscardable: true,
    discarded: false,
    favIconUrl: '',
    height: 800,
    highlighted: true,
    id: 1,
    incognito: false,
    index: 1,
    mutedInfo: { muted: false },
    pinned: false,
    selected: true,
    status: 'complete',
    title: '',
    url: '',
    width: 2560,
    windowId: 1,
  },
};
