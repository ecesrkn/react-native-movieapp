import { StyleSheet, Text, View } from "react-native";

type ErrorProps = {
    message1: string,
    message2: string
}

export default function ErrorPage({ message1, message2 }: ErrorProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message1}</Text>
            <Text style={styles.text}>{message2}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontWeight: "bold"
    }
})