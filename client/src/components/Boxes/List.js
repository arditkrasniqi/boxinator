import React, {Component} from 'react';
import {connect} from 'react-redux';
import './boxes.css';
import {setBoxes, setTotalShppingCost, setTotalWeight} from '../../actions/boxes';
import Service from '../../service/index';
import {Table, Row, Col} from 'react-bootstrap';
import {Link} from "react-router-dom";

class List extends Component {
    componentDidMount() {
        Service.getBoxes()
            .then(res => {
                this.props.setBoxes(res.data.boxes);
                this.props.setTotalWeight(res.data.totalWeight);
                this.props.setTotalShppingCost(res.data.totalShippingCost.toFixed(2));
        })
    }

    render() {
        return (
            <div className="App">
                <Row>
                    <Col lg={6} md={12}>
                        <h1 className="text-left">Boxes</h1>
                    </Col>
                    <Col lg={6} md={12} className={'text-right'}>
                        <Link to={'/addbox'} className={'btn btn-primary add-box'}>Add Box</Link>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Receiver</th>
                        <th>Weight</th>
                        <th>Box color</th>
                        <th>Shipping cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.boxes.map(box => {
                            return <tr key={box.id}>
                                <td>{box.name}</td>
                                <td>{box.weight} kilograms</td>
                                <td style={{background: box.color}}></td>
                                <td>{box.shipping_cost}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
                <Row>
                    <Col xs={12} className={'text-right'}>
                        <p>Total Weight: {this.props.totalWeight}</p>
                    </Col>
                    <Col xs={12} className={'text-right'}>
                        <p>Total Shipping Cost: {this.props.totalShippingCost}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        boxes: state.data.boxes,
        totalWeight: state.data.totalWeight,
        totalShippingCost: state.data.totalShippingCost
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setBoxes: (boxes) => {
            dispatch(setBoxes(boxes));
        },
        setTotalWeight: (weight) => {
            dispatch(setTotalWeight(weight))
        },
        setTotalShppingCost: (cost) => {
            dispatch(setTotalShppingCost(cost))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(List);