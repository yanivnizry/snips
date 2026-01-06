import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import type {ExpandableDescriptionProps} from './types';
import {styles} from './styles';
import {useExpandableAnimation} from './useExpandableAnimation';

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
  description,
  maxLength = 100,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {animateToggle} = useExpandableAnimation();

  if (!description) {
    return null;
  }

  const shouldTruncate = description.length > maxLength;
  const displayText = isExpanded || !shouldTruncate ? description : `${description.slice(0, maxLength)}...`;

  const handleToggle = () => {
    animateToggle();
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
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

