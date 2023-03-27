import React from "react";
import { ScrollView, View, Text } from "react-native";
import Header from "../../Components/CustomUI/Header";
import translate from "../../I18n";
import styles from "./Styles/ChainSimulatorStyles";
import ReferredCard from "../../Components/Chain/ReferredCard";
import Button from "../../Components/CustomUI/Button";
import { Alert } from "react-native";
import { useState, useEffect } from "react";
import SimulationResultModal from "../../Components/Chain/SimulationResultModal";
import ApiService from "../../Services/ApiService";
import { isEmpty, isNumber } from "lodash";
import LocaleFormatNumber from "../../helpers/LocaleFormatNumber";

const ChainSimulatorSreen = () => {
  const [totalUsers, setTotalUsers] = useState(1);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [level1, setLevel1] = useState(1);
  const [level2, setLevel2] = useState(0);
  const [level3, setLevel3] = useState(0);
  const [level4, setLevel4] = useState(0);
  const [level5, setLevel5] = useState(0);
  const [level6, setLevel6] = useState(0);
  const [level7, setLevel7] = useState(0);
  const [level8, setLevel8] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [monthlyPrize, setMonthlyPrice] = useState(0);
  const [anualPrize, setAnualPrice] = useState(0);

  useEffect(() => {
    let total = 1;
    let prevLevel = 1;

    const scopedLevels = [
      level1,
      level2,
      level3,
      level4,
      level5,
      level6,
      level7,
      level8,
    ];
    for (let i = 1; i <= 7; i++) {
      if (
        parseInt(scopedLevels[i]) == 0 ||
        isNaN(eval(scopedLevels[i])) ||
        isEmpty(eval(scopedLevels[i]).toString())
      )
        break;
      thisLevel = prevLevel * parseInt(scopedLevels[i]);
      total += thisLevel;
      prevLevel = thisLevel;
    }

    setTotalUsers(total);
  }, [level1, level2, level3, level4, level5, level6, level7, level8]);

  // var myloop = [];
  // for (let i = 1; i <= 8; i++) {
  //   myloop.push(<ReferredCard referred={i} />);
  // }

  return (
    <View>
      <Header backTitle={translate("general.chainSimulator")} />
      <ScrollView>
        <View style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={styles.outer}
            StickyHeaderComponent={[1]}
          >
            <Text style={styles.title}>
              {translate("chains.instructions")}
              <Text>{": "}</Text>
              <Text style={styles.instructions}>
                {translate("chains.instructionsInfo")}
              </Text>
            </Text>
            <View style={styles.topRows}>
              <Text style={styles.totalUsers}>
                {translate("chains.totalUsers")}
              </Text>
              <Text style={styles.smallTopText}>
                {`${LocaleFormatNumber(totalUsers, 0)}`}{" "}
                {translate("general.user")}/s
              </Text>
            </View>
            <ReferredCard
              disabled={true}
              referred="1"
              setLevel={setLevel1}
              setCurrentLevel={setCurrentLevel}
              levelValue={level1}
            />
            <ReferredCard
              referred="2"
              setLevel={setLevel2}
              setCurrentLevel={setCurrentLevel}
              levelValue={level2}
            />
            <ReferredCard
              referred="3"
              setLevel={setLevel3}
              setCurrentLevel={setCurrentLevel}
              levelValue={level3}
            />
            <ReferredCard
              referred="4"
              setLevel={setLevel4}
              setCurrentLevel={setCurrentLevel}
              levelValue={level4}
            />
            <ReferredCard
              referred="5"
              setLevel={setLevel5}
              setCurrentLevel={setCurrentLevel}
              levelValue={level5}
            />
            <ReferredCard
              referred="6"
              setLevel={setLevel6}
              setCurrentLevel={setCurrentLevel}
              levelValue={level6}
            />
            <ReferredCard
              referred="7"
              setLevel={setLevel7}
              setCurrentLevel={setCurrentLevel}
              levelValue={level7}
            />
            <ReferredCard
              referred="8"
              setLevel={setLevel8}
              setCurrentLevel={setCurrentLevel}
              levelValue={level8}
            />
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.floatingCTAButtonContainer}>
        <Button
          onPress={() => {
            ApiService.simulateChain([
              parseInt(level1),
              parseInt(level2),
              parseInt(level3),
              parseInt(level4),
              parseInt(level5),
              parseInt(level6),
              parseInt(level7),
              parseInt(level8),
            ]).then((response) => {
              if (response.data) {
                setMonthlyPrice(30 * parseFloat(response.data));
                setAnualPrice(30 * 12 * response.data);
                setIsVisibleModal(true);
              }
            });
          }}
          title={translate("chains.simulate")}
        />
      </View>
      <SimulationResultModal
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        anualPrize={anualPrize}
        monthlyPrize={monthlyPrize}
        totalUsers={totalUsers}
        onDismiss={() => {
          setIsVisibleModal(false);
        }}
      />
    </View>
  );
};

export default ChainSimulatorSreen;
