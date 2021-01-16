import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function Title(props) {
    const { headerText, description } = props;
  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>{headerText}</Text>
        <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingTop: 30
    },
    headerText: {
        fontSize: 22,
        fontWeight: '700'
    },
    description: {
        fontWeight: '300',
        color: '#414141'
    }
});

export default Title;