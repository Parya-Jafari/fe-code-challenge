import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import axios from 'axios';
import createStore, {getHistory} from './store/store';
import App from './App';
import {PersistGate} from 'redux-persist/integration/react';

export default class Root extends Component {
    state = {
        isLoading: true,
        spots: []
    };

    componentDidMount() {
        this._loadSpots();
    }

    async _loadSpots() {
        try {
            const {
                data
            } = await axios.get('/spots');

            this.setState({
                isLoading: false,
                spots: data
            });
        } catch (error) {
            console.log('Error loading spot data: ', error); // eslint-disable-line no-console
        }
    }

    render() {
        const {
            isLoading,
            spots
        } = this.state;

        const Loading = () => {
            return (
                <div className="Root-loader">
                    Loading...
                </div>
            );
        };

        if (isLoading) {
            return <Loading />;
        }

        const {store, persistor} = createStore();

        return (
            <div className="Root">
                <Provider store={store}>
                    <ConnectedRouter history={getHistory()}>
                        <PersistGate
                            loading={<Loading />}
                            persistor={persistor}
                        >
                            <App spots={spots} />
                        </PersistGate>
                    </ConnectedRouter>
                </Provider>
            </div>
        );
    }
}
