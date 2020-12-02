import React, { Component } from 'react';
import Headers from './components/headers.js';
import Content from './components/content.js';

class App extends Component {
    render() {
        return(
            <article className="box-items">
                <Headers />
                <Content />
            </article>
        );
    }
}

export default App;