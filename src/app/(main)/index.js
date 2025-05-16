import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import ThemeToggle from "../../components/theme-toggle";
import { getAccessToken } from "../../lib/auth";

const Main = () => {
  const router = useRouter();

  useEffect(() => {
    getAccessToken()
      .then((token) => {
        router.replace("/auth/login");
      })
      .catch((error) => {
        console.error("Error checking access token:", error);
        router.replace("/auth/login");
      });
  }, [router]);

  const handleLogout = () => {
    router.replace("/auth/login");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-gray-900 dark:text-white text-xl mb-4">
        Welcome to main page!
      </Text>
      <ThemeToggle />
      <TouchableOpacity
        className="mt-8 bg-red-500 px-6 py-3 rounded-xl"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold text-base">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
