import React from "react";
import Tweet from "../components/Tweet";
import ChipList from "../components/ChipList";
import { Button, Col, Form, InputGroup, Spinner } from "react-bootstrap";
import {
    addStreamRule,
    deleteStreamRule,
    getAllStreamRules,
} from "../network/RealtimeTweetsStreamRulesNetworkRequests";

class StreamingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            searchOption: "keyword",
            inputPrepend: ":",
            inputValue: "Enter Keyword",
            isSampleStreaming: false,
            tweets: [],
            tweetsTitle: "",
            loading: false,
            chipData: [],
            isRealtimeStreaming: false,
        };
        this.sampleEventSource = undefined;
        this.realtimeEventSource = undefined;
    }

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
        } else if (e.target.value === "#") {
            this.setState({
                inputPrepend: "#",
                inputValue: "Enter Hashtag",
            });
        }
    };

    deleteChip = (chipToDelete) => {
        this.setState({ loading: true });
        deleteStreamRule(chipToDelete.id)
            .then((res) => {
                if (res.status === 200) {
                    var chips = this.state.chipData.filter((chip) => {
                        return chip.id !== chipToDelete.id;
                    });
                    this.setState({
                        chipData: chips,
                    });
                    this.setState({ loading: false });
                }
            })
            .catch((err) => {
                this.setState({ loading: false });
            });
    };

    fetchAllStreamRules = () => {
        this.setState({ loading: true });
        getAllStreamRules()
            .then((res) => {
                if (res.data.data) {
                    this.setState({ chipData: res.data.data });
                }
                this.setState({ loading: false });
            })
            .catch((err) => {
                this.setState({ loading: false });
            });
    };

    componentDidMount() {
        this.fetchAllStreamRules();
    }

    onClickSampleStreamButton = (e) => {
        e.preventDefault();
        if (this.state.isSampleStreaming) {
            if (this.sampleEventSource !== undefined) {
                this.sampleEventSource.close();
            }
        } else {
            this.setState({ tweets: [], tweetsTitle: [] });
            this.sampleEventSource = new EventSource(
                "https://twitter-streaming-app-backend.herokuapp.com/api/tweets/sample-stream"
            );
            this.sampleEventSource.onmessage = (event) => {
                this.setState({
                    tweetsTitle: "Sample Streamed Tweets",
                    tweets: [
                        ...this.state.tweets,
                        ...JSON.parse(event.data).data,
                    ],
                });
            };
            this.sampleEventSource.onerror = (event) => {
                this.sampleEventSource.close();
                this.setState({
                    isSampleStreaming: !this.state.isSampleStreaming,
                });
            };
        }
        this.setState({ isSampleStreaming: !this.state.isSampleStreaming });
    };

    onClickRealtimeStreamButton = (e) => {
        e.preventDefault();
        if (this.state.isRealtimeStreaming) {
            if (this.realtimeEventSource !== undefined) {
                this.realtimeEventSource.close();
            }
        } else {
            this.setState({ tweets: [], tweetsTitle: "" });
            this.realtimeEventSource = new EventSource(
                "https://twitter-streaming-app-backend.herokuapp.com/api/tweets/live-stream"
            );
            this.realtimeEventSource.onmessage = (event) => {
                this.setState({
                    tweetsTitle: "Realtime Streamed Tweets",
                    tweets: [
                        ...this.state.tweets,
                        ...JSON.parse(event.data).data,
                    ],
                });
            };
            this.realtimeEventSource.onerror = (event) => {
                this.realtimeEventSource.close();
                this.setState({
                    isRealtimeStreaming: !this.state.isRealtimeStreaming,
                });
            };
        }
        this.setState({ isRealtimeStreaming: !this.state.isRealtimeStreaming });
    };

    onSubmitSearchQuery = (e) => {
        e.preventDefault();
        if (this.state.query.length !== 0) {
            this.setState({ loading: true });
            var query, tag;
            if (this.state.searchOption === "phrase") {
                query = `"${this.state.query}"`;
            } else if (this.state.searchOption === "#") {
                query = `${this.state.searchOption}${this.state.query}`;
            } else if (this.state.searchOption === "from:") {
                query = `${this.state.searchOption}${this.state.query}`;
            } else if (this.state.searchOption === "keyword") {
                query = this.state.query;
            }
            tag = query;
            addStreamRule({ value: query, tag: tag })
                .then((res) => {
                    this.setState({ loading: false });
                    if (res.data.data) {
                        this.setState({
                            chipData: [
                                ...this.state.chipData,
                                ...res.data.data,
                            ],
                        });
                    }
                })
                .catch((e) => {
                    this.setState({ loading: false });
                });
        }
    };

    render() {
        return (
            <div className='pageBody'>
                <h3 className='pageTitle'>Stream Tweets</h3>
                <p style={{ textAlign: "justify" }}>
                    The sampled stream delivers a roughly 1% random sample of
                    publicly available Tweets in real-time. You cannot set
                    filters to sample streams.
                </p>
                <Button
                    id='sampleStreamingButton'
                    type='submit'
                    disabled={this.state.isRealtimeStreaming}
                    variant='outline-warning'
                    onClick={this.onClickSampleStreamButton}>
                    {this.state.isSampleStreaming ? (
                        <div className='sampleSpinnerDiv'>
                            Stop
                            <Spinner
                                className='sampleSpinner'
                                animation='border'
                                variant='dark'
                            />
                        </div>
                    ) : (
                        `Start Sample Streaming`
                    )}
                </Button>
                <p style={{ textAlign: "justify" }}>
                    The realtime filtered stream enables to filter the real-time
                    stream of public Tweets. You can set filters to this stream
                    and real-time matching public Tweets will be delivered.{" "}
                    <strong>
                        If no filters are applied, this stream will not return
                        anything.
                    </strong>
                </p>
                <Button
                    onClick={this.onClickRealtimeStreamButton}
                    disabled={
                        this.state.isSampleStreaming ||
                        this.state.chipData.length === 0
                    }
                    id='realtimeStreamingButton'
                    type='submit'
                    variant='success'>
                    {this.state.isRealtimeStreaming ? (
                        <div className='sampleSpinnerDiv'>
                            Stop
                            <Spinner
                                className='sampleSpinner'
                                animation='border'
                                variant='dark'
                            />
                        </div>
                    ) : (
                        `Start Realtime Streaming`
                    )}
                </Button>
                <Form
                    onSubmit={this.onSubmitSearchQuery}
                    className='searchForm'>
                    <Form.Row>
                        <Col xs={7}>
                            <Form.Group>
                                <Form.Label className='formLabel'>
                                    Filters (*)
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id='inputGroupPrepend'>
                                            {this.state.inputPrepend}
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        disabled={this.state.isSampleStreaming}
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
                                    Categories
                                </Form.Label>
                                <Form.Control
                                    disabled={this.state.isSampleStreaming}
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
                                    Add Filter
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form.Row>
                </Form>
                {this.state.loading ? (
                    <div id='ruleSpinnerDiv'>
                        <Spinner animation='border' variant='dark'></Spinner>
                    </div>
                ) : (
                    <div></div>
                )}
                {this.state.chipData.length !== 0 ? (
                    <ChipList
                        chipData={this.state.chipData}
                        deleteChip={this.deleteChip}></ChipList>
                ) : (
                    <div></div>
                )}
                <div id='tweetsTitleDiv'>{this.state.tweetsTitle}</div>
                <div id='streamTweetsListDiv'>
                    {this.state.tweets.map((tweet, index) => {
                        return (
                            <Tweet
                                tweet={tweet}
                                key={index}
                                index={index}></Tweet>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default StreamingPage;
