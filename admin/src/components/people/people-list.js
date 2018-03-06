import React, { Component } from 'react'
import {connect} from 'react-redux'
import {peopleListSelector, fetchAllPeople} from '../../ducks/people'
import {List} from 'react-virtualized'
import PersonCard from './person-card'

import 'react-virtualized/styles.css'

class PeopleList extends Component {
    componentDidMount() {
        this.props.fetchAllPeople()
    }

    render() {
        return <List
            rowRenderer={this.rowRenderer}
            rowCount={this.props.people.length}
            rowHeight={100}
            height={400}
            width={400}
        />

    }

    rowRenderer = ({ style, index, key }) => {
        const person = this.props.people[index]
        return (
            <div style={style} key={key}>
                <PersonCard person = {person}/>
            </div>
        )
    }
}

export default connect((state) => ({
    people: peopleListSelector(state)
}), { fetchAllPeople })(PeopleList)