import React from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";

class StreamingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            searchOption: "keyword",
            inputPrepend: ":",
            inputValue: "Enter Keyword",
        };
    }

    render() {
        return (
            <div className='pageBody'>
                <h3 className='pageTitle'>Stream Tweets</h3>
                <Form
                    onSubmit={this.onSubmitSearchQuery}
                    className='searchForm'>
                    <Form.Row>
                        <Col xs={7}>
                            <Form.Group>
                                <Form.Label className='formLabel'>
                                    Search Query (*)
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='inputGroupPrepend'>
                                            {this.state.inputPrepend}
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        required
                                        className='searchQueryInput'
                                        placeholder={this.state.inputValue}
                                        value={this.state.query}
                                        onChange={(e) =>
                                            this.setState({
                                                query: e.target.value,
                                            })
                                        }
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className='formSelectGroup'>
                                <Form.Label className='formLabel'>
                                    Filters
                                </Form.Label>
                                <Form.Control
                                    className='formSelect'
                                    as='select'
                                    custom
                                    onChange={this.onChangeSelectOptions}>
                                    <option value='keyword'>Keyword</option>
                                    <option value='from:'>Username</option>
                                    <option value='phrase'>
                                        Search Exact Phrase
                                    </option>
                                    <option value='#'>Hashtag</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Form.Group>
                            <Col>
                                <Button
                                    type='submit'
                                    style={{
                                        marginTop: "2rem",
                                        backgroundColor:
                                            this.state.query.length === 0
                                                ? "grey"
                                                : "#157AF6",
                                    }}>
                                    Search
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <Button id='searchButton' type='submit' variant='primary'>
                    Search
                </Button>
            </div>
        );
    }
}

export default StreamingPage;
