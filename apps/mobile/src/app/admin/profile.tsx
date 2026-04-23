import { UserRole } from "@repo/shared";
import ProfileScreen from "../../components/Profile/ProfileView";

export default function AdminProfile() {
  return <ProfileScreen userType={UserRole.ADMIN} />;
}
