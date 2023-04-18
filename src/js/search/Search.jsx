import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateSelected} from '../spot/spot-actions';
import SpotDetails from './spot-details/SpotDetails';
import SpotList from './spot-list/SpotList';
import {push} from 'connected-react-router';

const Search = ({
    selectedSpot,
    spots,
    setSpot,
    pushTo,
}) => {
    return (
        <div className="Search">
            <SpotList
                spots={spots}
                selectedSpot={selectedSpot}
                setSpot={setSpot}
            />
            <div className="Search-content">
                <SpotDetails
                    selectedSpot={selectedSpot}
                    setSelectedSpot={setSpot}
                    onClickBook={() => pushTo('/checkout')}
                />
            </div>
        </div>
    );
};

Search.propTypes = {
    selectedSpot: PropTypes.object,
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSpot: PropTypes.func.isRequired,
    pushTo: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    setSpot: updateSelected,
    pushTo: push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
