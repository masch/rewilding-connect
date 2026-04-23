import { UserRole } from "@repo/shared";
import ProfileScreen from "../../components/Profile/ProfileView";

export default function EntrepreneurProfile() {
  return <ProfileScreen userType={UserRole.ENTREPRENEUR} />;
}
