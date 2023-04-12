import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Header from "../../Components/CustomUI/Header";
import translate, { setI18nConfig } from "../../I18n";
import UploadAuthAvatar from "../../Components/Avatar/UploadAuthAvatar";
import DeleteAccountModal from "../../Components/Profile/DeleteAccountModal";
import LogoutModal from "../../Components/Profile/LogoutModal";
import WithdrawMoneyModal from "../../Components/Profile/WithdrawMoneyModal";
import CountryCodes from "../../Config/CountryCodes.json";
import ApiService from "../../Services/ApiService";
import styles from "./Styles/ProfileScreenStyles";
import I18n from "i18n-js";
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider";
import { buildShareLink } from "../../helpers/DynamicLinks";
import LocaleFormatNumber from "../../helpers/LocaleFormatNumber";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isVisibleWithdrawMoneyModal, setIsVisibleWithdrawMoneyModal] =
    useState(false);
  const [isVisibleDeleteAccountModal, setIsVisibleDeleteAccountModal] =
    useState(false);
  const [isVisibleLogoutModal, setIsVisibleLogoutModal] = useState(false);
  const [avaliablePrizes, setAvaliablePrizes] = useState(0);
  const [numbersPrizesWins, setNumbersPrizesWins] = useState(0);
  const [totalPrizes, setTotalPrizes] = useState(0);
  const [value, setValue] = useState(0);

  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    console.log("EL User", user);
    // Promise.all([ApiService.getMyPrices(), ApiService.getChainPrizesByUser(user.id)]).then((responses) => {
    //     const winnedPrizes = responses[0].data.filter(({ status }) => status === "win")
    //     const winnedChainPrizesTotal = responses[1].data.data.length > 0 ? responses[1].data.data[0].attributes.acumulated : 0
    //     const winnedPrizesTotal = user.totalPrizes || 0
    //     const winnedTotal = winnedChainPrizesTotal + winnedPrizesTotal
    //     setWinnedPrizes(winnedPrizes.length)
    //     setWinnedChainPrizes(winnedTotal)
    // })
    ApiService.getPrizeSummary()
      .then((response) => {
        const { totalAvailable, numbersPrizesWins, totalPrizes } =
          response.data;
        setAvaliablePrizes(totalAvailable);
        setNumbersPrizesWins(numbersPrizesWins);
        setTotalPrizes(totalPrizes);
      })
      .catch((error) => {
        console.log("ERROR: ", { error });
      });
  }, [isVisibleWithdrawMoneyModal]);

  const shareInvitationCode = async () => {
    try {
      const waitCode = await buildShareLink(user?.sharingCode);

      console.log(translate("profile.shareCode", { sharingCode: waitCode }));
      const result = await Share.share({
        title: translate("profile.inviteFriend"),
        message: translate("profile.shareCode", { sharingCode: waitCode }),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChangeLanguage = async (value) => {
    const res = await setI18nConfig(value);
    setValue(value + 1);
    const resApi = await ApiService.updateUser(user.id, { language: value });
  };
  const countryItems = CountryCodes.map(({ name, code }) => ({
    label: name,
    value: code,
  }));
  const foundedCountry =
    user && countryItems.find(({ value }) => value === user.country);

  return (
    <View>
      <Header backTitle={translate("profile.profile")} />
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.avatarRowContainerStyle}>
            <UploadAuthAvatar />
            <View>
              <Text
                style={styles.username}
                allowFontScaling={false}
                adjustsFontSizeToFit={true}
              >
                {user?.username_.length > 15
                  ? user?.username_.substring(0, 12) + "..."
                  : user?.username_}
              </Text>
              <View style={styles.rowIcon}>
                <Image
                  resizeMode="contain"
                  style={styles.avatarIcon}
                  source={require("../../Assets/Icons/QuickAppIcon.png")}
                />
                <Text>
                  {`${LocaleFormatNumber(totalPrizes)}€`}{" "}
                  {translate("general.accumulated")}
                </Text>
              </View>
              <View style={styles.rowIcon}>
                <Image
                  resizeMode="contain"
                  style={{ ...styles.avatarIcon, tintColor: "gold" }}
                  source={require("../../Assets/Icons/coin.png")}
                />
                <Text>
                  {`${LocaleFormatNumber(avaliablePrizes)}€`}{" "}
                  {translate("general.available")}
                </Text>
              </View>
              <View style={styles.rowIcon}>
                <Image
                  resizeMode="contain"
                  style={{ ...styles.avatarIcon, marginLeft: 1 }}
                  source={require("../../Assets/Icons/premio.png")}
                />
                <Text>
                  {translate("profile.winnedPrizes", {
                    winnedPrizes: numbersPrizesWins,
                  })}
                </Text>
              </View>
              {foundedCountry && (
                <View style={styles.rowIcon}>
                  <Image
                    resizeMode="contain"
                    style={styles.avatarIcon}
                    source={require("../../Assets/Icons/icon-location.png")}
                  />
                  <Text style={{ flex: 1, flexWrap: "wrap" }}>
                    {foundedCountry.label}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.profileContainer}>
            <Text style={styles.title}>{translate("profile.myAccount")}</Text>
            <TouchableOpacity
              style={styles.profileRow}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              <Text>{translate("profile.editInformation")}</Text>
              <Image
                style={styles.profileRowIcon}
                resizeMode="contain"
                source={require("../../Assets/Icons/User.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileRow}
              onPress={() => {
                setIsVisibleWithdrawMoneyModal(true);
              }}
            >
              <Text>{translate("profile.withdrawMoney")}</Text>
              <Image
                style={styles.profileRowIcon}
                resizeMode="contain"
                source={require("../../Assets/Icons/retirar-dinero.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileRow}
              onPress={shareInvitationCode}
            >
              <Text>{translate("profile.inviteFriend")}</Text>
              <Image
                style={styles.profileRowIcon}
                resizeMode="contain"
                source={require("../../Assets/Icons/Gift.png")}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
                            style={styles.profileRow}
                            onPress={() => { setIsVisibleInvitationCodeModal(true) }}
                        >
                            <Text>{translate('profile.insertCode')}</Text>
                            <Image
                                style={styles.profileRowIcon}
                                resizeMode='contain'
                                source={require('../../Assets/Icons/dashicons_insert.png')} />
                        </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.profileRow}
              onPress={() => {
                navigation.navigate("Help");
              }}
            >
              <Text>{translate("profile.help")}</Text>
              <Image
                style={styles.profileRowIcon}
                resizeMode="contain"
                source={require("../../Assets/Icons/ayuda.png")}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.profileRow}
              onPress={() => {
                navigation.navigate("PaymentHistorics");
              }}
            >
              <Text>{translate("profile.paymentsHistorics")}</Text>
              <Image
                style={styles.profileRowIcon}
                resizeMode="contain"
                source={require("../../Assets/Icons/coin.png")}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
                            style={[styles.profileRow, { borderBottomWidth: 0 }]}
                            onPress={() => { navigation.navigate('Home') }}
                        >
                            <Text>{translate('profile.notifications')}</Text>
                            <Image
                                style={styles.profileRowIcon}
                                resizeMode='contain'
                                source={require('../../Assets/Icons/codicon_bell.png')} />
                        </TouchableOpacity> */}
            <Text style={styles.title}>{translate("profile.settings")}</Text>
            <RNPickerSelect
              placeholder={{}}
              value={I18n.locale}
              onValueChange={handleChangeLanguage}
              items={[
                { label: "Español", value: "es" },
                { label: "English", value: "en" },
              ]}
            >
              <TouchableOpacity style={styles.profileRow}>
                <Text>{translate("general.language")}</Text>
                <Image
                  style={styles.profileRowIcon}
                  resizeMode="contain"
                  source={require("../../Assets/Icons/translate-02.png")}
                />
              </TouchableOpacity>
            </RNPickerSelect>
            <TouchableOpacity
              style={styles.profileRow}
              onPress={() => {
                navigation.navigate("DataPrivacy", { showPrivacy: true });
              }}
            >
              <Text>{translate("profile.privacitySecurity")}</Text>
              <Image
                style={styles.profileRowIcon}
                resizeMode="contain"
                source={require("../../Assets/Icons/security.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileRow}
              onPress={() => {
                navigation.navigate("DataPrivacy", {
                  showTermsAndConditions: true,
                });
              }}
            >
              <Text>{translate("profile.dataPrivacy")}</Text>
              <Image
                style={styles.profileRowIcon}
                resizeMode="contain"
                source={require("../../Assets/Icons/cookies.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileRow}
              onPress={() => {
                setIsVisibleLogoutModal(true);
              }}
            >
              <Text>{translate("profile.closeSession")}</Text>
              <Image
                style={styles.profileRowIcon}
                resizeMode="contain"
                source={require("../../Assets/Icons/salir.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.profileRow, { borderBottomWidth: 0 }]}
              onPress={() => {
                setIsVisibleDeleteAccountModal(true);
              }}
            >
              <Text>{translate("profile.deleteAccount")}</Text>
              <Image
                style={styles.profileRowIcon}
                resizeMode="contain"
                source={require("../../Assets/Icons/carbon_trash-can.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <DeleteAccountModal
        isVisible={isVisibleDeleteAccountModal}
        onDismiss={() => {
          setIsVisibleDeleteAccountModal(false);
        }}
      />
      <WithdrawMoneyModal
        isVisible={isVisibleWithdrawMoneyModal}
        onDismiss={() => {
          setIsVisibleWithdrawMoneyModal(false);
        }}
      />
      <LogoutModal
        isVisible={isVisibleLogoutModal}
        onDismiss={() => {
          setIsVisibleLogoutModal(false);
        }}
      />

      {/* <InvitationCodeModal isVisible={isVisibleInvitationCodeModal} onDismiss={() => { setIsVisibleInvitationCodeModal(false) }} /> */}
    </View>
  );
};

export default ProfileScreen;
