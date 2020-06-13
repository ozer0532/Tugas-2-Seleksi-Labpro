import React from 'react';

import Box from '@material-ui/core/Box';

import { Graph } from 'react-d3-graph';

// TODO: Make graph responsive to screen size

const styles = {
  container: {
    height: "100%",
    overflow: "hidden",
  },
  graph: {
    height: "100%",
    width: "100%",
  }
}

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
var myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue",
    labelProperty: "name",
  },
  link: {
    highlightColor: "lightblue",
  },
  height:800,
  directed: true,
};

// graph event callbacks
const onClickGraph = function() {
  // window.alert(`Clicked the graph background`);
};

const onDoubleClickNode = function(nodeId) {
  // window.alert(`Double clicked node ${nodeId}`);
};

const onRightClickNode = function(event, nodeId) {
  // window.alert(`Right clicked node ${nodeId}`);
};

const onMouseOverNode = function(nodeId) {
  // window.alert(`Mouse over node ${nodeId}`);
};

const onMouseOutNode = function(nodeId) {
  // window.alert(`Mouse out node ${nodeId}`);
};

const onClickLink = function(source, target) {
  // window.alert(`Clicked link between ${source} and ${target}`);
};

const onRightClickLink = function(event, source, target) {
  // window.alert(`Right clicked link between ${source} and ${target}`);
};

const onMouseOverLink = function(source, target) {
  // window.alert(`Mouse over in link between ${source} and ${target}`);
};

const onMouseOutLink = function(source, target) {
  // window.alert(`Mouse out link between ${source} and ${target}`);
};

const onNodePositionChange = function(nodeId, x, y) {
  // window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
};

class GraphDisplayer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      config: myConfig,
    }

    this.onClickNode = this.onClickNode.bind(this);
  }

  componentDidMount() {
    // Graph resize by getting box height https://stackoverflow.com/questions/35153599/reactjs-get-height-of-an-element
    const height = this.sizeBox.clientHeight;
    const width = this.sizeBox.clientWidth;
    myConfig.height = height;
    myConfig.width = width;
    this.setState({  });
  }

  // Init at approximately the middle https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.jsx
  decorateGraphNodesWithInitialPositioning = nodes => {
    return nodes.map(n =>
        Object.assign({}, n, {
            x: n.x || window.innerHeight / 2 - Math.floor(Math.random() * 100),
            y: n.y || window.innerHeight / 2 - Math.floor(Math.random() * 100),
        })
    );
  };

  onClickNode (nodeId) {
    if (typeof this.props.onClick === "function") {
      console.log("yes");
      this.props.onClick(nodeId);
    }
  };

  render() {
    return (
      <Box 
        ref = {(elmt => {this.sizeBox = elmt})} 
        style = { styles.container }
      >
        <Graph 
          style={styles.graph}
          ref = {(elmt => {this.graph = elmt})} 
          id="graph" // id is mandatory, if no id is defined rd3g will throw an error
          data={{
            nodes: this.decorateGraphNodesWithInitialPositioning(this.props.data.nodes),
            links: this.props.data.links,
          }}
          // data = { this.props.data }
          config={this.state.config}
          onClickNode={this.onClickNode}
          onDoubleClickNode={onDoubleClickNode}
          onRightClickNode={onRightClickNode}
          onClickGraph={onClickGraph}
          onClickLink={onClickLink}
          onRightClickLink={onRightClickLink}
          onMouseOverNode={onMouseOverNode}
          onMouseOutNode={onMouseOutNode}
          onMouseOverLink={onMouseOverLink}
          onMouseOutLink={onMouseOutLink}
          onNodePositionChange={onNodePositionChange}
        />
      </Box>
    )
  }
}

export default GraphDisplayer;