import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { peopleSelector } from '../../ducks/people'

class PeopleList extends Component {
    static propTypes = {};

    render() {
        return <List
            width={600}
            height={400}
            rowCount={this.props.people.length}
            rowHeight={200}
            overscanRowCount={2}
            rowRenderer={this.rowRenderer}
        />
    }

    rowRenderer = ({index, style, key}) => {
        const person = this.props.people[index]

        return (
            <div style = {style} key={key}>
                <h2>{person.email}</h2>
                <h4>{person.firstName} {person.lastName}</h4>
            </div>
        )

    }
}

export default connect(state => ({
    people: peopleSelector(state)
}))(PeopleList)