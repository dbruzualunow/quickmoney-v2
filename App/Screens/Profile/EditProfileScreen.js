import React, { useContext, useState } from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import Header from "../../Components/CustomUI/Header";
import ProfileInput from "../../Components/CustomUI/ProfileInput";
import CustomButton from "../../Components/CustomUI/Button";
import CountryCodes from "../../Config/CountryCodes.json";

import translate from "../../I18n";

import styles from "./Styles/EditProfileScreenStyles";
import ApiService from "../../Services/ApiService";
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider";
import { Alert } from "react-native";

const EditProfileScreen = () => {
  const { user, refreshUser } = useContext(AuthenticationContext);

  const [editUser, setEditUser] = useState(user);
  const [loading, setLoading] = useState(false);

  const countryItems = CountryCodes.map(({ name, code }) => ({
    label: name,
    value: code,
  }));

  const { name, phoneNumber, email, country, username_ } = editUser;

  const updateUser = async () => {
    try {
      setLoading(true);
      const response = await ApiService.updateUser(user.id, {
        name,
        phoneNumber,
        email,
        country,
        username_,
      });
      if (response) console.log("UPDATED");
      setLoading(false);
      refreshUser();
    } catch (error) {
      console.log(error?.response?.data?.error?.message);
      if (
        error?.response?.data?.error?.message ===
        "This attribute must be unique"
      ) {
        Alert.alert("Error", translate("profile.uniqueUsernameError"), [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
      setLoading(false);
    }
  };

  const foundedCountry = countryItems.find(({ value }) => value === country);

  return (
    <View>
      <Header backTitle={translate("profile.profile")} />
      <View style={styles.mainContainer}>
        <ProfileInput
          label={translate("general.name")}
          value={name}
          onChangeText={(name) => {
            setEditUser({ ...editUser, name });
          }}
        />
        <ProfileInput
          label={translate("general.username")}
          value={username_}
          onChangeText={(username_) => {
            setEditUser({ ...editUser, username_ });
          }}
          maxLength={15}
        />
        <ProfileInput
          label={translate("general.phone")}
          value={phoneNumber}
          onChangeText={(phoneNumber) => {
            setEditUser({ ...editUser, phoneNumber });
          }}
        />
        <RNPickerSelect
          placeholder={{
            label: translate("authentication.chooseACountry"),
            value: null,
          }}
          onValueChange={(value, index) => {
            setEditUser({ ...editUser, country: value });
          }}
          items={countryItems}
        >
          <ProfileInput
            label={translate("general.country")}
            value={foundedCountry?.label}
            containerStyle={{ minWidth: "100%" }}
          />
        </RNPickerSelect>
        {/* <ProfileInput
                    label={translate('general.language')}
                /> */}
        <ProfileInput
          label={translate("general.email")}
          value={email}
          onChangeText={(email) => {
            setEditUser({ ...editUser, email });
          }}
        />
        <View style={{ width: "80%" }}>
          <CustomButton
            loading={loading}
            onPress={updateUser}
            title={translate("general.save")}
            loadingProps={{
              color: "white",
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default EditProfileScreen;
