import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View } from 'react-native';
import './global.css'
import { useEffect } from 'react';
import { loadFonts } from './font';

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [])

  return (
    <View className="flex-1 px-6 justify-center">
      <Text className="text-3xl font-bold text-gray-900 mt-[67px] font-circular-bold w-64 mb-8">Glad to meet you again!</Text>

      <View className="space-y-4">
        <TextInput
          className="w-full h-14 mb-4 px-4 bg-gray-50"
        />
      </View>
    </View>
  );
}
