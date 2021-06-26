import { useEffect } from 'react';
import { createContext, ReactNode, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  //const [currentTheme, setCurrentTheme] = useState<Theme>('light');
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storageTheme = localStorage.getItem('theme');
    return (storageTheme ?? 'light') as Theme;
  });

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  return(
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}