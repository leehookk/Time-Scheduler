import React, {Component} from 'react'
import HelloWorldService from '../../api/todo/HelloWorldService.js'
import { Link } from 'react-router-dom'

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeMessage: '',
            errorMessage:''
        }
        this.retrieveWelcomMessage = this.retrieveWelcomMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    render() {
        return (
            <>
                <div>
                    {this.state.errorMessage}
                </div>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome to this page, {this.props.match.params.name}! 
                    You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                    Click here for a customized welcome message. 
                    <button onClick={this.retrieveWelcomMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    // show response data
    retrieveWelcomMessage() {
        // Here comes a Promise object, we can use .then() to determine operations following its success, or .catch() to execute after its failure.
        // HelloWorldService.executeHelloWorldService()
        // .then(response => this.handleSuccessfulResponse(response))

        // call hello world bean service
        // HelloWorldService.executeHelloWorldBeanService()
        // .then(response => this.handleSuccessfulResponse(response))

        // call service with a path variable
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response) {
        console.log(response)
        this.setState({welcomeMessage: response.data.message})
    }

    handleError(error) {
        console.log(error.response)
        this.setState({errorMessage: error.response.data.message})
    }

}

export default WelcomeComponent