import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";


class TableList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      data: null,
      id_breed: null,
      id: null,
      tree: null,
      name_thai: "",
      name_eng: "",
      weight: null,
      price: null,
      show_detail: null
    }
    this.dataJ = {}
    this.getApi().then(data => {
      // this.dataJ = data[0].name_thai
      // console.log(this.dataJ)
    })}

  componentDidMount() {
    // const apiUrl = 'http://localhost:3100/tree';
    // fetch(apiUrl)
    //   .then((response) => response.json())
    //   .then((data) => console.log('This is your data', data));
    this.getApi().then(data=>{
      // console.log(data)
      this.setState({ response: data })
    })
  }

  getApi = ()=> {
    const myPromise = new Promise((resolve, reject) => {
      fetch('http://localhost:3100/tree')
      .then(response => response.json())
      .then(data => {
        const dataTable = data.map(( key, index ) => {
          return (
            <tr key={index}>
              <td>{key.id}</td>
              <td>{key.id_breed}</td>
              <td>{key.tree}</td>
              <td>{key.name_thai}</td>
              <td>{key.name_eng}</td>
              <td>{key.weight}</td>
              <td>{key.price}</td>
              <td>
              <button type="button" class="btn btn-danger">details</button>
              {/* <div>
                <button type="button" onClick={() => this.getDetail(key.id)}>ดูรายละเอียด</button>
              </div> */}
              </td>
            </tr>
          );
        })
        resolve(dataTable)
      });
    });
    return myPromise
  }

  render() {
    const { response } = this.state
    if (response === null) { return null }
    return (
      <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header style={{textAlign: "center"}}>
              <Card.Title as="h2">ตารางข้อมูลต้นไม้</Card.Title>
              <p className="card-category">
                Here is a subtitle for this table
              </p>
            </Card.Header>
            <Card.Header>
              <Card.Title>
              </Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">id</th>
                    <th className="border-0">id_breed</th>
                    <th className="border-0">tree</th>
                    <th className="border-0">name_thai</th>
                    <th className="border-0">name_eng</th>
                    <th className="border-0">weight</th>
                    <th className="border-0">price</th>
                    <th className="border-0">details</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.response}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    );
  }
}
export default TableList;