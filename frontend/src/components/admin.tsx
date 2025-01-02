import React, { useState } from 'react';
import {
  CodeOutlined,
  DesktopOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import { Editor } from '../pages/Editor';


const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Footer, Sider } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { logout } = useAuth0();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Admin',
      icon: <DesktopOutlined />
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
      icon: <UserOutlined />
      // extra: '⌘P',
    },
    {
      key: '3',
      label: 'Settings',
      icon: <SettingOutlined />,
      // extra: '⌘S',
    },
    {
      key: "4",
      label: 'Log Out',
      danger: true,
      icon: <LogoutOutlined />
    }
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === "4") {
      logout({ logoutParams: { returnTo: window.location.origin } })
    }
    console.dir(e)
  }

  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="h-16 grid place-content-center justify-items-center bg-[#001628]">
          <CodeOutlined className='text-slate-50 size-5' />
          <h1 className='text-slate-50 text-xs'>LinkSnap</h1>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <h1 className='my-4 font-semibold'>Admin</h1>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Editor />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          LinkSnap ©{new Date().getFullYear()} Created by Rohan Salunkhe
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
