export type ThemeMode = 'light' | 'dark';
export type FontScale = 'small' | 'normal' | 'large';

export type Settings = {
theme: ThemeMode;
fontScale: FontScale;
};

export const themes = {
light: { 
    background: '#F4F8FC', 
    card: '#FFFFFF', 
    text: '#102A43', 
    primary: '#0B66E4' 
},
dark: { 
    background: '#101827', 
    card: '#1B2638', 
    text: '#F7FAFC', 
    primary: '#20C5F5' 
},
};

export type AppTheme = typeof themes.light;
