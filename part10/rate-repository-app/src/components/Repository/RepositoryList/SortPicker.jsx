import { useState } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  pickerText: {
    color: theme.colors.textPrimary,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 2,
    overflow: 'hidden',
  },
  optionItem: {
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  headerText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
});

const SORT_OPTIONS = [
  { label: 'Latest repositories', value: 'latest' },
  { label: 'Highest rated repositories', value: 'highestRated' },
  { label: 'Lowest rated repositories', value: 'lowestRated' },
];

const SortPicker = ({ sortOption, onSortChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = SORT_OPTIONS.find((o) => o.value === sortOption);

  const handleSelect = (value) => {
    onSortChange(value);
    setModalVisible(false);
  };

  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerText}>
          {selectedOption ? selectedOption.label : 'Select an item...'}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      </Pressable>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.optionItem}>
              <Text style={styles.headerText}>Select an item...</Text>
            </View>
            <FlatList
              data={SORT_OPTIONS}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    item.value === sortOption
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default SortPicker;
