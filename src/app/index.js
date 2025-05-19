import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { getAccessToken } from "../lib/auth";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccessToken()
      .then((token) => {
        setToken(token);
      }).catch((error) => {
        console.error("Error fetching access token:", error);
      }).finally(() => {
        setLoading(false);
      });
  }, [])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return <Redirect href={"/(main)"} />;
}
