import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export interface UserLinkModel {
  id: number;
  title: string;
  url: string;
  userId: string;
  views: number;
}

export type UserTheme = {
  id: number;
  themeName: string;
  bgColor: string; // Background color
  textColor: string; // Main text color
  subTextColor: string; // Subtext color
  cardColor: string; // Card background color
  cardTextColor: string; // Card text color
  bgImage: string | null;
};

export interface UserModel {
  id: number;
  auth0Id: string;
  name: string;
  username: string;
  picture: string;
  themeId: number;
  theme: UserTheme;
  links: UserLinkModel[];
}
interface UserContextType {
  user: any; // Replace with your user type
  localUser: UserModel | null; // Use the Link type
  loading: boolean;
  error: string | null;
  createUserLink: (title: string, url: string) => Promise<void>;
  editUserLink: (model: UserLinkModel) => Promise<void>;
  deleteUserLink: (linkId: number) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [localUser, setLocalUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchData = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get<UserModel>(
            `${import.meta.env.VITE_AUTH0_AUDIENCE}/users/${user.sub}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setLocalUser(response.data);
        } catch (err: any) {
          if (err.status === 404) {
            try {
              const token = await getAccessTokenSilently();
              const model: UserModel = {
                id: 0,
                auth0Id: user.sub!,
                name: user.name!,
                username: user.nickname!,
                picture: user.picture!,
                themeId: 0,
                theme: {} as UserTheme,
                links: [],
              };
              const response = await axios.post<{ user: UserModel }>(
                `${import.meta.env.VITE_AUTH0_AUDIENCE}/users/`,
                model,

                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              setLocalUser(response.data.user);
            } catch (err: any) {
              console.log(err);
              setError(err.message);
            }
          }

          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthenticated, user, localUser, getAccessTokenSilently]);

  const createUserLink = async (title: string, url: string) => {
    const auth0Id = user?.sub;
    if (!auth0Id) {
      console.warn("User ID is missing. Cannot create link.");
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post<UserLinkModel>(
        `${import.meta.env.VITE_AUTH0_AUDIENCE}/links`,
        { title, url, auth0Id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update the state by adding the new link
      setLocalUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          links: [...prevUser.links, response.data],
        };
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };
  const editUserLink = async (model: UserLinkModel) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.put<UserLinkModel>(
        `${import.meta.env.VITE_AUTH0_AUDIENCE}/links`,
        model,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update the state by replacing the edited link
      setLocalUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          links: prevUser.links.map((item) =>
            item.id === response.data.id ? response.data : item,
          ),
        };
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteUserLink = async (linkId: number) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.delete<UserLinkModel>(
        `${import.meta.env.VITE_AUTH0_AUDIENCE}/links/${linkId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLocalUser((prevUser) => {
        if (!prevUser) return prevUser;
        return {
          ...prevUser,
          links: prevUser.links.filter((item) => item.id !== linkId),
        };
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        localUser,
        loading,
        error,
        createUserLink,
        editUserLink,
        deleteUserLink,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
