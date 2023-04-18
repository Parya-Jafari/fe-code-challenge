import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {
    DialogContentTitle,
    DialogContentBody,
    DialogFooterAction,
    Dialog,
    AnimatedDialog,
} from './Dialog';

describe('DialogContentTitle', () => {
    it('Render title correctly', () => {
        const { getByText } = render(<DialogContentTitle title="Hello World" />);
        expect(getByText('Hello World')).toBeInTheDocument();
    });

    it('Render with className prop', () => {
        const { getByTestId } = render(
            <DialogContentTitle title="Test" className="test-class" testId="dialog-content-title" />
        );
        expect(getByTestId('dialog-content-title')).toHaveClass('test-class');
    });
});

describe('DialogContentBody', () => {
    it('Render children correctly', () => {
        const { getByText } = render(
            <DialogContentBody>
                <p>Hello World</p>
            </DialogContentBody>
        );
        expect(getByText('Hello World')).toBeInTheDocument();
    });

    it('Render with className prop', () => {
        const { getByTestId } = render(
            <DialogContentBody className="test-class" testId="dialog-content-body">
                <p>Hello World</p>
            </DialogContentBody>
        );
        expect(getByTestId('dialog-content-body')).toHaveClass('test-class');
    });
});

describe('DialogFooterAction', () => {
    it('Render children correctly', () => {
        const { getByText } = render(
            <DialogFooterAction>
                <button>OK</button>
            </DialogFooterAction>
        );
        expect(getByText('OK')).toBeInTheDocument();
    });

    it('Render with className prop', () => {
        const { getByTestId } = render(
            <DialogFooterAction className="test-class" testId="dialog-footer-action">
                <button>OK</button>
            </DialogFooterAction>
        );
        expect(getByTestId('dialog-footer-action')).toHaveClass('test-class');
    });
});

describe('Dialog', () => {
    it('Render children and header correctly', () => {
        const { getByText } = render(
            <Dialog open={true} onClose={() => {}} header={<h2>Title</h2>}>
                <p>Hello World</p>
            </Dialog>
        );
        expect(getByText('Title')).toBeInTheDocument();
        expect(getByText('Hello World')).toBeInTheDocument();
    });

    it('Call onClose when close button is clicked', () => {
        const onCloseMock = jest.fn();
        const { getByLabelText } = render(
            <Dialog open={true} onClose={onCloseMock} header={<h2>Title</h2>}>
                <p>Hello World</p>
            </Dialog>
        );
        fireEvent.click(getByLabelText('Close alert'));
        expect(onCloseMock).toHaveBeenCalled();
    });

    it('Render with className prop', () => {
        const { getByTestId } = render(
            <Dialog open={true} onClose={() => {}} className="test-class" testId="dialog-test">
                <p>Hello World</p>
            </Dialog>
        );
        expect(getByTestId('dialog-test')).toHaveClass('test-class');
    });

    it('Render the Dialog with the header and content', () => {
        const onClose = jest.fn();
        const header = <h2>Header</h2>;
        const content = <p>Content</p>;
    
        const { getByTestId, getByText } = render(
          <Dialog open={true} onClose={onClose} header={header} testId="dialog">
            {content}
          </Dialog>
        );
    
        expect(getByTestId('dialog')).toBeInTheDocument();
        expect(getByText('Header')).toBeInTheDocument();
        expect(getByText('Content')).toBeInTheDocument();
    });

    it('Render the Dialog without header', () => {
        const onClose = jest.fn();
        const content = <p>Content</p>;
    
        const { getByTestId, queryByText, getByText } = render(
          <Dialog open={true} onClose={onClose} testId="dialog">
            {content}
          </Dialog>
        );
    
        expect(getByTestId('dialog')).toBeInTheDocument();
        expect(queryByText('Header')).toBeNull();
        expect(getByText('Content')).toBeInTheDocument();
    });
});

describe('AnimatedDialog', () => {
    it('Render the dialog when open is true', () => {
        const {getByTestId} = render(
            <AnimatedDialog open={true} onClose={() => {}} testId="animated-dialog-test"/>
        );
        const dialog = getByTestId('animated-dialog-test');
        expect(dialog).toBeInTheDocument();
    });

    it('Do not render the dialog when open is false', () => {
        const {queryByTestId} = render(
            <AnimatedDialog open={false} onClose={() => {}} testId="animated-dialog-test"/>
        );
        const dialog = queryByTestId('animated-dialog-test');
        expect(dialog).toHaveStyle({opacity: 0})
    });

    it('Call onClose when the close button is clicked', () => {
        const onClose = jest.fn();
        const {getByLabelText} = render(
            <AnimatedDialog open={true} onClose={onClose} />
        );
        const closeButton = getByLabelText('Close alert');
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('Render the header', () => {
        const {getByText} = render(
            <AnimatedDialog open={true} onClose={() => {}} header="Test Header" />
        );
        const header = getByText('Test Header');
        expect(header).toBeInTheDocument();
    });

    it('Render the children', () => {
        const {getByText} = render(
            <AnimatedDialog open={true} onClose={() => {}}>
                {() => <div>Test Children</div>}
            </AnimatedDialog>
        );
        const children = getByText('Test Children');
        expect(children).toBeInTheDocument();
    });

    it('Render the AnimatedDialog with the Dialog inside', () => {
        const onClose = jest.fn();
        const header = <h2>Header</h2>;
        const content = <p>Content</p>;
    
        const { getByTestId, getByText } = render(
          <AnimatedDialog open={true} onClose={onClose} header={header} testId="animated-dialog">
            {(state, onClose) => (
              <div>
                {content}
                <DialogFooterAction testId="dialog-footer-action">
                  <button onClick={onClose}>Close</button>
                </DialogFooterAction>
              </div>
            )}
          </AnimatedDialog>
        );
    
        expect(getByTestId('animated-dialog')).toBeInTheDocument();
        expect(getByText('Header')).toBeInTheDocument();
        expect(getByText('Content')).toBeInTheDocument();
        expect(getByTestId('dialog-footer-action')).toBeInTheDocument();
    });
});