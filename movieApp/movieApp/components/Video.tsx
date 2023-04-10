import { StyleSheet, View } from "react-native";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VideoPlayer from "react-native-video-controls"

type VideoProps = {
    onClose: () => void,

}

export default function Video({onClose}: VideoProps) {
    return(
        <VideoPlayer source={{
            uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }}
            onBack={onClose}
            onEnd = {onClose}
            fullscreenOrientation="all" />
    )
}


const styles = StyleSheet.create({

})