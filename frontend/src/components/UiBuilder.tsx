
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { LinkCard } from "./LinkCard";
import { useLinks } from "../context/LinksContext";

export type Url = {
  id: string;
  title: string;
  url: string;
  userId: string;
  views: number;
};

// const fetchTitleFromUrl = async (url: string) => {
//   try {
//     const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
//     if (response.ok) {
//       const data = await response.json();
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(data.contents, 'text/html');
//       const title = doc.querySelector('title')?.innerText;
//       return title;
//     } else {
//       throw new Error('Failed to fetch the URL');
//     }
//   } catch (error) {
//     console.error('Error fetching title:', error);
//     return 'Error fetching title';
//   }
// };


export default function UiBuilder() {
  const { links, setLinks } = useLinks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setLinks((prevLinks) => [...prevLinks, values]);
        console.log("Event Submitted:", values);
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Validation Failed:", error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <main className="w-full h-full rounded-md p-4 bg-white border">
        <div className="h-28 mt-6 flex justify-start items-start w-full">
          <div className="w-8/12 flex justify-start items-center gap-6">
            <Avatar
              style={{ fontSize: "16px" }}
              size={{ lg: 64, xl: 80, xxl: 100 }}
            >
              User
            </Avatar>
            <div className="flex flex-col justify-start items-start">
              <h1 className="font-semibold">Rohan Salunkhe</h1>
              <p className=" text-sm text-neutral-600">A developer</p>
            </div>
          </div>
          <div className="w-4/12 flex justify-end items-center">
            <Button
              size="middle"
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
            >
              Add
            </Button>
          </div>
        </div>

        <Modal
          title="Add link"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter a title." }]}
            >
              <Input placeholder="Enter title" />
            </Form.Item>
            <Form.Item
              name="url"
              label="URL"
              rules={[
                { required: true, message: "Please enter a URL." },
                {
                  type: "url",
                  message: "Please enter a valid URL (e.g., https://example.com).",
                },
              ]}
            >
              <Input placeholder="Enter your link" />
            </Form.Item>
          </Form>
        </Modal>

      </main>

      <div className="mt-6 w-full bg-white p-2 rounded-md border">
        <h2 className="font-semibold  p-4">Links</h2>
        <ul className=" mb-10 w-full max-h-96 overflow-x-hidden ">
          {links.map((link, index) => (
            <LinkCard {...link} key={index}
            />
          ))}
        </ul>
      </div>

    </>
  );
}

