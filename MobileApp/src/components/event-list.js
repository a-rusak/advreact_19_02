import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, SectionList } from 'react-native'
import Card from './common/card'

class EventList extends Component {
  static propTypes = {}

  render() {
    return (
      <SectionList
        renderSectionHeader={({ section }) => (
          <View key={section.title} style={styles.header}>
            <View><Text style={styles.title}>{section.title}</Text></View>
            <View style={styles.numWrapper}><Text>{section.num}</Text></View>
          </View>
        )}
        renderItem={({ item }) => (
          <Text key={item.uid} style={styles.item}>
            {item.title}
          </Text>
        )}
        sections={this.props.events}
      />
    )
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    padding: 10,
    backgroundColor: `#ccc`,
    flex: 1,
    // justifyContent: `space-between`
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: `#ccc`
  },
  title: {
    fontWeight: `bold`,
  },
  numWrapper: {
    marginLeft: `auto`,
    marginTop: -20,
    fontWeight: `normal`,
    backgroundColor: `#fff`,
    padding: 5,
    borderRadius: 10,
    minWidth: 30,
    textAligm: `center`
  }
})

export default EventList
