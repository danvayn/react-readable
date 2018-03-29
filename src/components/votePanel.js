import React, { Component } from 'react'
import { Panel } from 'react-bootstrap';
import PropTypes from 'prop-types'

import UpIcon from 'react-icons/lib/fa/arrow-up'
import DownIcon from 'react-icons/lib/fa/arrow-down'

class votePanel extends Component {
//   constructor(props) {
//     super(props)
//
//     console.log(this.props);
// }
  static propTypes = {
    voteScore: PropTypes.number.isRequired,
    voteUp: PropTypes.func.isRequired,
    voteDown: PropTypes.func.isRequired,
    voteID: PropTypes.string.isRequired
  }

  render() {
    const { voteScore, voteID } = this.props;
    const voteStatus = "none";
    const divStyle = {
      margin: '40px',
      border: '5px solid pink'
    };
    const panelStyle = {
      textAlign: 'center',
      maxWidth: '50px',
      marginLeft: '-25px',
      marginBottom: '0px',
      boxSizing: 'content-box',
      display: 'inline-block'}

    return(
      <Panel style={panelStyle} className={"vote-panel voted-" + voteStatus}>
        <Panel.Heading style={{padding: '0'}}>
          <UpIcon onClick={() => this.props.voteUp(voteID)}/>
        </Panel.Heading>
        <Panel.Body style={{padding: '5px'}}>
        <span className={"score score-"+ voteStatus}>{voteScore}</span>
        </Panel.Body>
        <Panel.Footer style={{padding: '0'}}>
        <DownIcon onClick={() => this.props.voteDown(voteID)}/>
        </Panel.Footer>
      </Panel>
    )
  }
};



export default votePanel;
