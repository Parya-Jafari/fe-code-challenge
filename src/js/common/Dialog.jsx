import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {useTransition, animated} from 'react-spring';

export const DialogContentTitle = ({title, className}) => {
    const titleClasses = classNames('Dialog__content-title', className);

    return (
        <div className={titleClasses}>
            <h1>
                {title}
            </h1>
        </div>
    );
};

DialogContentTitle.propTypes = {
    title: PropTypes.node,
    className: PropTypes.string,
};

export const DialogContentBody = ({children, className}) => {
    const bodyClasses = classNames('Dialog__content-body', className);

    return (
        <div className={bodyClasses}>
            {children}
        </div>
    );
};

DialogContentBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export const DialogFooterAction = ({children, className}) => {
    const footerClasses = classNames('Dialog__footer-action', className);

    return (
        <div className={footerClasses}>
            {children}
        </div>
    );
};

DialogFooterAction.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export const Dialog = ({open, onClose, header, children, className}) => {
    const dialogClasses = classNames('Dialog', className);

    return (
        <div className={dialogClasses}>
            <div className="Dialog__header">
                <button
                    className="Dialog__header-action"
                    aria-label="Close alert"
                    type="button"
                    onClick={onClose}
                >
                    <>&times;</>
                </button>
                {header}
            </div>
            {children}
        </div>
    );
};

Dialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    header: PropTypes.node,
    className: PropTypes.string,
};

export const AnimatedDialog = ({open, onClose, animationConfig, header, children, className}) => {
    const transition = useTransition(open, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
        exitBeforeEnter: true,
        config: animationConfig
    });

    return (
        <>
            {
                transition((style, state) => (
                    <animated.div style={style}>
                        {state ?
                            <Dialog
                                open={state}
                                onClose={onClose}
                                header={header}
                                className={className}
                            >
                                {children(state, onClose)}
                            </Dialog> : <></>
                        }
                    </animated.div>
                )
                )
            }
        </>
    );
};

AnimatedDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    animationConfig: PropTypes.object,
    children: PropTypes.node,
    header: PropTypes.node,
    className: PropTypes.string,
};
