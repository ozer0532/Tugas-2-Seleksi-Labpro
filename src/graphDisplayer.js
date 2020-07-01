import React from 'react';

import Box from '@material-ui/core/Box';

import { Graph } from 'react-d3-graph';

// CSS like styling
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

// Graph configuration
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

// Container for the react-d3-graph component
// Has options for expanding on click and various config
// PROPS:
//     - data: Javascript Object containing a list of 'nodes' and a list of 'links'
//     - onClick: Callback function to run when a node is clicked
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

  // Runs the onClick property
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
        />
      </Box>
    )
  }
}

export default GraphDisplayer;