import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
// import * as ROLES from '../../constants/roles';
import { restrictedPageText } from '../Common/text';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import './admin.scss';

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false,
      })
    })
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }


  render() {
    const { users, loading } = this.state;

    return (
      <Container fluid className="page-content">
        <header>
          <h3 className="page-title">Admin Page</h3>
          <p>{restrictedPageText}</p>
        </header>
        <body>
          {loading && (
            <Spinner animation="grow" variant="primary" />
          )}
          {users ? <UserList users={users} /> : (
            <div className="no-data">nothing to see here</div>
          ) }
        </body>
        
      </Container>
    )
  }
}


const UserList = ({ users }) => (
  <Container className="section">
    <h5 className="section-title">Users</h5>
    <ListGroup className="list">
      {users.map(user => (
        <ListGroup.Item key={user.uid} className="item">
          <div className="field">
            <span className="label">Name:</span>
            <span className="info">{user.username}</span>
          </div>
          <div className="field">
            <span className="label">Email:</span>
            <span className="info">{user.email}</span>
          </div>
          

        </ListGroup.Item>
      ))}
    </ListGroup>
  </Container>
);

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(AdminPage);
