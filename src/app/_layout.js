import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { loadFonts } from "../lib/font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../../global.css";
import { ThemeProvider } from "../components/theme-provider";
import Toast from "react-native-toast-message";

// import {}
const RootLayout = () => {
  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <ThemeProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} edges={["bottom", "top"]}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  statusBarBackgroundColor: "fff",
                  statusBarStyle: "dark",
                  contentStyle: {
                    backgroundColor: "#f2f2f2",
                  },
                }}
              >
                <StatusBar style="dark" />
              </Stack>
            </SafeAreaView>
          </SafeAreaProvider>
        </ThemeProvider>
        <Toast />
      </View>
    </>
  );
};

export default RootLayout;
