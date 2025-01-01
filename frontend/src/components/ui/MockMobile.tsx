
import { Avatar } from 'antd';
import { useLinks } from '../../context/LinksContext';

export function MockMobile() {
  const { links } = useLinks()
  const style = "bg-zinc-700 text-slate-50"
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
        {/* Profile */}
        <div className='h-44 grid place-content-center gap-2 mt-2'>
          <div className='grid place-content-center'>
            <Avatar
              style={{ fontSize: "16px" }}
              size={75}
            >
              User
            </Avatar>
          </div>
          <div className='flex flex-col justify-start items-center'>
            <h1 className='text-center'>Rohan Salunkhe</h1>
            <p className='text-sm text-neutral-700'>A developer</p>
          </div>
        </div>
        {/* Content */}
        <main className='flex flex-col justify-center items-center gap-2 relative px-2'>
          {links.map((item, index) => (
            <a key={index}
              href={item.url}
              className={`h-10 w-full text-sm rounded-md px-4 flex justify-center items-center ${style}`}
            >
              {item.title}
            </a>
          ))}

        </main>

      </div>
    </div>
  )
}
