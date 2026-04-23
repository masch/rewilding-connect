import { UserRole } from "@repo/shared";
import ProfileScreen from "../../components/Profile/ProfileView";

export default function TouristProfile() {
  return <ProfileScreen userType={UserRole.TOURIST} />;
}
