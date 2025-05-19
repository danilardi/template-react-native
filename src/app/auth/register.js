import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  
} from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import api from "../../lib/api";
import Toast from "react-native-toast-message";

export default function Register() {
  const [fullname, setFullname] = useState("Danil");
  const [email, setEmail] = useState("danilardi@gmail.com");
  const [password, setPassword] = useState("danil123");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  //   const [showConfPassword, setShowConfPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleRegister = async () => {
    if (!fullname || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", {
        name: fullname,
        email,
        password,
      });
      console.log(res.data);
      router.back();
    } catch (error) {
      setError("Register failed, please try again");
      console.error("Register error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToSignIn = () => {
    // router.replace("auth/login");
    router.back();
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 25}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1}}
        >
          <View className="flex-1 justify-center px-6">
            <Text className="text-3xl font-bold text-gray-900 font-circular-bold w-64 mb-8">
              Become a new member!
            </Text>
            <View className="gap-4">
              <TextInput
                className="w-full h-14 bg-gray-300/20 px-4 rounded-xl text-base text-gray-900"
                placeholder="Your Fullname"
                placeholderTextColor="#9ca3af"
                value={fullname}
                onChangeText={setFullname}
              />
              <TextInput
                className="w-full h-14 bg-gray-300/20 px-4 rounded-xl text-base text-gray-900"
                placeholder="Your Fullname"
                placeholderTextColor="#9ca3af"
                value={fullname}
                onChangeText={setFullname}
              />
              <TextInput
                className="w-full h-14 bg-gray-300/20 px-4 rounded-xl text-base text-gray-900"
                placeholder="Your Fullname"
                placeholderTextColor="#9ca3af"
                value={fullname}
                onChangeText={setFullname}
              />
              <TextInput
                className="w-full h-14 bg-gray-300/20 px-4 rounded-xl text-base text-gray-900"
                placeholder="Your Fullname"
                placeholderTextColor="#9ca3af"
                value={fullname}
                onChangeText={setFullname}
              />
              <TextInput
                className="w-full h-14 bg-gray-300/20 px-4 rounded-xl text-base text-gray-900"
                placeholder="Your Email"
                placeholderTextColor="#9ca3af"
                value={email}
                keyboardType="email-address"
                onChangeText={setEmail}
                editable={!loading}
              />
              <View className="flex-row items-center">
                <TextInput
                  className="w-full h-14 bg-gray-300/20 px-4 rounded-xl text-base text-gray-900"
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!loading}
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
              <Text className="text-center text-gray-700 text-sm mb-4">
                By signing up you agree to our{" "}
                <Text className="font-bold">Term of use</Text> and
                <Text className="font-bold"> privacy notice</Text>
              </Text>
              <TouchableOpacity
                className="w-full h-14 bg-emerald-900 rounded-xl items-center justify-center mb-4"
                onPress={handleRegister}
                disabled={loading}
              >
                <Text className="text-white font-semibold text-[16px]">
                  {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <Text className="text-white font-semibold text-[16px]">
                      Register
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
              <Text className="text-center text-gray-700">
                Already have an account?{' '}
                <Text onPress={handleToSignIn} className="text-amber-400 font-semibold">
                  Sign In Now
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
