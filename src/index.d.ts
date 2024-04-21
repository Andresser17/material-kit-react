import { Theme as OriginalTheme } from '@mui/material/styles';

export declare module '@mui/material/styles' {
  interface Theme {
    palette: OriginalTheme.palette & {
      background: palette.background & {
        neutral: string;
      };
    };
    shadows: string[];
    customShadows: {
      z1: string;
      z4: string;
      z8: string;
      z12: string;
      z16: string;
      z20: string;
      z24: string;
      //
      card: string;
      dropdown: string;
      dialog: string;
      //
      primary: string;
      info: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
    };
    typography: OriginalTheme.typography & {
      fontWeightSemiBold: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    shadows?: string[];
    customShadows?: Theme.customShadows;
  }
}
