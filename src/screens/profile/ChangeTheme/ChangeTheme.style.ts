import { StyleSheet } from 'react-native';
import { LEVEL_1 } from 'src/styles';

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    ...LEVEL_1,
  },
  radioInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
  },
});
