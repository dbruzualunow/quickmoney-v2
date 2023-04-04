import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import translate from "../../I18n";
import Card from "../CustomUI/Card";

import styles from "./Styles/MyChainsCardStyles";
import ApiService from "../../Services/ApiService";
import UserAvatar from "../Avatar/UserAvatar";
import LocaleFormatNumber from "../../helpers/LocaleFormatNumber";
import I18n from "i18n-js";
import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../../Themes/Colors";
import stylesTopPlayers from "./Styles/TopPlayersCardStyles";

const TopChainsCard = ({ topChains }) => {
  const navigation = useNavigation();

  /* useEffect(() => {
    console.log("CANTIDAD DE TOP CHAINS: ", topChains.length);
  }, [topChains]); */

  const renderChainRow = ({ name, acumulated, avatar, username_ }, key) => (
    <View style={stylesTopPlayers.topPlayerRow} key={key}>
      <View style={stylesTopPlayers.avatarUsernameContainer}>
        <UserAvatar size={36} url={avatar?.url} title={username_?.charAt(0)} />
        <Text style={{ fontSize: 16 }}>{username_}</Text>
      </View>
      <View>
        <Text style={stylesTopPlayers.addedAmount}>{`${LocaleFormatNumber(
          acumulated
        )}€`}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ width: "100%" }}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Card>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TopRanking", {
                topRanking: topChains,
                isTopChains: true,
                type: "topChains",
              });
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text style={styles.title}>{translate("chains.myChains")}</Text>
              <Icon name="chevron-right" size={28} />
            </View>
            <View>
              {topChains.map(
                (chain, key) => key < 3 && renderChainRow({ ...chain }, key)
              )}
            </View>
          </TouchableOpacity>
        </Card>
      </View>

      <View style={{ width: "100%", alignItems: "center" }}>
        <Card>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChainSimulator", {
                topRanking: topChains,
                isTopChains: true,
              });
            }}
          >
            <View style={styles.chainSimulatorContainer}>
              <Text style={styles.titleSimulatorChain}>
                {translate("general.chainSimulator")}
              </Text>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.gameImage}
                  source={
                    I18n.locale === "es"
                      ? require("../../Assets/Images/chain_simulator.png")
                      : require("../../Assets/Images/chain_simulator.png")
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};

export default TopChainsCard;
