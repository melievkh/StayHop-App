import { NavigationProp, Route, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Text from 'src/components/Text/Text';
import { StepperTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { getColors } from 'src/store/selectors';

import { styles } from './AccommodationInfos.style';
import CounterButton from './AccommodationInfos.utils';

type Props = {
  route: Route<'AccommodationInfos', { accommodation: any }>;
};

const AccommodationInfos = ({ route }: Props) => {
  const colors = useSelector(getColors);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [formValues, setFormValues] = useState({
    allowedNumberOfPeople: 1,
    numberOfRooms: 1,
  });

  const handleRoomsChange = (increment: number) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      numberOfRooms: Math.max(1, prevFormValues.numberOfRooms + increment),
    }));
  };

  const handlePeopleChange = (increment: number) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      allowedNumberOfPeople: Math.max(1, prevFormValues.allowedNumberOfPeople + increment),
    }));
  };

  const handleNext = useCallback(() => {
    const accommodation = { ...route.params.accommodation, ...formValues };

    navigation.navigate('AccommodationPriceAndArea', { accommodation });
  }, [navigation, formValues, route.params.accommodation]);

  return (
    <StepperTemplate onNext={handleNext}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Share Some Basics About Your Place</Text>
        <Text style={styles.subtitle}>You will add more details later</Text>
      </View>

      <View style={[styles.counterContainer, { borderBottomColor: colors.border }]}>
        <Text style={styles.counterTitle}>Rooms</Text>
        <View style={styles.counterButtonContainer}>
          <CounterButton onPress={() => handleRoomsChange(-1)}>-</CounterButton>
          <Text>{formValues.numberOfRooms}</Text>
          <CounterButton
            onPress={() => handleRoomsChange(1)}
            disabled={formValues.numberOfRooms === 50}
          >
            +
          </CounterButton>
        </View>
      </View>

      <View style={[styles.counterContainer, { borderBottomColor: colors.border }]}>
        <Text style={styles.counterTitle}>Guests</Text>
        <View style={styles.counterButtonContainer}>
          <CounterButton onPress={() => handlePeopleChange(-1)}>-</CounterButton>
          <Text>{formValues.allowedNumberOfPeople}</Text>
          <CounterButton
            onPress={() => handlePeopleChange(1)}
            disabled={formValues.allowedNumberOfPeople === 50}
          >
            +
          </CounterButton>
        </View>
      </View>
    </StepperTemplate>
  );
};

export default AccommodationInfos;
