import React from 'react';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import {styles} from './styles';
import {COLORS} from '@/constants/common';

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
          colors={[COLORS.WHITE_OPACITY_70, COLORS.WHITE_OPACITY_50]}
          locations={[0.042, 0.9897]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.rankGradient}
        />
      </MaskedView>
    </View>
  );
};

export default RankNumber;

