import {selectCurrentUser} from 'features/auth/authSlice'
import {useTypedSelector} from 'hooks/store'
import {useUpdateProfileMutation} from 'services/jobHuntApi'
import styled from 'styled-components'
import { ProfileForm, ProfileValues, ProfilePageWrapper } from 'ui'
import { ReactComponent as ProfileDetails } from 'assets/images/undraw_profile_details.svg'

const StyledProfileDetails = styled(ProfileDetails)`
  margin: 2rem auto;
  max-height: 400px;
  width: 90%;
`

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
      <StyledProfileDetails/>
    </ProfilePageWrapper>
  )
}

export default Profile
