import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface Item {
  id: number;
  name: string;
}
interface ItemComponentProps {
  item: Item;
  onSelect: (item: Item) => void;
  isSelected: boolean;
}

const ItemComponent: React.FC<ItemComponentProps> = memo(
  ({ item, onSelect, isSelected }) => {
    return (
      <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
        {isSelected ? (
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={24}
            color="black"
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color="black"
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>{isSelected ? "Selected" : "Not selected"}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

export default ItemComponent;
