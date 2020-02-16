import React, { Component } from "react";
import ChartMaker from "../components/ChartMaker";
import { Container, Row, Col, Button } from "react-bootstrap";
import MediaBoard from "../components/MediaBoard";
import Charts from "../components/Charts";
import { connect } from "react-redux";
import styles from '../index.css';

class Indicators extends Component {
  render() {
  const writing = {
    color: '#5d5d5d',
    fontSize: '18px',
  };
  const headline = {
     color: "#444444",
     fontSize: '36px',
   };
    return (
      <Container>
        <Row>
        <h2 style={headline}>Indikátory Technických analýz:</h2>
        </Row>
        <Row>
        <h2 style={headline}>SMA</h2>
        <p style={writing}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nunc tincidunt ante vitae massa. Maecenas libero. Aliquam ornare wisi eu metus. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Phasellus faucibus molestie nisl. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Mauris dictum facilisis augue.</p>

        </Row>
        <Row>
        <h2 style={headline}>EMA</h2>
        <p style={writing}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nunc tincidunt ante vitae massa. Maecenas libero. Aliquam ornare wisi eu metus. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Phasellus faucibus molestie nisl. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Mauris dictum facilisis augue.</p>

        </Row>
        <Row>
        <h2 style={headline}>TMA</h2>
        <p style={writing}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nunc tincidunt ante vitae massa. Maecenas libero. Aliquam ornare wisi eu metus. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Phasellus faucibus molestie nisl. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Mauris dictum facilisis augue.</p>

        </Row>
        <Row>
        <h2 style={headline}>WMA</h2>
        <p style={writing}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nunc tincidunt ante vitae massa. Maecenas libero. Aliquam ornare wisi eu metus. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Phasellus faucibus molestie nisl. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Mauris dictum facilisis augue.</p>

        </Row>
        <Row>
        <h2 style={headline}>BOB</h2>
        <p style={writing}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nunc tincidunt ante vitae massa. Maecenas libero. Aliquam ornare wisi eu metus. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Nullam sapien sem, ornare ac, nonummy non, lobortis a enim. Phasellus faucibus molestie nisl. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Mauris dictum facilisis augue.</p>
        </Row>

      </Container>
    );
  }
}

export default connect(
)(Indicators);
