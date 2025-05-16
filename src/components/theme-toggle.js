import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../components/theme-provider";
import React from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <View className="flex-row space-x-2 p-4 gap-5">
      <TouchableOpacity
        className={`px-4 py-2 rounded-lg ${
          theme === "light" ? "bg-gray-200" : "bg-blue-500"
        }`}
        onPress={() => {
          setTheme("light");
        }}
      >
        <Text className="text-white">Light</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`px-4 py-2 rounded-lg ${
          theme === "dark" ? "bg-gray-200" : "bg-blue-500"
        }`}
        onPress={() => {
          setTheme("dark");
        }}
      >
        <Text className="text-white">Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`px-4 py-2 rounded-lg ${
          theme === "system" ? "bg-gray-200" : "bg-blue-500"
        }`}
        onPress={() => {
          setTheme("system");
        }}
      >
        <Text className="text-white">System</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThemeToggle;
