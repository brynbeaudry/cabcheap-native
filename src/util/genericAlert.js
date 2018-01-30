import { Alert } from 'react-native'

export default function (title, message) {
    // Works on both iOS and Android
    Alert.alert(
        title, message,
        [
            {text: 'OK', onPress: () => {}},
        ],
        { cancelable: false }
    )
}