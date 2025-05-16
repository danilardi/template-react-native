import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import api from "../../lib/api";
import { setAccessToken } from "../../lib/auth";
import { showToast } from "../../lib/utils";

export default function Login() {
  const [email, setEmail] = useState("danilardi@gmail.com");
  const [password, setPassword] = useState("danil123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });
      console.log(res.data);
      setAccessToken(res.data.accessToken);
      if (!res.data.accessToken) {
        throw new Error("No access token received");
      }
      showToast("Login successful", "Welcome back!");
      router.replace("/(main)");
    } catch (error) {
      setError("Login failed, please try again");
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToSignUp = () => {
    router.push("auth/register");
  };

  return (
    <View className="flex-1 px-6 justify-center">
      <Text className="text-3xl font-bold text-gray-900 font-circular-bold w-64 mb-8">
        Glad to meet you again!
      </Text>
      <View className="space-y-4">
        <TextInput
          className="w-full h-14 px-4 bg-gray-300/20 rounded-xl text-base text-gray-900"
          placeholder="Your Email"
          placeholderTextColor="#9ca3af"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <View className="flex-row items-center mb-8">
          <TextInput
            className="w-full h-14 px-4 bg-gray-300/20 rounded-xl text-base text-gray-900"
            placeholder="Enter your password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4"
          >
            {showPassword ? (
              <Ionicons name="eye-off" size={24} color="#9ca3af" />
            ) : (
              <Ionicons name="eye" size={24} color="#9ca3af" />
            )}
          </TouchableOpacity>
        </View>
        {error ? (
          <Text className="text-red-500 text-center mb-2">{error}</Text>
        ) : null}
        <TouchableOpacity
          className="w-full h-14 bg-slate-800 rounded-xl items-center justify-center mb-4"
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-[16px]">
              Sign in now
            </Text>
          )}
        </TouchableOpacity>
        <Text className="text-center text-gray-700">
          Don't have an account?{' '}
          <Text onPress={handleToSignUp} className="text-amber-400 font-semibold">
            Sign Up Now
          </Text>
        </Text>
      </View>
    </View>
  );
}
