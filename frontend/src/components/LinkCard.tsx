import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { UserLinkModel } from "../context/UserContext";

const { Meta } = Card;

interface LinkCardProps
  extends Pick<UserLinkModel, "id" | "title" | "url" | "views" | "userId"> {
  onEdit: (data: UserLinkModel) => void;
  handleOnDelete: (linkId: number) => void;
}

export const LinkCard = ({
  id,
  title,
  url,
  views,
  userId,
  onEdit,
  handleOnDelete,
}: LinkCardProps) => {
  const handleEditClick = () => {
    onEdit({ id, title, url, views, userId }); // Assuming userId is not used in the component
  };

  const handleViewClick = () => {
    console.log("View clicked");
  };

  const handleDeleteClick = () => {
    handleOnDelete(id);
  };

  return (
    <Card
      style={{ marginTop: "1rem" }}
      actions={[
        <div className="flex h-7 justify-center items-center gap-1">
          <p className="text-xs">{views}</p>
          <EyeOutlined key="view" onClick={handleViewClick} />
        </div>,
        <EditOutlined key="edit" onClick={handleEditClick} />,
        <DeleteOutlined key="delete" onClick={handleDeleteClick} />,
      ]}
    >
      <Meta avatar={<LinkOutlined />} title={title} description={url} />
    </Card>
  );
};
