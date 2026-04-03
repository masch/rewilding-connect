import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 bg-gray-50 items-center justify-center px-5 pt-20">
      <Link href="/projects" className="text-red-500">
        Projects
      </Link>
    </View>
  );
}
