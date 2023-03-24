import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native"
import Header from "../../Components/CustomUI/Header"
import PlayerRankingCard from "../../Components/Ranking/PlayerRankingCard"
import translate from "../../I18n"
import ApiService from "../../Services/ApiService"

const TopRankingScreeen = ({ route }) => {

    const { type } = route.params;
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    const getData = async(page) => {
        let response
        try {
            if (type === 'topPlayers') {
                response = await ApiService.getAllTopPlayers(page)
            }
            if (type === 'topChains') {
                response = await ApiService.getAllTopChains(page)
            }
            setIsLoading(false)
            setData(data?.concat(response?.data?.data || []))
            setLastPage(response?.data?.meta?.pagination?.pageCount)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        setIsLoading(true)
        getData(page)
    }, [page])

    return (
        <View>
            <Header backTitle={translate('general.ranking')} />

            {isLoading && 
                <View style={{position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2', minHeight: 500, height: "100%", zIndex: 9999}}>
                    <ActivityIndicator size='large' color="#517664" />
                </View>
            }
            <FlatList 
                contentContainerStyle={{paddingBottom: 100}}
                data={data}
                renderItem={({item, index}) => <PlayerRankingCard key={index} ranking={index + 1} {...item} />}
                onEndReached={() => {
                    if (page < lastPage) {
                        setPage(page + 1)
                    }
                }}
                onEndReachedThreshold={0.4}
                keyExtractor={item => item.id}
            />


                {/* <View style={{ paddingBottom: 100 }}>
                    {topRanking.map((topPlayer, index) =>
                        (<PlayerRankingCard key={index} ranking={index + 1} {...topPlayer} />)
                    )}
                </View> */}
        </View>
    )
}

export default TopRankingScreeen