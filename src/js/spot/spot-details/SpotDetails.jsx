import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button';

const SpotDetails = ({selectedSpot, setSelectedSpot, onClickBook}) => {
    return (
        <div className="SpotDetails-container">
            <div className="SpotDetails-header">
                <button
                    className="SpotDetails-action"
                    aria-label="Close alert"
                    type="button"
                    onClick={() => setSelectedSpot(null)}
                >
                    <>&times;</>
                </button>
            </div>
            <div className="SpotDetails-title">
                <h1>
                    Spot Details
                </h1>
            </div>
            <div className="SpotDetails-body">
                <h2>{selectedSpot.title}</h2>
                <p>{selectedSpot.description}</p>
                <Button
                    color="primary"
                    type="submit"
                    block={false}
                    onClick={onClickBook}
                >
                    ${(selectedSpot.price / 100).toFixed(2)} | Book now!
                </Button>
            </div>
        </div>
    );
};

SpotDetails.propTypes = {
    selectedSpot: PropTypes.object,
    setSelectedSpot: PropTypes.func.isRequired,
    onClickBook: PropTypes.func.isRequired,
};

export default SpotDetails;
