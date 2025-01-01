
import { Avatar, Select } from 'antd';
import { useLinks } from '../../context/LinksContext';
import { useState } from 'react';

type Theme = {
  bgColor: string;       // Background color
  textColor: string;     // Main text color
  subTextColor: string;  // Subtext color
  cardColor: string;     // Card background color
  cardTextColor: string; // Card text color
};

type ThemeOption = {
  value: string;
  label: string;
};

export function MockMobile() {
  const { links } = useLinks()

  const [theme, setTheme] = useState<Theme>({
    "bgColor": "bg-white", //Monochrome 
    "textColor": "text-neutral-900",
    "subTextColor": "text-neutral-500",
    "cardColor": "bg-zinc-800",
    "cardTextColor": "text-zinc-50"
  });


  const themeConfigs: Record<string, Theme> = {
    "1": {
      "bgColor": "bg-zinc-900", // Dark
      "textColor": "text-neutral-100",
      "subTextColor": "text-neutral-400",
      "cardColor": "bg-zinc-800",
      "cardTextColor": "text-zinc-50"
    },

    "2": {
      "bgColor": "bg-white", //Monochrome 
      "textColor": "text-neutral-900",
      "subTextColor": "text-neutral-500",
      "cardColor": "bg-zinc-800",
      "cardTextColor": "text-zinc-50"
    }
  };

  const options: ThemeOption[] = [
    { value: '1', label: 'Dark' },
    { value: '2', label: 'Monochrome' },
  ];

  const handleChange = (value: string): void => {
    const selectedTheme = themeConfigs[value] || {
      bgColor: '',
      textColor: '',
      subTextColor: '',
      cardColor: '',
      cardTextColor: '',
    };
    setTheme(selectedTheme);
  };

  return (
    <main className='w-full bg-white border rounded-md py-6 flex flex-col md:flex-row justify-between items-start gap-2 '>
      <div className='ml-4 mb-8 md:mb-0 z-20'>
        <p className='text-xs py-1.5'>Select Theme</p>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select Theme"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={handleChange}
          options={options}
        />
      </div>
      {/* MobileUI */}
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[550px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className={`rounded-[2rem] overflow-hidden w-[272px] h-[525px] ${theme.bgColor}`}>
          {/* Profile */}
          <div className='h-44 grid place-content-center gap-2 mt-2'>
            <div className='grid place-content-center'>
              <Avatar
                src={'https://avatars.githubusercontent.com/u/73811790?v=4'}
                style={{ fontSize: "16px", backgroundColor: theme.cardColor }}
                size={75}
              />
            </div>
            <div className='flex flex-col justify-start items-center'>
              <h1 className={`text-center ${theme.textColor}`}>Rohan Salunkhe</h1>
              <p className={`text-sm ${theme.subTextColor}`}>A developer</p>
            </div>
          </div>
          {/* Content */}
          <main className='overflow-auto max-h-96 '>
            <div className='my-2 mb-20 flex flex-col justify-center items-center gap-2 relative px-2 '>
              {links.map((item, index) => (
                <a key={index}
                  href={item.url}
                  className={`min-h-8 w-full text-sm rounded-md px-4 flex justify-center items-center ${theme.cardColor} ${theme.cardTextColor} `}
                >
                  {item.title}
                </a>
              ))}

            </div>
          </main>

        </div>
      </div>
    </main>
  )
}
