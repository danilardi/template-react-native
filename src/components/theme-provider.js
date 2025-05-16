import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeColorScheme } from "nativewind";
import { View, Text, Appearance } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState("system");
  const { setColorScheme } = useNativeColorScheme();

  useEffect(() => {
    const setInitialTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        const initialTheme = savedTheme || "system";
        setThemeState(initialTheme);

        if (initialTheme === "system") {
          const currentTheme = Appearance.getColorScheme();
          console.log("Initial system theme: ", currentTheme);
          setColorScheme(currentTheme || "light");
        } else {
          setColorScheme(initialTheme);
        }
      } catch (error) {
        console.error("Error loading theme: ", error);
        const currentTheme = Appearance.getColorScheme();
        setColorScheme(currentTheme || "light");
      }
    };

    setInitialTheme();
  }, []);

  const setTheme = async (newTheme) => {
    try {
      await AsyncStorage.setItem("theme", newTheme);
      setThemeState(newTheme);

      if (newTheme === "system") {
        const currentTheme = Appearance.getColorScheme();
        console.log("Setting system to: ", currentTheme);
        setColorScheme(currentTheme || "light");
      } else {
        setColorScheme(newTheme);
      }
    } catch (error) {
      console.error("Error saving theme: ", error);
    }
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      console.log("System theme changed to: ", colorScheme);
      if (theme === "system") {
        setColorScheme(colorScheme || "light");
      }
    });

    return () => {
      subscription.remove();
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
