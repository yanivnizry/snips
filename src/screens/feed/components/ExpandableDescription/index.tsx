import React, {useState, useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type {ExpandableDescriptionProps} from './types';
import {styles} from './styles';
import {useExpandableAnimation} from './useExpandableAnimation';

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
  description,
  maxLength = 100,
  onExpandedChange,
  titleHeight = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {animateToggle} = useExpandableAnimation();

  const overlayStyle = useMemo(() => {
    if (!titleHeight) {
      return styles.overlay;
    }
    return [
      styles.overlay,
      styles.overlayWithHeight,
      { height: titleHeight, bottom: -titleHeight },
    ];
  }, [titleHeight]);

  if (!description) {
    return null;
  }

  const shouldTruncate = description.length > maxLength;
  const displayText = isExpanded || !shouldTruncate ? description : `${description.slice(0, maxLength)}...`;

  const handleToggle = () => {
    animateToggle();
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    if (onExpandedChange) {
      onExpandedChange(newExpandedState);
    }
  };

  return (
    <View style={styles.container}>
      {isExpanded && shouldTruncate && (
        <LinearGradient
          colors={['#010101B2', '#01010100']}
          locations={[0.6, 1]}
          style={[overlayStyle, { height: titleHeight + 300 }]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
      )}
      <Text style={styles.description}>{displayText}</Text>
      {shouldTruncate && (
        <TouchableOpacity onPress={handleToggle} style={styles.toggleButton}>
          <Text style={styles.toggleText}>{isExpanded ? 'Less' : 'More'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(ExpandableDescription);

