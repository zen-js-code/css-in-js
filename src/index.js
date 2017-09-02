import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {AppContainer as HMRContainer} from 'react-hot-loader';

import AppContainer from './navigation/';

function renderApp() {
    render(
        <HMRContainer>
            <BrowserRouter>
                <AppContainer />
            </BrowserRouter>
        </HMRContainer>,
        document.getElementById('root')
    );
}

if (module.hot) {
    module.hot.accept('./navigation/', renderApp);
}

renderApp();
