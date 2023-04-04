import dynamicLinks from "@react-native-firebase/dynamic-links";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PARAMETERS = {
  domainUrlPrefix: "https://redpyv.page.link",
  link: "https://appquickmoney.com",
  sharingCodeKey: "sharing-code",
};

export const buildShareLink = async (userSharingCode) => {
  let shareLink = null;

  try {
    shareLink = await dynamicLinks().buildShortLink({
      link: `${getLinkWithSharingCodeKey()}${userSharingCode}`,
      domainUriPrefix: PARAMETERS.domainUrlPrefix,
      android: {
        packageName: "app.redpyv.quick",
      },
      ios: {
        bundleId: "app.redpyv.quick",
        appStoreId: "1628578094",
      },
    });
  } catch (error) {
    console.log("Error - buildShareLink: ", error);
  }

  return shareLink;
};

export const handleShareLink = async () => {
  try {
    const link = await dynamicLinks().getInitialLink();
    if (link !== null && link.url.includes(getLinkWithSharingCodeKey())) {
      const sharingCodeValue = link.url
        .split(getLinkWithSharingCodeKey())
        .pop();
      await AsyncStorage.setItem(PARAMETERS.sharingCodeKey, sharingCodeValue);
    }
  } catch (error) {
    console.log("Error - handleShareLink: ", error);
  }
};

export const getStoredSharingCode = async () => {
  return await AsyncStorage.getItem(PARAMETERS.sharingCodeKey);
};

export const clearStoredSharingCode = async () => {
  await AsyncStorage.removeItem(PARAMETERS.sharingCodeKey);
};

const getLinkWithSharingCodeKey = () => {
  return `${PARAMETERS.link}?${PARAMETERS.sharingCodeKey}=`;
};
