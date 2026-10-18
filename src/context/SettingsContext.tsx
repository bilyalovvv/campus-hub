import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppTheme, FontScale, Settings, ThemeMode, themes } from '../theme/themes';

type SettingsContextValue = Settings & {
  colors: AppTheme;
  setTheme: (value: ThemeMode) => void;
  setFontScale: (value: FontScale) => void;
  resetSettings: () => void;
};

const STORAGE_KEY = '@campus_hub_settings';

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    fontScale: 'normal',
  });
  const [isReady, setIsReady] = useState(false);


  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setSettings(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      } finally {
        setIsReady(true);
      }
    };
    loadSettings();
  }, []);


  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings, isReady]);

  const setTheme = (theme: ThemeMode) =>
    setSettings((current) => ({ ...current, theme }));

  const setFontScale = (fontScale: FontScale) =>
    setSettings((current) => ({ ...current, fontScale }));

  const resetSettings = () =>
    setSettings({ theme: 'light', fontScale: 'normal' });

  const colors = themes[settings.theme];

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        colors,
        setTheme,
        setFontScale,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) {
    throw new Error('useSettings must be inside SettingsProvider');
  }
  return value;
}
