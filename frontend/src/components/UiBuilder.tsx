import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

export function UiBuilder() {

  return (
    <main className="w-full h-full shadow-sm rounded-md p-4 border-zinc-200 border">
      <div className="h-28 mt-6 flex justify-start items-start w-full">
        <div className="w-8/12 flex justify-start items-center gap-6">
          <Avatar
            style={{ fontSize: "16px", }}
            size={{ lg: 64, xl: 80, xxl: 100 }}
          >
            User
          </Avatar>
          <div className="flex flex-col justify-start items-start">
            <h1 className=" font-semibold">Rohan Salunkhe</h1>
            <p className="text-neutral-600 text-sm">A developer</p>
          </div>
        </div>

        <div className="w-4/12">
          <Button size="middle" type="primary"
            icon={<PlusOutlined />}
          >Add</Button>
        </div>

      </div>
      <div></div>
      <div></div>
      <div></div>
    </main>
  )
}
