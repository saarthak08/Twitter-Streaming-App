import React from "react";
import axios from "axios";
import { SingleDatePicker } from "react-dates";
import { connect } from "react-redux";
import { addTweets, clearTweets } from "../actions/TweetsActions";
import { clearMeta, setMeta } from "../actions/MetaActions";
import { Form, Col, InputGroup,Button } from "react-bootstrap";
import { setLoadingFalse, setLoadingTrue } from "../actions/LoadingAction";

class RecentSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            searchOption: "keyword",
            inputPrepend: ":",
            inputValue: "Enter Keyword",
        };
    }

    onSubmitSearchQuery = (e) => {
        console.log('hello');
        e.preventDefault();
        this.props.dispatch(setLoadingTrue());
        this.props.dispatch(clearTweets());
        this.props.dispatch(clearMeta());
        var apiUrl = `http://localhost:8080/api/tweets/search?keyword=`;
        if (this.state.searchOption === "phrase") {
            apiUrl = apiUrl.concat(`"${this.state.query}"`);
        } else if (this.state.searchOption !== "keyword") {
            apiUrl = apiUrl.concat(
                `${this.state.searchOption}${this.state.query}`
            );
        } else {
            apiUrl = apiUrl.concat(`${this.state.query}`);
        }

        axios
            .get(apiUrl)
            .then((res) => {
                this.props.dispatch(addTweets({ tweets: res.data.data }));
                this.props.dispatch(setMeta({ meta: res.data.meta }));
                this.props.dispatch(setLoadingFalse());
            })
            .catch((e) => {
                console.log(e);
                this.props.dispatch(setLoadingFalse());
            });
    };

    render() {
        return (
            <div className='pageBody'>
                <h3 className='pageTitle'>Recent Tweets Search</h3>
                <Form
                    onSubmit={this.onSubmitSearchQuery}
                    className='searchForm'>
                    <Form.Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className='formLabel'>
                                    Search Query
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='inputGroupPrepend'>
                                            {this.state.inputPrepend}
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
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
                                    onChange={(e) => {
                                        this.setState({
                                            searchOption: e.target.value,
                                        });
                                        if (
                                            e.target.value === "keyword" ||
                                            e.target.value === "phrase"
                                        ) {
                                            this.setState({
                                                inputPrepend: ":",
                                            });
                                            if (e.target.value === "keyword") {
                                                this.setState({
                                                    inputValue: "Enter Keyword",
                                                });
                                            } else {
                                                this.setState({
                                                    inputValue: "Enter Phrase",
                                                });
                                            }
                                        } else if (e.target.value === "from:") {
                                            this.setState({
                                                inputPrepend: "@",
                                                inputValue: "Enter Username",
                                            });
                                        } else if (e.target.value === "%23") {
                                            this.setState({
                                                inputPrepend: "#",
                                                inputValue: "Enter Hashtag",
                                            });
                                        }
                                    }}>
                                    <option value='keyword'>Keyword</option>
                                    <option value='from:'>Username</option>
                                    <option value='phrase'>
                                        Search Exact Phrase
                                    </option>
                                    <option value='%23'>Hashtag</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className='formLabel'>
                                    Recent Date
                                </Form.Label>
                                <br />
                                <div className='customDatePickerDiv'>
                                    <SingleDatePicker
                                        anchorDirection='right'
                                        placeholder='Select Recent Date'
                                        block={true}
                                        date={this.state.date}
                                        onDateChange={(date) =>
                                            this.setState({ date })
                                        }
                                        focused={this.state.focused}
                                        onFocusChange={({ focused }) =>
                                            this.setState({ focused })
                                        }
                                        numberOfMonths={1}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Button type='submit' id='searchButton'>Search</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default connect()(RecentSearchForm);
