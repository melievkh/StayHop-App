import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PlacesInput, Text, showToast } from 'src/components';
import { StepperTemplate } from 'src/components/templates';
import { RootStackParamList } from 'src/navigation';
import { AddressValues } from 'src/types';
import { getAddressInfo, getPlaceDetails } from 'src/utils';

import { styles } from './AccommodationAddress.style';
import { INITIAL_COORDINATES } from './AccommodationAddress.utils';
import AccommodationAddressForm from './AccommodationAddressForm';

type Props = NativeStackScreenProps<RootStackParamList, 'AccommodationAddress'>;

const AccommodationAddress = ({ navigation }: Props) => {
  const mapViewRef = useRef<MapView>(null);
  const { t } = useTranslation();
  const [addressSelected, setAddressSelected] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | undefined>(
    INITIAL_COORDINATES
  );
  const [addressValues, setAddressValues] = useState<AddressValues>({
    country: '',
    city: '',
    street: '',
    zipCode: '',
    latitude: null,
    longitude: null,
  });

  const handleInputChange = useCallback((fieldName: keyof AddressValues, text: string) => {
    setAddressValues((prevValues) => ({ ...prevValues, [fieldName]: text }));
  }, []);

  const handleSearch = useCallback(
    async (data: GooglePlaceData, details: GooglePlaceDetail | null) => {
      if (details) {
        const placeDetails = await getPlaceDetails(details.place_id);

        if (!placeDetails) {
          showToast({ type: 'error', text1: 'Error occured!', text2: 'Please try again' });
          return;
        }

        const { city, country, latitude, longitude } = getAddressInfo(placeDetails);
        setSelectedCoordinates({ latitude, longitude });
        setAddressValues({ ...addressValues, city, country, longitude, latitude });
        setAddressSelected(true);
      }
    },
    [addressValues]
  );

  const handleNext = useCallback(async () => {
    const accommodation = { address: addressValues };

    navigation.navigate('AccommodationInfos', { accommodation });
  }, [navigation, addressValues]);

  useEffect(() => {
    if (selectedCoordinates) {
      mapViewRef.current?.animateToRegion(
        {
          latitude: selectedCoordinates.latitude,
          longitude: selectedCoordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    }
  }, [selectedCoordinates]);

  const isNextButtonDisabled = Object.values(addressValues).some((value) => value === '' || null);

  return (
    <StepperTemplate
      onNext={handleNext}
      disableNextButton={!addressSelected || isNextButtonDisabled}
      displayPrevButton={false}
    >
      <View style={styles.placesInputContainer}>
        {!addressSelected && (
          <View>
            <Text style={styles.title}>{t('Where is your house located?')}</Text>
            <Text style={styles.subtitle}>
              {t("Your address is only shared with guests after they've made a reservation")}
            </Text>
          </View>
        )}

        <PlacesInput onSearch={handleSearch} />
      </View>

      {addressSelected && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <MapView
            ref={mapViewRef}
            style={styles.mapContainer}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: selectedCoordinates?.latitude || INITIAL_COORDINATES.latitude,
              longitude: selectedCoordinates?.longitude || INITIAL_COORDINATES.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {selectedCoordinates && <Marker coordinate={selectedCoordinates} title="here" />}
          </MapView>

          <AccommodationAddressForm
            addressValues={addressValues}
            onInputChange={handleInputChange}
          />
        </ScrollView>
      )}
    </StepperTemplate>
  );
};

export default AccommodationAddress;
