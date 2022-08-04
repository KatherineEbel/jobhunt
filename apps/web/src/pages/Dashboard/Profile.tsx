import {useAppContext} from 'context/appContext'
import { ProfileForm, ProfileValues, ProfilePageWrapper } from 'ui'

const Profile = () => {
  const { updateUser, user } = useAppContext()
  if (!user) return null

  const onSubmit = async (values: ProfileValues) => {
    await updateUser(values)
  }
  return (
    <ProfilePageWrapper>
      <h1>Profile Page</h1>
      <ProfileForm onSubmit={onSubmit} user={user}/>
    </ProfilePageWrapper>
  )
}

export default Profile
