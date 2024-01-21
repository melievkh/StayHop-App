import { StyleSheet } from 'react-native';
import { paragraph2 } from 'src/styles';
import { HORIZONTAL_16_PERCENT } from 'src/utils';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: HORIZONTAL_16_PERCENT,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  rightContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  label: {
    ...paragraph2,
  },
  leftIconContainer: {
    width: '10%',
    alignItems: 'flex-end',
  },
});

export default styles;
