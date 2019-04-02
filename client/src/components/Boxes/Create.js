import React, {Component} from 'react';
import './boxes.css';
import {connect} from 'react-redux';
import {setCountries} from '../../actions/countries';
import {Row, Col, Button} from 'react-bootstrap';
import Service from "../../service";
import {Link} from "react-router-dom";

class List extends Component {
    constructor() {
        super();
        this.state = {
            name: null,
            weight: null,
            color: null,
            destination: null,
            error: [],
            msg: null
        }
    }

    componentDidMount() {
        Service.getCountries()
            .then(res => {
                if(this.props.countries.length <= 0){
                    this.props.setCountries(res.data.data);
                }
            })
    }

    handleChange = (event) => {
        let obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj)
    }

    addBox = () => {
        Service.addBox(this.state).then(res => {
            if(res.data.errors){
                let errorHTML = [];
                for(let item in res.data.errors){
                    errorHTML.push(res.data.errors[item][0]);
                }
                this.setState({error: errorHTML})
            }else{
                this.setState({msg: res.data.message, error: []})
            }
        })
    }

    render() {
        const errors = this.state.error;
        return (
            <div className="create-box">
                <Row>
                    <Col md={{span: 6, offset: 3}} sm={12}>
                        <label>Name</label>
                        <input name={'name'} type="text" className={'form-control'} onChange={this.handleChange}/>
                    </Col>
                    <Col md={{span: 6, offset: 3}} sm={12}>
                        <label>Weight (kg)</label>
                        <input name={'weight'} type="number" className={'form-control'} onChange={this.handleChange}/>
                    </Col>
                    <Col md={{span: 6, offset: 3}} sm={12}>
                        <label>Color</label>
                        <input name={'color'} type="color" className={'form-control'} onChange={this.handleChange}/>
                    </Col>
                    <Col md={{span: 6, offset: 3}} sm={12}>
                        <label>Destination</label>
                        <select name={'destination'} id="" className="form-control" onChange={this.handleChange}>
                            <option value="">Choose destination</option>
                            {this.props.countries.map(country => {
                                return <option key={country.id} value={country.id}>{country.name}</option>
                            })}
                        </select>
                    </Col>
                    <Col md={{span: 6, offset: 3}} sm={12} className={'text-left'}>
                        <Row>
                            <Col xs={6}>
                                <Button className={'btn btn-primary'} onClick={this.addBox}>Add Box</Button>
                            </Col>
                            <Col xs={6} className={'text-right'}>
                                <Link to={'/listboxes'} className={'btn btn-secondary'}>List Boxes</Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={{span: 6, offset: 3}} sm={12} className={'text-left'}>
                        <p>{this.state.msg}</p>
                    </Col>
                    <Col md={{span: 6, offset: 3}} sm={12}>
                        <div className="error-msg text-left">{errors.map(err => {
                            return <p>{err}</p>
                        })}</div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        countries: state.countries.countries
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setCountries: (countries) => {
            dispatch(setCountries(countries));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(List);