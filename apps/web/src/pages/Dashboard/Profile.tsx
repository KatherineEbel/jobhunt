import {selectCurrentUser} from 'features/auth/authSlice'
import {useTypedSelector} from 'hooks/store'
import {useUpdateProfileMutation} from 'services/jobHuntApi'
import { ProfileForm, ProfileValues, ProfilePageWrapper } from 'ui'

const Profile = () => {
  const user = useTypedSelector(selectCurrentUser)
  const [updateProfile] = useUpdateProfileMutation()
  if (!user) return null

  const onSubmit = async (values: ProfileValues) => {
    await updateProfile(values)
  }
  return (
    <ProfilePageWrapper>
      <h1>Profile Page</h1>
      <ProfileForm onSubmit={onSubmit} user={user}/>
    </ProfilePageWrapper>
  )
}

export default Profile
