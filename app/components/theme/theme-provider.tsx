import { ThemeProvider as BaseThemeProvider } from "next-themes";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <BaseThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </BaseThemeProvider>
  );
}
