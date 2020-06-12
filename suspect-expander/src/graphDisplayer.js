import React from 'react';

import Box from '@material-ui/core/Box';

import { Graph, Node } from 'react-d3-graph';

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

// graph payload (with minimalist structure)
const data = {
  nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
  links: [
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" },
  ],
};

const dat = {
  links: [
      {
          source: 1,
          target: 2,
          label: "link 1 and 2",
      },
      {
          source: 1,
          target: 3,
      },
      {
          source: 1,
          target: 4,
      },
      {
          source: 3,
          target: 4,
      },
  ],
  nodes: [
      {
          id: 1,
          name: "Node 1",
      },
      {
          id: 2,
          name: "Node 2",
      },
      {
          id: 3,
          name: "Node 3",
      },
      {
          id: 4,
          name: "Node 4",
      },
  ],
};

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
var myConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: "lightgreen",
    size: 120,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
  },
  height:800,
};

// graph event callbacks
const onClickGraph = function() {
  // window.alert(`Clicked the graph background`);
};

const onClickNode = function(nodeId) {
  // window.alert(`Clicked node ${nodeId}`);
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
  }

  componentDidMount() {
    // Graph resize by getting box height https://stackoverflow.com/questions/35153599/reactjs-get-height-of-an-element
    const height = this.sizeBox.clientHeight;
    const width = this.sizeBox.clientWidth;
    this.setState({  });
    // this.setState({ width });
    myConfig.height = height;
    myConfig.width = width;
    // Try reset position to center
    let checkExist = setInterval(async () => {
      this.graph.resetNodesPositions();
      this.graph._graphBindD3ToReactComponent();
      clearInterval(checkExist);
    }, 100);
  }

  // Init at approximately the middle
  decorateGraphNodesWithInitialPositioning = nodes => {
    return nodes.map(n =>
        Object.assign({}, n, {
            x: window.innerHeight / 2 - Math.floor(Math.random() * 100),
            y: window.innerHeight / 2 - Math.floor(Math.random() * 100),
        })
    );
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
            nodes: this.decorateGraphNodesWithInitialPositioning(dat.nodes),
            links: dat.links,
          }}
          config={this.state.config}
          onClickNode={onClickNode}
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