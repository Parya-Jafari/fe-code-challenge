import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateSelected} from '../spot/spot-actions';
import SpotDetails from '../spot/spot-details/SpotDetails';
import SpotList from './spot-list/SpotList';
import {useTransition, animated} from 'react-spring';
import {push} from 'connected-react-router';

const Search = ({
    selectedSpot,
    spots,
    setSpot,
    pushTo,
}) => {
    const transition = useTransition(selectedSpot, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
        exitBeforeEnter: true,
        config: {
            duration: 200
        }
    });

    return (
        <div className="Search">
            <SpotList
                spots={spots}
                selectedSpot={selectedSpot}
                setSpot={setSpot}
            />
            <div className="Search-content">
                {
                    transition((style, item) => (
                        <animated.div style={style}>
                            {item ?
                                <SpotDetails
                                    selectedSpot={item}
                                    setSelectedSpot={setSpot}
                                    onClickBook={() => pushTo('/checkout')}
                                /> : <></>
                            }
                        </animated.div>
                    )
                    )
                }
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
