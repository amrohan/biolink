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
import { useLocation, useNavigate } from 'react-router';

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegment = currentPath.replace('/admin/', '').split('/')[0];
  const title = pathSegment ? capitalizeFirstLetter(pathSegment) : 'Admin';

  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Footer, Sider } = Layout;
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();


  const { logout } = useAuth0();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Admin',
      icon: <DesktopOutlined />
    },
    // {
    //   key: '2',
    //   label: 'Profile',
    //   icon: <UserOutlined />
    //   // extra: '⌘P',
    // },
    // {
    //   key: '3',
    //   label: 'Settings',
    //   icon: <SettingOutlined />,
    //   // extra: '⌘S',
    // },
    {
      type: 'divider',
    },
    {
      key: "4",
      label: 'Log Out',
      danger: true,
      icon: <LogoutOutlined />
    }
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case "1":
        navigate("/admin")
        break;
      case "2":
        navigate("/admin/profile")
        break;
      case "3":
        navigate("/admin/settings")
        break;
      case "4":
        logout({ logoutParams: { returnTo: window.location.origin } })
        break;
      default:
        console.log("none");
        break;
    }
    setSelectedKey(e.key)
  }

  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="h-16 grid place-content-center justify-items-center bg-white">
          <CodeOutlined className='text-neutral-900 size-5' />
          <h1 className='text-neutral-900 text-xs'>LinkSnap</h1>
        </div>
        <Menu theme="light"
          selectedKeys={selectedKey ? [selectedKey] : ['1']} mode="inline" items={items} onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <h1 className='my-4 font-semibold'>
            {title}
          </h1>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          LinkSnap ©{new Date().getFullYear()} Created by Rohan Salunkhe
        </Footer>
      </Layout>
    </Layout>
  );
};

