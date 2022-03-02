import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from '@rainbow-me/animated-charts';
export const {width: SIZE} = Dimensions.get('window');

const Chart = ({
  currentPrice,
  logoUrl,
  name,
  priceChangePercentage7d,
  sparkline,
  symbol,
}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : '#FF3830';

  const formatUSD = value => {
    'worklet';
    if (value === '') {
      return `$${currentPrice.toLocaleString('en-US', {currency: 'USD'})}`;
    }
    return `${value.toLocaleString('en-US', {
      currency: 'USD',
    })}`;
  };

  return (
    <ChartPathProvider data={{points: sparkline, smoothingStrategy: 'bezier'}}>
      <View style={styles.chartWrapper}>
        <View style={styles.titleWrapper}>
          <View styles={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image source={{uri: logoUrl}} style={styles.image} />
              <Text style={styles.subTitle}>
                {name} ({symbol.toUpperCase()})
              </Text>
              <Text style={[styles.subTitle, {}]}>7d</Text>
            </View>
          </View>

          <View style={styles.lowerTitles}>
            <ChartYLabel
              format={formatUSD}
              style={styles.boldTitle}></ChartYLabel>
            {/* { <Text style={styles.boldTitle}>
              ${currentPrice.toLocaleString('en-US', {currency: 'USD'})}
            </Text>} */}
            <Text style={[styles.title, {color: priceChangeColor}]}>
              {priceChangePercentage7d.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View>
          <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
          <ChartDot size={25} style={{backgroundColor: 'black'}} />
        </View>
      </View>
    </ChartPathProvider>
  );
};

export default Chart;

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16,
  },
  titleWrapper: {
    marginHorizontal: 16,
  },
  upperTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperLeftTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subTitle: {
    fontSize: 14,
    color: '#A9ABB1',
  },

  lowerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldTitle: {fontSize: 24, fontWeight: 'bold'},
  title: {
    fontSize: 18,
  },
  lineWrapper: {
    marginTop: 40,
  },
});
