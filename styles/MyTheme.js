import { MD3LightTheme } from "react-native-paper";

export const MyTheme = {
    ...MD3LightTheme,
    roundness: 2,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#2e78ce',
        surfaceVariant: '#9bc7b880',
        onSurface: 'black',
        onSecondaryContainer: '#2e78ce',
        secondaryContainer: '#9bc7b8',
    }
};