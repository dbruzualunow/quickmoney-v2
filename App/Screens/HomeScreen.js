import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import Header from "../Components/CustomUI/Header";
import { useIsFocused } from "@react-navigation/native";
import LocaleFormatNumber from "../helpers/LocaleFormatNumber";

import translate from "../I18n";
import Colors from "../Themes/Colors";

import TopPlayersCard from "../Components/Home/TopPlayersCard";
import TopChainsCard from "../Components/Home/TopChainsCard";
import ApiService from "../Services/ApiService";
import { AuthenticationContext } from "../Context/AuthenticationContextProvider";
import { moderateScale, horizontalScale, verticalScale } from "../../Metrics";
import { AdsContext } from "../Context/AdsContextProvider";

const HomeScreen = (props) => {
  const isFocused = useIsFocused();

  const { navigation } = props;
  const [totalOnlineUsers, setTotalOnlineUsers] = useState(0);
  const [totalEarnedPrices, setTotalEarnedPrices] = useState(0);
  const [totalChainEarnedPrices, setTotalChainEarnedPrices] = useState(0);
  const [avaliablePrizes, setAvaliablePrizes] = useState([
    { index: 1, quantity: 2000 },
    { index: 2, quantity: 1000 },
    { index: 3, quantity: 500 },
  ]);
  const [topPlayers, setTopPlayers] = useState([]);
  const [topChains, setTopChains] = useState([]);
  const [loading, setLoading] = useState(true);

  const { signOut } = useContext(AuthenticationContext);
  const { showRewardedAd } = useContext(AdsContext);

  const getTotalEarnedPrices = async () => {
    try {
      const response = await ApiService.getTotalEarnedPrices();
      const result = response?.data?.total;
      setTotalEarnedPrices(result);
    } catch (error) {
      if (error?.response?.data?.error?.name === "UnauthorizedError") {
        signOut();
      }
    }
  };

  const getTotalChainEarnedPrices = async () => {
    try {
      const response = await ApiService.getTotalChainEarnedPrices();
      const result = response?.data?.total;
      setTotalChainEarnedPrices(result);
    } catch (error) {
      if (error?.response?.data?.error?.name === "UnauthorizedError") {
        signOut();
      }
    }
  };

  const getAvaliablePrizes = async () => {
    const response = await ApiService.getAvaliablePrizes();
    const result = response?.data?.data[0]?.attributes?.item;
    setAvaliablePrizes(result);
  };

  const getTotalOnlineUsers = async () => {
    const response = await ApiService.getTotalOnlineUsers();
    const result = response?.data?.total;
    setTotalOnlineUsers(result);
  };

  const getTopPlayers = async () => {
    const response = await ApiService.getTopPlayers();
    /* console.log(
      "========================= TOP PLAYERS =========================",
      response
    ); */
    if (Array.isArray(response.data)) {
      setTopPlayers(response.data);
    }
  };

  const getTopChains = async () => {
    const { data } = await ApiService.getTopChains();
    if (Array.isArray(data)) {
      setTopChains(data);
    }
  };

  const setTimeZoneOffset = async () => {
    await ApiService.setTimeZoneOffset();
  }

  useEffect(() => {
    Promise.all([
      getTotalEarnedPrices(),
      getTotalChainEarnedPrices(),
      getAvaliablePrizes(),
      getTopPlayers(),
      getTopChains(),
      getTotalOnlineUsers(),
      setTimeZoneOffset()
    ])
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isFocused]);

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.winGreen}
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        <>
          <Header showUserLink showAppIcon showRankingLink={false} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
              <View style={styles.topRows}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Image
                    style={styles.OnUser}
                    source={require("../Assets/Images/Dot_Sizelg.png")}
                  />
                  <Text style={styles.smallTopText}>
                    {translate("home.totalOnlineUsers", {
                      number: totalOnlineUsers,
                    })}
                  </Text>
                </View>
              </View>
              <View style={styles.topRows}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ marginRight: 5 }}
                    source={require("../Assets/Icons/premio.png")}
                  />
                  <Text style={styles.smallTopText}>
                    {translate("home.numberPricesDistributed", {
                      number: LocaleFormatNumber(totalEarnedPrices),
                    })}
                  </Text>
                </View>
              </View>
              <View style={styles.topRows}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Image
                    style={{ marginRight: 5 }}
                    source={require("../Assets/Icons/premio.png")}
                  />
                  <Text style={styles.smallTopText}>
                    {translate("home.totalPrices", {
                      number: LocaleFormatNumber(totalChainEarnedPrices),
                    })}
                  </Text>
                </View>
              </View>
              {avaliablePrizes && (
                <View style={{ paddingBottom: 25 }}>
                  {avaliablePrizes &&
                    avaliablePrizes.map(({ index, quantity }, key) => (
                      <View style={styles.pricesDistributedRow} key={key}>
                        {index === 1 && (
                          <Image
                            style={{ marginLeft: -3, width: 30, height: 30 }}
                            source={require("../Assets/Images/Trofeos/fluent-emoji_trophy.png")}
                            resizeMode="contain"
                          />
                        )}
                        {index === 2 && (
                          <Image
                            style={{ marginLeft: -3, width: 30, height: 30 }}
                            source={require("../Assets/Images/Trofeos/fluent-emoji_trophy-1.png")}
                            resizeMode="contain"
                          />
                        )}
                        {index === 3 && (
                          <Image
                            style={{ marginLeft: -3, width: 30, height: 30 }}
                            source={require("../Assets/Images/Trofeos/fluent-emoji_trophy-2.png")}
                            resizeMode="contain"
                          />
                        )}
                        {index === 4 && (
                          <Image
                            style={{ marginLeft: -3, width: 30, height: 30 }}
                            source={require("../Assets/Images/Trofeos/fluent-emoji_sports-medal.png")}
                            resizeMode="contain"
                          />
                        )}
                        <Text
                          style={[
                            styles.pricesDistributedRowText,
                            { fontWeight: "bold", flex: 3, marginLeft: 20 },
                          ]}
                        >
                          {index + " "}
                          <Text style={styles.pricesDistributedRowText}>
                            {translate("home.accumulatedPrize")}
                          </Text>
                        </Text>
                        <Text
                          style={[
                            styles.pricesDistributedRowText,
                            {
                              color: Colors.winGreen,
                              flex: 1,
                              textAlign: "right",
                            },
                          ]}
                        >
                          {LocaleFormatNumber(quantity)}€
                        </Text>
                      </View>
                    ))}
                </View>
              )}
              <Pressable onPress={() => navigation.navigate('PlayGame')}>
                <View style={styles.TestYourLuck}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: moderateScale(16),
                      fontWeight: "bold",
                    }}
                  >
                    {translate("game.optForBoats")}
                  </Text>
                </View>
              </Pressable>
              <TopPlayersCard topPlayers={topPlayers} />
              <TopChainsCard topChains={topChains} />
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
    paddingTop: verticalScale(10),
    minHeight: verticalScale(100),
    paddingBottom: verticalScale(70),
    backgroundColor: Colors.backgroundColor,
  },
  topRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: horizontalScale(330),
    marginVertical: verticalScale(3),
  },
  smallTopText: {
    fontSize: moderateScale(15),
  },
  pricesDistributedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: horizontalScale(330),
    marginVertical: verticalScale(2),
  },
  pricesDistributedRowText: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
  },
  TestYourLuck: {
    backgroundColor: "#4f7664",
    width: horizontalScale(280),
    height: verticalScale(40),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: verticalScale(5),
    borderRadius: moderateScale(40),
  },
  OnUser: {
    marginRight: horizontalScale(5),
    width: horizontalScale(18),
    height: verticalScale(15),
  },
});

export default HomeScreen;
