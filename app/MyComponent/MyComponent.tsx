import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ItemComponent from "./components/ItemComponent";

interface Item {
  id: number;
  name: string;
}

interface MyComponentProps {
  data: Item[];
}

const MyComponent: React.FC<MyComponentProps> = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [dataSource, setDataSource] = useState<Item[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setDataSource(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const handleSelect = useCallback((item: Item) => {
    setSelectedItems((currentSelectedItems) =>
      currentSelectedItems.some((i) => i.id === item.id)
        ? currentSelectedItems.filter((i) => i.id !== item.id)
        : [...currentSelectedItems, item]
    );
  }, []);

  const handleClear = useCallback(() => {
    inputRef.current?.clear();
    setSearchTerm("");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          ref={inputRef}
          onChangeText={setSearchTerm}
          value={searchTerm}
          placeholder="Search..."
          style={styles.input}
          accessibilityLabel="Search input"
        />
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataSource}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemComponent
            item={item}
            onSelect={handleSelect}
            isSelected={selectedItems.includes(item)}
          />
        )}
      />
      {dataSource.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No items found
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  clearButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "grey",
    borderRadius: 5,
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MyComponent;
