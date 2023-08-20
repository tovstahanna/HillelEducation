import React  from 'react';
import { HeaderContainer } from './header-container.jsx'
import { MenuComponent } from "../components/menu-component.jsx";
import { HeadingComponent } from "../components/heading-component.jsx";
import { IconSmile } from '../components/icon-component.jsx';

export class HomeContainer extends React.Component {
    constructor(){
        super();
        this.icons = React.createRef();
        this.winnerElement = React.createElement('div', {className: 'winner'});
        console.log(this.icons);
        this.state = { 
            winner: this.winnerElement.innerHTML
        }
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick(){
        let max = 0;
        for (const child of this.icons.current.children) {
            if(child.getAttribute('data-count') > max){
                max = new Number(child.getAttribute('data-count'));
                this.setState({
                    winner: child.getAttribute('data-name')
                });
            }
        }        
    }

    render(){
        const iconList = new Array('em-apple', 'em-avocado', 'em-beetle', 'em-bee');
        const items = iconList.map( (el, index) => <IconSmile  key={`icon-${index}`} iconClass={el} /> );
        return (
            <main>
                <HeaderContainer title="Home task" values={this.props.headerItems} />
                <div className="container">
                    <div className="content">
                        <HeadingComponent text={this.props.headingH1} />
                        {this.props.text}
                        <div ref={this.icons} className='icons-list'>
                            { items }
                        </div>
                        <button id='result' onClick={this.onButtonClick}>
                            Show the winner
                        </button>
                        { this.state.winner && (
                            <div className='winner1'>
                                <p>The winner is  <i className={`em ${this.state.winner}`}></i></p>
                            </div>
                        )} 
                    </div>  
                </div>
            </main>
        );
    }
}