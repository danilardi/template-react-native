import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { router } from 'expo-router';

export default function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        // if (!email || !password) {
        //   setError('Please fill in all fields');
        //   return;
        // }
        // setLoading(true);
        // setError(null);
        // try {
        //   router.replace('/(main)')
        // } catch (error) {
        //   setError('Login failed. Please try again.');
        //   console.error('Login error: ', error);
        // } finally {
        //   setLoading(false);
        // }
    }

    const handleSignIn = () => {
        router.replace('/auth/login');
    }

    return (
        <View className="flex-1 px-6 justify-center">
            <Text className="text-3xl font-bold text-gray-900 font-circular-bold mb-8">Sign up and starting to work!</Text>

            <View className="space-y-4">
                <TextInput
                    className="w-full h-14 mb-4 px-4 bg-gray-50 rounded-xl text-base text-gray-900"
                    placeholder='Enter your full name'
                    placeholderTextColor="#9ca3af"
                    value={fullname}
                    onChange={setFullname}
                />
                <TextInput
                    className="w-full h-14 mb-4 px-4 bg-gray-50 rounded-xl text-base text-gray-900"
                    placeholder='Enter your email'
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChange={setEmail}
                />
                <View className="flex-row items-center mb-4">
                    <TextInput
                        className="w-full h-14 px-4 bg-gray-50 rounded-xl text-base text-gray-900"
                        placeholder='Enter your password'
                        placeholderTextColor="#9ca3af"
                        value={password}
                        onChange={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-4 justify-center items-center flex"
                    >
                        {showPassword ? (
                            <Ionicons name="eye-off" size={24} color="#9ca3af" />
                        ) : (
                            <Ionicons name="eye" size={24} color="#9ca3af" />
                        )}
                    </TouchableOpacity>
                </View>
                {error ? (
                    <Text className="text-red-500 text-center mb-4">{error}</Text>
                ) : null}
                <TouchableOpacity
                    className="w-full h-14 bg-emerald-900 rounded-xl justify-center items-center mb-4"
                    onPress={handleRegister}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-[16px] font-semibold">Register</Text>
                    )}
                </TouchableOpacity>
                <Text className="text-center text-gray-800 mt-2"> Already have an account?{' '}
                    <Text
                        className="text-blue-400 font-semibold"
                        onPress={handleSignIn}
                    >Sign In Now</Text>
                </Text>
            </View>
        </View>
    );
}