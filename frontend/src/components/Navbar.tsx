import { LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Dropdown, MenuProps } from "antd";


export function Navbar() {
  const { user, logout } = useAuth0();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
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

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap shadow-none w-full bg-white border-b vird text-sm py-3">
        <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
          <a className="sm:order-1 flex-none text-xl font-semibold text-neutral-900 focus:outline-none focus:opacity-80" href="#">BioLink</a>
          <div className="sm:order-3 flex items-center gap-x-2">
            <button type="button" className="sm:hidden hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" id="hs-navbar-alignment-collapse" aria-expanded="false" aria-controls="hs-navbar-alignment" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-alignment">
              <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
              <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              <span className="sr-only">Toggle</span>
            </button>
            <Dropdown menu={menuProps} trigger={["click"]} >
              <Avatar size={36} src={user?.picture} className="cursor-pointer" onClick={(e) => e?.preventDefault()} />
            </Dropdown>
          </div>
          <div id="hs-navbar-alignment" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2" aria-labelledby="hs-navbar-alignment-collapse">
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
              <a className="font-medium text-neutral-500 focus:outline-none" href="#" aria-current="page">Dashboard</a>
              <a className="font-medium text-blue-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href="#">Editor</a>
              <a className="font-medium text-neutral-500 hover:text-gray-400 focus:outline-none focus:text-gray-400" href="#">Themes</a>
              <a className="font-medium text-neutral-500 hover:text-neutral-600 focus:outline-none focus:text-gray-400" href="#">Community</a>
            </div>
          </div>
        </nav>
      </header>

    </>
  )

}
