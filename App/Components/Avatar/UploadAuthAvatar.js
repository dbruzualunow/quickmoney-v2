import React, { useContext } from 'react';
import { Platform, Pressable } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ApiService, { ORIGIN_API } from '../../Services/ApiService';
import UserAvatar from './UserAvatar';
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider";

const UploadAuthAvatar = () => {
  const { user, state, refreshUser } = useContext(AuthenticationContext);

  const updateUser = async ({ imageId }) => {
    try {
      await ApiService.updateUser(user.id, {
        "avatar": {
          "id": imageId
        }
      });
      refreshUser();
    } catch (error) {
      console.log(error);
    }
  }

  const uploadFile = async (file) => {
    RNFetchBlob.fetch('POST', `${ORIGIN_API}/api/upload`, {
      Authorization: `Bearer ${state.userToken}`,
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      { name: "files", filename: file.fileName, type: file.type, data: RNFetchBlob.wrap(Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri) }
    ])
      .then((res) => {
        const images = res.json();
        if (Array.isArray(images) && images.length > 0) {
          const imageId = images[0].id;
          updateUser({ imageId });
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleChoosePhoto = () => {
    launchImageLibrary({ includeBase64: false, mediaType: "photo" }, (response) => {
      if (response?.assets?.length > 0) {
        const file = response?.assets[0];
        uploadFile(file);
      }
    });
  }

  return (
    <Pressable onPress={handleChoosePhoto}>
      <UserAvatar size={100} url={user?.avatar?.url} title={user?.name?.charAt(0)} />
    </Pressable>
  )
}

export default UploadAuthAvatar