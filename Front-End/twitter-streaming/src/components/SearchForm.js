import React from "react";

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
        };
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmitSearchQuery(this.state.query);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        value={this.state.query}
                        placeholder='search query'
                        onChange={(e) =>
                            this.setState({ query: e.target.value })
                        }></input> &nbsp;
                        <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default SearchForm;
