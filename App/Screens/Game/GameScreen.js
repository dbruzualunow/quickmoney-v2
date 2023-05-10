import React, { useEffect, useState, useContext } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/dist/Feather";
import { Card } from "../../Components/Games/Card";
import { Craps } from "../../Components/Games/Craps";
import { Tragaperra } from "../../Components/Games/Tragaperra";
import { CardPickerModal } from "../../Components/Modal/CardPickerModal";
import { CrapsModal } from "../../Components/Modal/CrapsModal";
import { TragaperraModal } from "../../Components/Modal/TragaperraModal";
import { alazar } from "../../helpers/Alazar";
import ApiService from "../../Services/ApiService";
import translate from "../../I18n";
import { useIsFocused } from "@react-navigation/native";
// import { RewardedAd, RewardedAdEventType, TestIds, AdEventType } from '@react-native-firebase/admob';
// import Config from '../../Config';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../Metrics";
// import { AdsContext } from "../../Context/AdsContextProvider";
// import { AppodealInterstitialEvent } from "react-native-appodeal";

// const adUnitId = Config.ADMOB_ID;

const GameScreen = ({ navigation }) => {
  const TYPES = ["corazones", "treboles", "diamantes", "picas"];

  const imagesMaquinas = {
    2: require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_2.png`),
    3: require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_3.png`),
    4: require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_4.png`),
  };

  const simbolos = {
    jackpot: 10,
    siete_icon: 2,
    naranja_icon: 3,
    patilla_icon: 4,
    bar1_icon: 5,
    bar2_icon: 6,
    bar3_icon: 7,
    kiwi_icon: 8,
    cereza_icon: 9,
    herradura_icon: 1,
  };
  const [yourBet, setYourBet] = useState({});
  const isFocused = useIsFocused();

  const [numCardsAvailable, setNumCardsAvailable] = useState(4);
  const [numDicesAvailable, setNumDicesAvailable] = useState(4);
  const [numNumbersAvailable, setNumNumbersAvailable] = useState(4);

  const [isVisibleCardPickerModal, setIsVisibleCardPickerModal] =
    useState(false);
  const [isVisibleCrapsModal, setIsVisibleCrapsModal] = useState(false);
  const [isVisibleTragaperraModal, setIsVisibleTragaperraModal] =
    useState(false);

  const [type, setType] = useState();

  const [currentMinigameIndex, setCurrentMinigameIndex] = useState(null);
  const [cardIndex, setCardIndex] = useState([]);
  const [dadoIndex, setDadoIndex] = useState([]);
  const [tragaperraIndex, setTragaperraIndex] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  // const [dataToScratchScreen, setDataToScratchScreen] = useState(null);
  // const {showRewardedAd, stateAd} = useContext(AdsContext);

  useEffect(() => {
    ApiService.getGameConfig()
      .then((response) => {
        if (response?.data?.data[0]?.attributes) {
          const { numCardsAvailable, numDicesAvailable, numNumbersAvailable } =
            response?.data?.data[0]?.attributes;

          setNumCardsAvailable(numCardsAvailable);
          setNumDicesAvailable(numDicesAvailable);
          setNumNumbersAvailable(numNumbersAvailable);

          setCardIndex(Array.from({ length: numCardsAvailable }).fill(null));
          setDadoIndex(Array.from({ length: numDicesAvailable }).fill(0));
          setTragaperraIndex(
            Array.from({ length: numNumbersAvailable }).fill("jackpot")
          );

          setIsLoading(false);
        }
      })
      .catch((error) => {
        const errorMessage = error.message === "Network Error" ? translate('general.networkError') : translate('general.generalError')
        Alert.alert('Error', errorMessage, [
          { text: "OK", onPress: () => navigation.navigate('Home')},
        ])
      });
  }, [isFocused]);

  const handleRandomize = () => {
    //cardIndex random
    const cardIndexRandom = Array.from({ length: numCardsAvailable }).map(
      (_, index) => {
        return alazar(1, 12, cardIndex[index]);
      }
    );
    setCardIndex(cardIndexRandom);

    //dadoIndex random
    const dadoIndexRandom = Array.from({ length: numDicesAvailable }).map(
      (_, index) => {
        return alazar(1, 6, dadoIndex[index]);
      }
    );
    setDadoIndex(dadoIndexRandom);

    //tragaperraIndex random
    const t = [
      "siete_icon",
      "naranja_icon",
      "patilla_icon",
      "bar1_icon",
      "bar2_icon",
      "bar3_icon",
      "kiwi_icon",
      "cereza_icon",
      "herradura_icon",
    ];
    const tragaperraIndexRandom = Array.from({
      length: numNumbersAvailable,
    }).map((_, index) => {
      const random = t[alazar(0, 8, tragaperraIndex[index])];
      return random;
    });
    setTragaperraIndex(tragaperraIndexRandom);
  };

  const handleCardSelector = (tipo, miniGamePos) => {
    setType(tipo);
    setCurrentMinigameIndex(miniGamePos);
    setIsVisibleCardPickerModal(true);
  };

  const handleCardSelected = (cardNumber, pos) => {
    setIsVisibleCardPickerModal(false);

    const localCardIndex = [...cardIndex];
    localCardIndex[pos] = cardNumber;
    setCardIndex(localCardIndex);
  };

  const handleCrapsSelector = (miniGamePos) => {
    setCurrentMinigameIndex(miniGamePos);
    setIsVisibleCrapsModal(true);
  };

  const handleCrapSelected = (dadoNumber, pos) => {
    const localDadoIndex = [...dadoIndex];
    localDadoIndex[pos] = dadoNumber;
    setDadoIndex(localDadoIndex);
  };

  const handleTragaPerrasSelector = (miniGamePos) => {
    setCurrentMinigameIndex(miniGamePos);
    setIsVisibleTragaperraModal(true);
  };

  const handleTragaperraSelected = (tragaPerraNumber, pos) => {
    const localTragaPerraIndex = [...tragaperraIndex];
    localTragaPerraIndex[pos] = tragaPerraNumber;
    setTragaperraIndex(localTragaPerraIndex);
  };

  // const onCloseReward = async (reward, response) => {
  //     setTimeout(() => {
  //   navigation.navigate('ScratchCardScreen', {
  //       "winningNumbers": response?.data, tragaperraIndex, dadoIndex, cardIndex
  //      })
  //     }, 100)
  // }

  // const showRewarded = (response) => {
  //     // setIsLoadingAdd(true)
  //     // const rewarded = RewardedAd.createForAdRequest(adUnitId);
  //     setLoadingAdd(true)

  //     // only for testing
  //     const rewarded = RewardedAd.createForAdRequest('ca-app-pub-3940256099942544/5224354917');

  //     rewarded.onAdEvent((type, error, reward) => {
  //         if (type === RewardedAdEventType.LOADED) {
  //             rewarded.show();
  //         }
  //         if (type === RewardedAdEventType.EARNED_REWARD) {
  //             setLoadingAdd(false)
  //             try {
  //                 ApiService.postAdVisualization()
  //             } catch (error) {
  //             }
  //         }
  //         if (type === AdEventType.CLOSED) {
  //             onCloseReward(reward, response)
  //         }
  //         //validar si hay mas de 20 tickets
  //         if (type === RewardedAdEventType.FAILED_TO_LOAD) {
  //             Alert.alert('Error', translate('general.error'))
  //             setLoadingAdd(false)
  //             setIsLoading(false)
  //             return null;
  //         }
  //         ``
  //         // The reward should be null if user skiped the ad
  //         if (error) {
  //             // setIsLoadingAdd(false)
  //             Alert.alert('Error', translate('general.error'))
  //             setLoadingAdd(false)
  //             setIsLoading(false)
  //             return null;
  //         }
  //         return null;
  //     });
  //     rewarded.load();
  // }

  const playGame = async () => {
    // 3 CARTAS
    for (let i = 0; i < numCardsAvailable; i++) {
      if (cardIndex[i] === null) {
        Alert.alert("", translate("game.selectAllCards"));
        return;
      }
    }

    for (let i = 0; i < numDicesAvailable; i++) {
      if (dadoIndex[i] === 0) {
        Alert.alert("", translate("game.selectAllDice"));
        return;
      }
    }

    for (let i = 0; i < numNumbersAvailable; i++) {
      if (tragaperraIndex[i] === "jackpot") {
        Alert.alert("", translate("game.selectAllSymbols"));
        return;
      }
    }

    try {
      let bet = {};
      // bet['cardNumber'] = cardIndex[0]
      // bet['cardNumber2'] = cardIndex[1]
      // bet['cardNumber3'] = cardIndex[2]
      // bet['cardNumber4'] = cardIndex[3]

      for (let i = 0; i < numCardsAvailable; i++) {
        if (i === 0) bet["cardNumber"] = cardIndex[i];
        else bet["cardNumber" + (i + 1)] = cardIndex[i];
      }

      bet["diceNumber"] = dadoIndex[0];
      bet["diceNumber2"] = dadoIndex[1];
      bet["diceNumber3"] = dadoIndex[2];
      bet["diceNumber4"] = dadoIndex[3];
      bet["slotNumber"] = simbolos[tragaperraIndex[0]];
      bet["slotNumber2"] = simbolos[tragaperraIndex[1]];
      bet["slotNumber3"] = simbolos[tragaperraIndex[2]];
      bet["slotNumber4"] = simbolos[tragaperraIndex[3]];

      setYourBet(bet);
      const response = await ApiService.playGame(bet);
      // setDataToScratchScreen({
      //   winningNumbers: response.data,
      //   tragaperraIndex,
      //   dadoIndex,
      //   cardIndex,
      // })
      // setIsLoading(true)
      // showRewardedAd()

      navigation.navigate("ScratchCardScreen", {
        winningNumbers: response.data,
        tragaperraIndex,
        dadoIndex,
        cardIndex,
      });
    } catch (error) {
      console.log("error", error.response.data);
      Alert.alert(
        "",
        translate("game.sorryYouDontHaveTicketsOrYouReachedTheDailyLimit")
      );
    }
  };

  // useEffect(() => {
  //   if (
  //       [AppodealInterstitialEvent.FAILED_TO_SHOW,
  //        AppodealInterstitialEvent.FAILED_TO_LOAD,
  //        AppodealInterstitialEvent.SHOWN
  //       ].includes(stateAd) && dataToScratchScreen
  //     ){
  //         setIsLoading(false)
  //         navigation.navigate("ScratchCardScreen", dataToScratchScreen);
  //         setDataToScratchScreen(null)
  //         if (stateAd === AppodealInterstitialEvent.SHOWN) {
  //           try {
  //             ApiService.postAdVisualization()
  //           } catch (error) {
  //           }
  //         }
  //   }
  
  // }, [stateAd])
  
  return (
    <>
      {
        Platform.OS === "ios" && parseInt(Platform.Version) >= 11 ? 
        (<SafeAreaView>
          <ImageBackground
            source={require("../../Assets/Images/BackgroundMain.jpg")}
            resizeMode="cover"
            style={styles.container}
          >
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="#fff"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "55%",
                  transform: [{ translateX: -50 }, { translateY: -50 }],
                }}
              />
            ) : (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <StatusBar />
                  <View style={styles.container}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        marginTop:
                          Platform.OS === "android"
                            ? verticalScale(45)
                            : verticalScale(10),
                      }}
                    >
                      <Pressable onPress={() => navigation.goBack()}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            right: 30,
                          }}
                        >
                          <Icon
                            name="chevron-left"
                            size={moderateScale(23)}
                            color={"white"}
                          />
                          <Text
                            style={{
                              fontFamily: "SFProDisplay-Bold",
                              fontSize: moderateScale(15),
                              fontWeight: "bold",
                              color: "white",
                            }}
                            allowFontScaling={false}
                            adjustsFontSizeToFit={true}
                          >
                            {translate("general.goBack")}
                          </Text>
                        </View>
                      </Pressable>

                      <Pressable onPress={() => handleRandomize()}>
                        <LinearGradient
                          colors={[
                            "rgba(116, 53, 0, 1)",
                            "rgba(255, 246, 193, 1)",
                            "rgba(243, 231, 149, 1)",
                            "rgba(203, 105, 4, 1)",
                            "rgba(235, 134, 6, 1)",
                            "rgba(184, 93, 0, 1)",
                            "rgba(142, 63, 6, 1)",
                          ]}
                          style={styles.buttonAlazar}
                        >
                          <Text
                            style={{
                              fontSize: moderateScale(13),
                              color: "white",
                              fontWeight: "bold",
                            }}
                            allowFontScaling={false}
                            adjustsFontSizeToFit={true}
                          >
                            {translate("game.random")}
                          </Text>
                        </LinearGradient>
                      </Pressable>
                    </View>

                    <View style={styles.gamesContainer}>
                      <View style={styles.cardGames}>
                        <Text style={styles.titleGame}>
                          {translate("game.chooseYourCards")}
                        </Text>
                        <View style={[styles.gameContainer]}>
                          {Array.from({ length: numCardsAvailable }).map(
                            (_, index) => (
                              <Pressable
                                key={index}
                                onPress={() =>
                                  handleCardSelector(TYPES[index], index)
                                }
                              >
                                <Card card={cardIndex[index]} type={TYPES[index]} />
                              </Pressable>
                            )
                          )}
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.cardGames,
                          marginTop: verticalScale(10),
                        }}
                      >
                        <Text style={styles.titleGame}>
                          {translate("game.rollYourDice")}
                        </Text>
                        <View style={[styles.gameContainer]}>
                          {Array.from({ length: numDicesAvailable }).map(
                            (_, index) => (
                              <Pressable
                                key={index}
                                onPress={() => handleCrapsSelector(index)}
                              >
                                <Craps value={dadoIndex[index]} />
                              </Pressable>
                            )
                          )}
                        </View>
                      </View>

                      <View
                        style={{
                          ...styles.cardGames,
                          marginTop: verticalScale(10),
                        }}
                      >
                        <Text style={styles.titleGame}>
                          {translate("game.getYourSymbols")}
                        </Text>
                        <Image
                          source={
                            imagesMaquinas[numNumbersAvailable] ||
                            require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_4.png`)
                          }
                          resizeMode="cover"
                          style={styles.tragaperrasImageContain}
                        />
                        <View style={styles.tragaperraImageResult}>
                          {Array.from({ length: numNumbersAvailable }).map(
                            (_, index) => {
                              return (
                                <View key={index}>
                                  <Pressable
                                    onPress={() => handleTragaPerrasSelector(index)}
                                  >
                                    <Tragaperra
                                      styleValue={{
                                        height: 65,
                                        width: 46,
                                        marginHorizontal: 6.5,
                                      }}
                                      value={tragaperraIndex[index]}
                                    />
                                  </Pressable>
                                </View>
                              );
                            }
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                  <CardPickerModal
                    onSelected={(index) =>
                      handleCardSelected(index, currentMinigameIndex)
                    }
                    onBack={() => setIsVisibleCardPickerModal(false)}
                    tipo={type}
                    visible={isVisibleCardPickerModal}
                  />

                  <CrapsModal
                    onSelected={(index) =>
                      handleCrapSelected(index, currentMinigameIndex)
                    }
                    onBack={() => setIsVisibleCrapsModal(false)}
                    visible={isVisibleCrapsModal}
                  />

                  <TragaperraModal
                    onSelected={(index) =>
                      handleTragaperraSelected(index, currentMinigameIndex)
                    }
                    onBack={() => setIsVisibleTragaperraModal(false)}
                    visible={isVisibleTragaperraModal}
                    currentMinigameIndex={currentMinigameIndex}
                    tragaperraIndex={tragaperraIndex}
                    numNumbersAvailable={numNumbersAvailable}
                  />
                </ScrollView>
                <View style={styles.endButtonAccept}>
                  <Pressable onPress={playGame}>
                    <LinearGradient
                      colors={[
                        "rgba(116, 53, 0, 1)",
                        "rgba(255, 246, 193, 1)",
                        "rgba(243, 231, 149, 1)",
                        "rgba(203, 105, 4, 1)",
                        "rgba(235, 134, 6, 1)",
                        "rgba(184, 93, 0, 1)",
                        "rgba(142, 63, 6, 1)",
                      ]}
                      style={styles.buttonSuccess}
                    >
                      <Text
                        style={{
                          fontSize: moderateScale(15),
                          color: "white",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {translate("general.accept")}
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </>
            )}
          </ImageBackground>
        </SafeAreaView>)
        :
        (<ImageBackground
          source={require("../../Assets/Images/BackgroundMain.jpg")}
          resizeMode="cover"
          style={styles.container}
        >
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{
                position: "absolute",
                top: "50%",
                left: "55%",
                transform: [{ translateX: -50 }, { translateY: -50 }],
              }}
            />
          ) : (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar />
                <View style={styles.container}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                      marginTop:
                        Platform.OS === "android"
                          ? verticalScale(45)
                          : verticalScale(10),
                    }}
                  >
                    <Pressable onPress={() => navigation.goBack()}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          right: 30,
                        }}
                      >
                        <Icon
                          name="chevron-left"
                          size={moderateScale(23)}
                          color={"white"}
                        />
                        <Text
                          style={{
                            fontFamily: "SFProDisplay-Bold",
                            fontSize: moderateScale(15),
                            fontWeight: "bold",
                            color: "white",
                          }}
                          allowFontScaling={false}
                          adjustsFontSizeToFit={true}
                        >
                          {translate("general.goBack")}
                        </Text>
                      </View>
                    </Pressable>

                    <Pressable onPress={() => handleRandomize()}>
                      <LinearGradient
                        colors={[
                          "rgba(116, 53, 0, 1)",
                          "rgba(255, 246, 193, 1)",
                          "rgba(243, 231, 149, 1)",
                          "rgba(203, 105, 4, 1)",
                          "rgba(235, 134, 6, 1)",
                          "rgba(184, 93, 0, 1)",
                          "rgba(142, 63, 6, 1)",
                        ]}
                        style={styles.buttonAlazar}
                      >
                        <Text
                          style={{
                            fontSize: moderateScale(13),
                            color: "white",
                            fontWeight: "bold",
                          }}
                          allowFontScaling={false}
                          adjustsFontSizeToFit={true}
                        >
                          {translate("game.random")}
                        </Text>
                      </LinearGradient>
                    </Pressable>
                  </View>

                  <View style={styles.gamesContainer}>
                    <View style={styles.cardGames}>
                      <Text style={styles.titleGame}>
                        {translate("game.chooseYourCards")}
                      </Text>
                      <View style={[styles.gameContainer]}>
                        {Array.from({ length: numCardsAvailable }).map(
                          (_, index) => (
                            <Pressable
                              key={index}
                              onPress={() =>
                                handleCardSelector(TYPES[index], index)
                              }
                            >
                              <Card card={cardIndex[index]} type={TYPES[index]} />
                            </Pressable>
                          )
                        )}
                      </View>
                    </View>

                    <View
                      style={{
                        ...styles.cardGames,
                        marginTop: verticalScale(10),
                      }}
                    >
                      <Text style={styles.titleGame}>
                        {translate("game.rollYourDice")}
                      </Text>
                      <View style={[styles.gameContainer]}>
                        {Array.from({ length: numDicesAvailable }).map(
                          (_, index) => (
                            <Pressable
                              key={index}
                              onPress={() => handleCrapsSelector(index)}
                            >
                              <Craps value={dadoIndex[index]} />
                            </Pressable>
                          )
                        )}
                      </View>
                    </View>

                    <View
                      style={{
                        ...styles.cardGames,
                        marginTop: verticalScale(10),
                      }}
                    >
                      <Text style={styles.titleGame}>
                        {translate("game.getYourSymbols")}
                      </Text>
                      <Image
                        source={
                          imagesMaquinas[numNumbersAvailable] ||
                          require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_4.png`)
                        }
                        resizeMode="cover"
                        style={styles.tragaperrasImageContain}
                      />
                      <View style={styles.tragaperraImageResult}>
                        {Array.from({ length: numNumbersAvailable }).map(
                          (_, index) => {
                            return (
                              <View key={index}>
                                <Pressable
                                  onPress={() => handleTragaPerrasSelector(index)}
                                >
                                  <Tragaperra
                                    styleValue={{
                                      height: 65,
                                      width: 46,
                                      marginHorizontal: 6.5,
                                    }}
                                    value={tragaperraIndex[index]}
                                  />
                                </Pressable>
                              </View>
                            );
                          }
                        )}
                      </View>
                    </View>
                  </View>
                </View>
                <CardPickerModal
                  onSelected={(index) =>
                    handleCardSelected(index, currentMinigameIndex)
                  }
                  onBack={() => setIsVisibleCardPickerModal(false)}
                  tipo={type}
                  visible={isVisibleCardPickerModal}
                />

                <CrapsModal
                  onSelected={(index) =>
                    handleCrapSelected(index, currentMinigameIndex)
                  }
                  onBack={() => setIsVisibleCrapsModal(false)}
                  visible={isVisibleCrapsModal}
                />

                <TragaperraModal
                  onSelected={(index) =>
                    handleTragaperraSelected(index, currentMinigameIndex)
                  }
                  onBack={() => setIsVisibleTragaperraModal(false)}
                  visible={isVisibleTragaperraModal}
                  currentMinigameIndex={currentMinigameIndex}
                  tragaperraIndex={tragaperraIndex}
                  numNumbersAvailable={numNumbersAvailable}
                />
              </ScrollView>
              <View style={styles.endButtonAccept}>
                <Pressable onPress={playGame}>
                  <LinearGradient
                    colors={[
                      "rgba(116, 53, 0, 1)",
                      "rgba(255, 246, 193, 1)",
                      "rgba(243, 231, 149, 1)",
                      "rgba(203, 105, 4, 1)",
                      "rgba(235, 134, 6, 1)",
                      "rgba(184, 93, 0, 1)",
                      "rgba(142, 63, 6, 1)",
                    ]}
                    style={styles.buttonSuccess}
                  >
                    <Text
                      style={{
                        fontSize: moderateScale(15),
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {translate("general.accept")}
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </>
          )}
        </ImageBackground>)
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: verticalScale(770),
    paddingBottom: verticalScale(60),
  },
  buttonAlazar: {
    flex: 1,
    alignItems: "center",
    width: horizontalScale(100),
    left: horizontalScale(20),
    borderRadius: moderateScale(15),
    borderColor: "#743101",
    borderWidth: 1,
    padding: 10,
  },
  gamesContainer: {
    marginHorizontal: horizontalScale(15),
    marginTop: verticalScale(15),
    alignContent: "center",
  },
  gameContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  titleGame: {
    textAlign: "center",
    fontFamily: "Casino-Regular",
    fontSize: moderateScale(30),
    color: "#CBCCAA",
    marginVertical: verticalScale(8),
  },
  buttonSuccess: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    borderRadius: moderateScale(20),
    marginTop: verticalScale(10),
  },
  cardGames: {
    borderWidth: moderateScale(8),
    borderRadius: moderateScale(10),
    borderColor: "rgba(255, 255, 255, 0.4)",
    paddingVertical: verticalScale(5),
  },
  tragaperrasImageContain: {
    flex: 1,
    width: horizontalScale(304),
    height: verticalScale(150),
  },
  tragaperraImageResult: {
    flex: 1,
    flexDirection: "row",
    bottom: 61,
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
  },
  endButtonAccept: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? verticalScale(150) : verticalScale(100),
    left: 10,
    right: 10,
  },
});

export default GameScreen;
