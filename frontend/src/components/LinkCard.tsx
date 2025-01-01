import { EditOutlined, EllipsisOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Url } from './UiBuilder'

const { Meta } = Card;

export const LinkCard = (props: Url & { onEdit: (data: Url) => void }) => {

  const handleEditClick = () => {
    console.log('Edit clicked');
    props.onEdit({
      id: props.id,
      title: props.title,
      url: props.url,
      userId: '',
      views: 0,
    });
  };

  const handleViewClick = () => {
    console.log('View clicked');
  };

  const handleMoreClick = () => {
    console.log('More options clicked');
  };
  return (
    <Card
      style={{ marginTop: "1rem" }}
      actions={[
        <div className='flex h-7 justify-center items-center gap-1'>
          <p className='text-xs'>10</p>
          <EyeOutlined key="view" onClick={handleViewClick} />
        </div>,
        <EditOutlined key="edit" onClick={handleEditClick} />,
        <EllipsisOutlined key="ellipsis" onClick={handleMoreClick} />,
      ]}
    >
      <Meta
        avatar={<LinkOutlined />}
        title={props.title}
        description={props.url}
      />
    </Card>
  )
}
