import React from 'react';

export class IconSmile extends React.Component{
    constructor(){
        super();
        this.state = {
            counter: 0
        }
        this.onIconClick = this.onIconClick.bind(this);
    }

    onIconClick(){
        this.setState({
            counter: ++this.state.counter
        })
    }

    render(){
        return (
            <div data-name={this.props.iconClass} data-count={this.state.counter}>
                <button onClick={this.onIconClick}>
                    <i className={`em ${this.props.iconClass}`}></i>
                </button>
                <p>{this.state.counter}</p>
            </div>           
        );
    }
}