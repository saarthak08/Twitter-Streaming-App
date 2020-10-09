import React from "react";
import axios from "axios";
import { SingleDatePicker } from "react-dates";
import { connect } from "react-redux";
import moment from "moment";
import { addTweets, clearTweets } from "../actions/TweetsActions";
import { clearMeta, setMeta } from "../actions/MetaActions";
import { Form, Col, InputGroup, Button } from "react-bootstrap";

class RecentSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            date: undefined,
            formattedDate: "",
            calendarFocused: false,
            searchOption: "keyword",
            inputPrepend: ":",
            inputValue: "Enter Keyword",
        };
    }

    onSubmitSearchQuery = (e) => {
        e.preventDefault();
        if (this.state.query.length !== 0) {
            this.props.setSpinner(true);
            this.props.setError(false);
            this.props.setMessage(false);
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
            if (this.state.formattedDate.length !== 0) {
                apiUrl = apiUrl.concat(
                    `&start_time=${this.state.formattedDate}.000Z`
                );
            }
            axios
                .get(apiUrl)
                .then((res) => {
                    this.props.setURL(apiUrl);
                    console.log(res);
                    this.props.dispatch(addTweets({ tweets: res.data.data }));
                    if(res.data.data.length===0) {
                        this.props.setMessage(true);
                    }
                    this.props.dispatch(setMeta({ meta: res.data.meta }));
                    this.props.setSpinner(false);
                })
                .catch((e) => {
                    this.props.setSpinner(false);
                    this.props.setError(true);
                });
        }
    };

    onChangeSelectOptions = (e) => {
        this.setState({
            searchOption: e.target.value,
        });
        if (e.target.value === "keyword" || e.target.value === "phrase") {
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
    };

    render() {
        return (
            <div className='pageBody'>
                <h3 className='pageTitle'>Recent Tweets Search</h3>
                <p>Search Recent Tweets from the last 7 days.</p>
                <Form
                    onSubmit={this.onSubmitSearchQuery}
                    className='searchForm'>
                    <Form.Row>
                        <Col xs={5}>
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
                                    <option value='%23'>Hashtag</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className='formLabel'>
                                    Start Date
                                </Form.Label>
                                <br />
                                <div className='customDatePickerDiv'>
                                    <SingleDatePicker
                                        displayFormat='DD/MM/YYYY'
                                        anchorDirection='right'
                                        date={this.state.date}
                                        placeholder='DD/MM/YYYY'
                                        block={true}
                                        onDateChange={(date) => {
                                            this.setState({
                                                date,
                                                formattedDate: moment
                                                    .utc(date)
                                                    .format(
                                                        "YYYY-MM-DDTHH:mm:ss"
                                                    ),
                                            });
                                        }}
                                        focused={this.state.calendarFocused}
                                        onFocusChange={({ focused }) =>
                                            this.setState({
                                                calendarFocused: focused,
                                            })
                                        }
                                        numberOfMonths={1}
                                        isOutsideRange={(day) =>
                                            day.isAfter(moment()) ||
                                            day.isBefore(
                                                moment().subtract(7, "days")
                                            )
                                        }
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col id='buttonColumn'>
                            <Button
                                type='submit'
                                id='searchButton'
                                style={{
                                    backgroundColor:
                                        this.state.query.length === 0
                                            ? "grey"
                                            : "#157AF6",
                                }}>
                                Search
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

export default connect()(RecentSearchForm);
