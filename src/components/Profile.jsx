import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((store) => store.user);

  return userData && <EditProfile userData={userData} />;
};

export default Profile;
