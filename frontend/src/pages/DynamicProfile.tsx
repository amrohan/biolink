import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserModel } from "../context/UserContext";
import { Avatar } from "antd";

export const DynamicProfile = () => {
  const { slug } = useParams();
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/@/${slug}`
        );
        setUser(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [slug]);

  const handleClick = async (linkId: number): Promise<void> => {
    try {
      // Send a PATCH request to increment the link views
      const response = await axios.patch(
        `${import.meta.env.VITE_AUTH0_AUDIENCE}/links/${linkId}/views`
      );

      // Check if the request was successful
      if (response.status !== 200) {
        throw new Error("Failed to increment link views");
      }

      console.log("Link views incremented successfully!");
    } catch (error) {
      console.error("Error incrementing link views:", error);
    }
  };

  return (
    <div>
      {!user ? (
        <></>
      ) : (
        <>
          <section
            className="min-h-screen h-fit w-svw"
            style={{ backgroundColor: user.theme.bgColor }}
          >
            <div className="flex max-w-3xl mx-auto justify-center items-center">
              {/* User */}
              <div className="rounded-[2rem] overflow-hidden h-full w-full mt-12">
                {/* Profile */}
                <div className="h-36 grid place-content-center gap-2 mt-2">
                  <div className="grid place-content-center">
                    <Avatar
                      src={
                        <img
                          src={user.picture}
                          alt="avatar"
                          referrerPolicy="no-referrer"
                        />
                      }
                      style={{
                        fontSize: "16px",
                      }}
                      size={75}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 justify-start items-center">
                    <h1
                      className="text-center"
                      style={{ color: user.theme.textColor }}
                    >
                      {user.name}
                    </h1>
                    <p
                      className="text-xs"
                      style={{ color: user.theme.subTextColor }}
                    >
                      @{user.username}
                    </p>
                  </div>
                </div>
                {/* Content */}
                <div className="my-2 mb-20 flex flex-col justify-center items-center gap-2 relative px-2">
                  {user.links.map((item, index) => (
                    <a
                      key={index}
                      onClick={() => handleClick(item.id)}
                      href={item.url}
                      className="min-h-8 w-full text-sm rounded-md px-4 flex justify-center items-center"
                      style={{
                        backgroundColor: user.theme.cardColor,
                        color: user.theme.cardTextColor,
                      }}
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
