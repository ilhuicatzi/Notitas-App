import { useAuth } from "../../../hooks/useAuth"

function ProfilePage() {
  const { user } = useAuth()
  
  //console.log(user);
  return (
    <div>
      <h1>Profile</h1>
      <p>
        {JSON.stringify(user, null, 2)}
      </p>
    </div>
  )
}

export default ProfilePage