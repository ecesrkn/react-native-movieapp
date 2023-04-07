import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"

type PlayButtonProps = {
    handlePress: () => void
}

export default function PlayButton({handlePress}: PlayButtonProps) {
    return (
        <Pressable
            onPress={handlePress}
            style={styles.button}>
            <Icon name="caret-forward-outline" size={30} color={"#e4e4e4"} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        alignContent: "center",
        borderRadius: 50,
        width: 50,
        padding: 10,
        backgroundColor: "#4481FC"
    }
})