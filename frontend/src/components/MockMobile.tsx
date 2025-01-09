import { Avatar, Select } from "antd";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserTheme, useUser } from "../context/UserContext";
import { Link } from "react-router";
import axios from "axios";

export function MockMobile() {
  const { user, getAccessTokenSilently } = useAuth0();
  const { localUser, loading } = useUser();
  const [themes, setThemes] = useState<UserTheme[]>([]);
  const [currentTheme, setCurrentTheme] = useState<UserTheme>(localUser?.theme!);

  useEffect(() => {
    const fetchAllThemes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_AUTH0_AUDIENCE}/themes`
        );
        setThemes(response.data);
        setCurrentTheme(localUser?.theme!);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchAllThemes();
  }, [loading, localUser]);

  const handleChange = async (value: number): Promise<void> => {
    const selectedTheme = themes.find((theme) => theme.id === value);

    if (selectedTheme) {
      try {
        // Make the API call to update the user's theme using axios
        const token = await getAccessTokenSilently();
        const response = await axios.put(
          `${import.meta.env.VITE_AUTH0_AUDIENCE}/themes/user/theme`,
          {
            userId: localUser?.id,
            themeId: selectedTheme.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the access token
            },
          }
        );

        // Check if the request was successful
        if (response.status !== 200) {
          throw new Error("Failed to update theme");
        }

        // Update the local state with the selected theme
        setCurrentTheme(selectedTheme);

        // Optionally, update the localUser object to reflect the new theme
        if (localUser) {
          localUser.theme = selectedTheme;
        }

        console.log("Theme updated successfully!");
      } catch (error) {
        console.error("Error updating theme:", error);
      }
    }
  };

  return (
    <main className="w-full rounded-md flex flex-col md:flex-row justify-between items-start gap-2">
      {/* Mobile UI */}
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[550px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div
          className="rounded-[2rem] overflow-hidden w-[272px] h-[525px]"
          style={{ backgroundColor: currentTheme?.bgColor }}
        >
          {/* Profile */}
          <div className="h-44 grid place-content-center gap-2 mt-2">
            <div className="grid place-content-center">
              <Avatar
                src={
                  <img
                    src={user?.picture}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                  />
                }
                style={{ fontSize: "16px" }}
                size={75}
              />
            </div>
            <div className="flex flex-col gap-0.5 justify-start items-center">
              <h1
                className="text-center text-sm"
                style={{ color: currentTheme?.textColor }}
              >
                {localUser?.name}
              </h1>
              <p
                className="text-xs"
                style={{ color: currentTheme?.subTextColor }}
              >
                @{localUser?.username}
              </p>
            </div>
          </div>
          {/* Content */}
          <main className="overflow-auto max-h-96">
            <div className="my-2 mb-20 flex flex-col justify-center items-center gap-2 relative px-2">
              {localUser?.links.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="min-h-8 w-full text-sm rounded-md px-4 flex justify-center items-center"
                  style={{
                    backgroundColor: currentTheme?.cardColor,
                    color: currentTheme?.cardTextColor,
                  }}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </main>
        </div>
      </div>

      <div className="mb-8 md:mb-0 z-20">

        <Link
          to={`/@/${localUser?.username}`}
          target="_blank"
          className="mb-10 bg-slate-100 h-10 rounded-md grid place-content-center"
        >
          <div className="flex justify-center items-center gap-1.5 hover:text-blue-600"
          >
            <p className="text-xs py-1.5">Visit Page</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </div>
        </Link>
        <p className="text-xs py-1.5">Select Theme</p>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select Theme"
          optionFilterProp="label"
          onChange={handleChange}
          options={themes.map((theme) => ({
            value: theme.id,
            label: theme.themeName,
          }))}
        />
      </div>
    </main>
  );
}
;
