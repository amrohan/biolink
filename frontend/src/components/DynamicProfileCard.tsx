import Avatar from "antd/es/avatar/avatar";
import { User } from "../pages/DynamicProfile";

export const DynamicProfileCard = (props: User) => {
  return (
    <div>
      <Avatar src={props.picture} />
    </div>
  );
};
