import React from 'react';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {styles} from './styles';

interface RankNumberProps {
  rank: number;
}

const RankNumber: React.FC<RankNumberProps> = ({rank}) => {
  return (
    <View style={styles.rankOverlay}>
    <MaskedView
      maskElement={<Text style={styles.rankText}>{rank}</Text>}
      style={styles.rankGradient}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.2)']}
            style={styles.rankGradient}
      />
    </MaskedView>
    </View>
  );
};

export default RankNumber;

