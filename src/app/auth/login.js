import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async () => {
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

    const handleSignUp = () => {
        // router.push('/register')
    }

    return (
        <View className="flex-1 px-6 justify-center">
            <Text className="text-3xl font-bold text-gray-900 mt-[67px] font-circular-bold w-64 mb-8">Glad to meet you again!</Text>

            <View className="space-y-4">
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
                    onPress={handleSignIn}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-[16px] font-semibold">Sign In Now</Text>
                    )}
                </TouchableOpacity>
                <Text className="text-center text-black text-[14px] mb-4 opacity-20">Or</Text>
                <TouchableOpacity
                    className="w-full h-14 bg-blue-500 rounded-xl justify-center items-center"
                    onPress={handleSignUp}
                >
                    <Text className="text-white text-[16px] font-semibold">Sign Up Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}