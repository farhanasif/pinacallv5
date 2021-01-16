import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../assets/utils/colors';

export default function QueryScreen({navigation}) {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{paddingRight: 20}}
          onPress={() => console.log('here')}
        >
          <FontAwesome name="bars" size={23} color={COLORS.pinacall_pink} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Query Screen</Text>
    </View>
  );
}