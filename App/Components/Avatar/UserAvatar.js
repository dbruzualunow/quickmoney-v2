import React from 'react';
import { Avatar } from 'react-native-elements';
import styles from '../../Screens/Profile/Styles/ProfileScreenStyles';
import { ORIGIN_API } from '../../Services/ApiService';

const UserAvatar = ({ size = 100, url = false, title = "" }) => {
  return (
    <>
      {url ? <Avatar
        size={size}
        rounded
        source={{ uri: url }}
        containerStyle={styles.avatarContainerStyle}
      /> : <Avatar
        size={size}
        rounded
        title={title}
        containerStyle={styles.avatarContainerStyle}
      />}
    </>
  )
}

export default UserAvatar