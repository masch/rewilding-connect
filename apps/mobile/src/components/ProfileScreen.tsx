import { Text } from "react-native";
import Screen from "./Screen";

type UserType = "TOURIST" | "ENTREPRENEUR" | "ADMIN";

interface ProfileScreenProps {
  userType: UserType;
}

export default function ProfileScreen({ userType }: ProfileScreenProps) {
  return (
    <Screen>
      <Text accessibilityLabel={`Profile for ${userType}`}>Profile - {userType}</Text>
    </Screen>
  );
}
