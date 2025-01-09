import { useAuth0 } from "@auth0/auth0-react"

export default function Profile() {
  const { user } = useAuth0();
  console.log(user);

  return (

    <div>
      <h1>Profile</h1>
      <p>{user?.name}</p>
    </div>
  )

}
