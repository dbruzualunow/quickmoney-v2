import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, ScrollView, View } from "react-native";
import Header from "../../Components/CustomUI/Header";
import PlayerRankingCard from "../../Components/Ranking/PlayerRankingCard";
import translate from "../../I18n";
import ApiService from "../../Services/ApiService";

const TopRankingScreeen = ({ route }) => {
  const { type } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setIsLoadingMore] = useState(false)
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const getData = async (page) => {
    let response;
    try {
      if (type === "topPlayers") {
        response = await ApiService.getAllTopPlayers(page);
      }
      if (type === "topChains") {
        response = await ApiService.getAllTopChains(page);
      }
      setData((data) => data?.concat(response?.data?.data || []));
      setLastPage(response?.data?.meta?.pagination?.pageCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      (async() => {
        try {
          await getData(page);
        } catch (e) {
          Alert.alert('Error')
        }finally{
          setIsLoading(false)
        }
      })()
  }, []);

  useEffect(() => {
    if (page > 1) {
      (async() => {
        try {
          setIsLoadingMore(true);
          await getData(page);
        } catch (e) {
          Alert.alert('Error')
        }finally{
          setIsLoadingMore(false)
        }
      })()
    }
  }, [page]);

  return (
    <View>
      <Header backTitle={translate("general.ranking")} />

      {isLoading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
            minHeight: 500,
            height: "100%",
            zIndex: 9999,
          }}
        >
          <ActivityIndicator size="large" color="#517664" />
        </View>
      )}
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={data}
        renderItem={({ item, index }) => (
          <PlayerRankingCard ranking={index + 1} {...item} />
        )}
        onEndReached={() => {
          if (page < lastPage) {
            setPage(page + 1);
          }
        }}
        onEndReachedThreshold={0.01}
        ListFooterComponent={loadingMore && 
            <ActivityIndicator size="large" color="#517664" />
          }
        keyExtractor={(item) => item.id}
      />

      {/* <View style={{ paddingBottom: 100 }}>
                    {topRanking.map((topPlayer, index) =>
                        (<PlayerRankingCard key={index} ranking={index + 1} {...topPlayer} />)
                    )}
                </View> */}
    </View>
  );
};

export default TopRankingScreeen;
