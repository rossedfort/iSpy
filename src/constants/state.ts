import { themes } from '../contexts';

export const DEFAULT_SETTINGS: AppSettings = {
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
