import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import {AnimatedDialog, DialogContentBody, DialogContentTitle, DialogFooterAction} from '../../common/Dialog';

const SpotDetails = ({selectedSpot, setSelectedSpot, onClickBook}) => {
    return (
        <AnimatedDialog
            open={selectedSpot}
            onClose={() => setSelectedSpot(null)}
            animationConfig={{duration: 200}}
            className="details-dialog"
        >
            {spot => (
                <>
                    <DialogContentTitle
                        className="details-dialog__content-title"
                        title="Spot Details"
                    />
                    <DialogContentBody className="details-dialog__content-body">
                        <h2>{spot.title}</h2>
                        <p>{spot.description}</p>
                    </DialogContentBody>
                    <DialogFooterAction className="details-dialog__footer-action">
                        <Button
                            color="primary"
                            type="submit"
                            block={false}
                            onClick={onClickBook}
                        >
                            ${(spot.price / 100).toFixed(2)} | Book now!
                        </Button>
                    </DialogFooterAction>
                </>
            )}
        </AnimatedDialog>
    );
};

SpotDetails.propTypes = {
    selectedSpot: PropTypes.object,
    setSelectedSpot: PropTypes.func.isRequired,
    onClickBook: PropTypes.func.isRequired,
};

export default SpotDetails;
