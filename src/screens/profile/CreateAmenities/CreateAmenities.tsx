import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, ScrollView, View, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, ButtonType, Chip, Icon, Text } from 'src/components';
import { ScreenTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { useAppDispatch } from 'src/store';
import { getAccommodation, getIsDarkMode } from 'src/store/selectors';
import { AsyncThunks } from 'src/store/thunks';
import { BUTTON_SIZES, GREY_500, WHITE, WHITE_100, WHITE_200 } from 'src/styles';
import { IconName } from 'src/types';
import { UpdateAmenitiesParams } from 'src/types/amenities';

import { styles } from './CreateAmenities.styles';
import {
  DEFAULT_AMENITIES_STATE,
  AMENITIES_CHIP_DATA,
  SelectedAmenities,
  AmenitiesErrorType,
  amenityFormValidation,
  ERROR_NONE,
} from './CreateAmenities.utils';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAmenities'>;

const CreateAmenities = ({ route, navigation }: Props) => {
  const { isNew, accomodationId } = route.params;
  const dispatch = useAppDispatch();
  const theme = useSelector(getIsDarkMode);

  const [amenityError, setAmenityError] = useState<AmenitiesErrorType>(ERROR_NONE);
  const [selectedAmenities, setSelectedAmenities] =
    useState<SelectedAmenities>(DEFAULT_AMENITIES_STATE);
  const [otherAmenities, setOtherAmenities] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const amenities: string[] = useMemo(() => Object.keys(selectedAmenities), [selectedAmenities]);
  const accommodation = useSelector(getAccommodation);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  const toggleAmenity = useCallback(
    (amenityKey: string) => {
      setSelectedAmenities((prevSelectedAmenities: SelectedAmenities) => ({
        ...prevSelectedAmenities,
        [amenityKey]: !prevSelectedAmenities[amenityKey],
      }));
    },
    [setSelectedAmenities]
  );

  const addOtherAmenities = () => {
    const trimmedValue = inputValue.trim();
    const error = amenityFormValidation(trimmedValue);
    setAmenityError(error);
    if (!amenityError.error) {
      setOtherAmenities((prevAmenity) => [...prevAmenity, inputValue]);
      scrollToBottom();
      setInputValue('');
    }
  };

  const removeAdditionalChip = useCallback((index: number) => {
    setOtherAmenities((prevOtherAmenities) => {
      const updatedOptions = [...prevOtherAmenities];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
  }, []);

  const additionalChips = useMemo(() => {
    return otherAmenities.map((item, index) => (
      <Chip
        key={index}
        iconName={IconName.Check}
        iconSet="ionicons"
        text={item}
        onTouch={() => removeAdditionalChip(index)}
        isToggled
      />
    ));
  }, [otherAmenities, removeAdditionalChip]);

  const onFormSubmit = async () => {
    const response = await dispatch(
      AsyncThunks.addAmenitiesThunk({
        accomodationId,
        data: {
          ...selectedAmenities,
          otherAmenities: otherAmenities.join(', '),
        },
      } as UpdateAmenitiesParams)
    );
    if (response.meta.requestStatus === 'fulfilled') {
      //Placeholder for navigation logic
    }
    if (!response.payload?.success) {
      scrollToBottom();
      setAmenityError({ error: true, message: 'Error adding amenities. Try again later' });
    }
  };

  const onFormSubmitUpdate = async () => {
    const response = await dispatch(
      AsyncThunks.updateAmenitiesThunk({
        accomodationId,
        data: {
          ...selectedAmenities,
          otherAmenities: otherAmenities.join(', '),
        },
      } as UpdateAmenitiesParams)
    );
    if (response.meta.requestStatus === 'fulfilled') {
      //Placeholder for navigation logic
    }
    if (!response.payload?.success) {
      scrollToBottom();
      setAmenityError({ error: true, message: 'Error adding amenities. Try again later' });
    }
  };

  const fetchAmenities = useCallback(async () => {
    if (!isNew && accommodation?.amenities) {
      const { otherAmenities, id, accommodationId, ...rest } = accommodation?.amenities;
      setSelectedAmenities(rest);
      setOtherAmenities(otherAmenities ? otherAmenities.split(', ') : []);
    }
  }, [isNew, accommodation?.amenities]);

  useEffect(() => {
    fetchAmenities();
  }, [fetchAmenities]);

  return (
    <View style={{ flex: 1 }}>
      <ScreenTemplate>
        <ScrollView ref={scrollViewRef} style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Tell your guests what your place has to offer</Text>
            <Text style={styles.subtitle}>
              You can add more amenities after you publish your listing
            </Text>
          </View>
          <View style={styles.rowContainer}>
            {amenities.map((amenity) => {
              return (
                <Chip
                  key={amenity}
                  iconName={AMENITIES_CHIP_DATA[amenity].icon}
                  iconSet={AMENITIES_CHIP_DATA[amenity].iconSet}
                  text={AMENITIES_CHIP_DATA[amenity].text}
                  onTouch={() => toggleAmenity(amenity)}
                  isToggled={selectedAmenities[amenity]}
                />
              );
            })}
            <View style={{ width: 160 }} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Add other amenities</Text>
            <Text style={styles.subtitle}>
              You can put here anything that can make you stand out even more
            </Text>
          </View>
          <View style={styles.rowContainer}>
            {additionalChips}
            {otherAmenities.length % 2 === 1 && <View style={{ width: 160 }} />}
          </View>
          {amenityError.error && (
            <View style={styles.errorBox}>
              <Icon name={IconName.Error} size={30} iconSet="material" color={WHITE} />
              <Text style={styles.errorText}>{amenityError.message}</Text>
            </View>
          )}
          <View style={[styles.inputField, { backgroundColor: theme ? GREY_500 : WHITE }]}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Icon name={IconName.Albums} size={24} />
              <TextInput
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                style={[styles.inputText, { color: theme ? WHITE_100 : GREY_500 }]}
                placeholderTextColor={theme ? WHITE_200 : GREY_500}
                placeholder="Other amenities"
              />
            </View>
            <TouchableOpacity onPress={() => addOtherAmenities()}>
              <Icon name={IconName.AddBlank} size={28} />
            </TouchableOpacity>
          </View>
          <View style={styles.emptySpace} />
        </ScrollView>
        <View style={styles.footer}>
          <Button
            title="Back"
            height={35}
            size={BUTTON_SIZES.SM}
            type={ButtonType.SECONDARY}
            onPress={() => {
              if (isNew) {
                onFormSubmit();
              } else {
                onFormSubmitUpdate();
              }
            }}
          />
          <Button
            title="Next"
            height={35}
            size={BUTTON_SIZES.SM}
            type={ButtonType.PRIMARY}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </ScreenTemplate>
    </View>
  );
};

export default CreateAmenities;
