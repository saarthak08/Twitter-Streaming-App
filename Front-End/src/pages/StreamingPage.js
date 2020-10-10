import React from "react";
import Tweet from "../components/Tweet";
import { Button, Col, Form, InputGroup, Spinner } from "react-bootstrap";

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
        };
        this.sampleEventSource = undefined;
    }

    onClickSampleStreamButton = (e) => {
        e.preventDefault();
        if (this.state.isSampleStreaming) {
            if (this.sampleEventSource !== undefined) {
                this.sampleEventSource.close();
            }
        } else {
            this.sampleEventSource = new EventSource(
                "http://localhost:8080/api/tweets/sample-stream"
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
        }
        this.setState({ isSampleStreaming: !this.state.isSampleStreaming });
    };

    onSubmitSearchQuery = (e) => {};

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
                    variant='outline-warning'
                    onClick={this.onClickSampleStreamButton}>
                    {this.state.isSampleStreaming ? (
                        <div id='sampleSpinnerDiv'>
                            Stop
                            <Spinner
                                id='sampleSpinner'
                                animation='border'
                                variant='dark'
                            />
                        </div>
                    ) : (
                        `Start Sample Streaming`
                    )}
                </Button>
                <Form
                    onSubmit={this.onSubmitSearchQuery}
                    className='searchForm'>
                    <p style={{ textAlign: "justify" }}>
                        The realtime filtered stream enables to filter the
                        real-time stream of public Tweets. You can set filters
                        to this stream and real-time matching public Tweets will
                        be delivered. If no filters are applied, this stream
                        will not return anything.
                    </p>
                    <Button
                        disabled={this.state.isSampleStreaming}
                        id='realtimeStreamingButton'
                        type='submit'
                        variant='success'>
                        Start Realtime Filtered Streaming
                    </Button>
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
