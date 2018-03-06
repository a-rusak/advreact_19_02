import React, { Component } from 'react'
import { connect } from 'react-redux'
import { InfiniteLoader, Table, Column } from 'react-virtualized'
import {
  fetchEvents,
  selectEvent,
  eventListSelector,
  loadedSelector,
} from '../../ducks/events'
// import Loader from '../common/Loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchEvents(0)
}

  isRowLoaded = ({ index }) => !!this.props.events[index]

  loadMoreRows = ({ startIndex, stopIndex }) => {
      this.props.fetchEvents(startIndex)
  }

  onRowClick = ({ rowData: { uid } }) => {
    this.props.selectEvent(uid)
  }

  render() {
    const { events } = this.props
    // if (loading) return <Loader />
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={events.length + 10}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            width={600}
            height={500}
            rowCount={events.length}
            rowGetter={this.rowGetter}
            rowClassName="test-virtualized-table-row"
            rowHeight={50}
            headerHeight={100}
            overscanRowCount={0}
            onRowsRendered={onRowsRendered}
            onRowClick = {this.onRowClick}
          >
            <Column dataKey="title" label="Event Name" width={400} />
            <Column dataKey="when" label="Month" width={300} />
            <Column dataKey="where" label="Place" width={300} />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  rowGetter = ({ index }) => this.props.events[index]
}

export default connect(
  state => ({
    events: eventListSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchEvents, selectEvent }
)(EventsTableVirtualized)
