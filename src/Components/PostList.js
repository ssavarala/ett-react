import React, { Component } from 'react'
import axios from 'axios'
class PostList extends Component {
	constructor(props) {
		super(props)

		this.state = {
      tests: [],
      errorMsg: ''
		}
	}

	componentDidMount() {
		axios
            .get('/ett/api/smtpcasesjson')
			.then(response => {
				console.log(response.data)
				this.setState({ tests: response.data.tests })
			})
			.catch(error => {
        console.log(error)
        this.setState({errorMsg: 'Error retrieving data'})
			})
	}

	render() {
		const { tests, errorMsg } = this.state
		return (
			<div>
				List of tests
				{tests.length
					? tests.map(test => <div key={test.id}> {test.id}-->{test.desc}</div>)
          : null}
			</div>
		)
	}
}

export default PostList
