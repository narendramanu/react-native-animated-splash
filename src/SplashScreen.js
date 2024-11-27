// src/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

const SplashScreen = ({ 
    title = "Welcome", 
    logo, 
    animation = "fade", 
    duration = 1500, 
    onAnimationEnd = () => {} 
}) => {
    const animationValue = new Animated.Value(0);

    useEffect(() => {
        let animationConfig;

        switch (animation) {
            case "zoom":
                animationConfig = Animated.spring(animationValue, {
                    toValue: 1,
                    useNativeDriver: true,
                });
                break;
            case "slide":
                animationConfig = Animated.timing(animationValue, {
                    toValue: 1,
                    duration,
                    useNativeDriver: true,
                });
                break;
            case "fade":
            default:
                animationConfig = Animated.timing(animationValue, {
                    toValue: 1,
                    duration,
                    useNativeDriver: true,
                });
        }

        animationConfig.start(() => {
            setTimeout(onAnimationEnd, 500); // Let the splash stay for a bit
        });
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={logo}
                style={[
                    styles.logo,
                    animation === "zoom" && { transform: [{ scale: animationValue }] },
                    animation === "fade" && { opacity: animationValue },
                ]}
            />
            <Animated.Text
                style={[
                    styles.title,
                    animation === "slide" && { transform: [{ translateY: animationValue.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] },
                    animation === "fade" && { opacity: animationValue },
                ]}
            >
                {title}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default SplashScreen;
