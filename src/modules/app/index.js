import React, {Component, Children} from 'react';
import {NavLink} from 'react-router-dom';

export default class App extends Component {
    componentDidCatch(error, info) {
        console.log(info);
        console.error(error);
    }

    render() {
        const Content = Children.only(this.props.children);

        return (
            <div>
                <header>
                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="/admin">Admin</NavLink>
                </header>
                <main>
                    {Content}
                </main>
            </div>
        );
    }
}
