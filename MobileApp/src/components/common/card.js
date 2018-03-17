import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'

class Card extends Component {
    static propTypes = {

    };

    render() {
        return (
            <View style = {styles.container}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: '#ddd',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 2,
            height: 2
        }
    }
})

export default Card