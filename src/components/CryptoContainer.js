import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import CoinCard from './CoinCard';
import FetchCoinData from '../Actions/FetchCoinData';

class CryptoContainer extends React.Component {

  componentWillMount() {
    this.props.FetchCoinData();
  }

  renderCoinCards() {
    const {crypto} = this.props;
    return crypto.data.map((coin, index) => {
      return (<CoinCard
        key={index}
        coin_name={coin.name}
        symbol={coin.symbol}
        price_usd={coin.price_usd}
        percent_change_24h={coin.percent_change_24h}
        percent_change_7d={coin.percent_change_7d}
      />)
    })
  }

  render() {
    const { crypto } = this.props;
    const { contentContainer } = styles;

    if (crypto.isFetching) {
      return (
        <View>
          <Spinner
            visible={crypto.isFetching}
            textContent={"Loading..."}
            textStyle={{color: '#253145'}}
            animation="fade"
          />
        </View>
      )
    }
    return (
      <ScrollView contentContainerStyle={contentContainer}>
        { crypto.data && this.renderCoinCards() }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
    paddingTop: 55,
  }
});

function mapStateToProps(state) {
  return {
    crypto: state.crypto
  }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer);
