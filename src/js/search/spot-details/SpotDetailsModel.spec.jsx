import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SpotDetailsModal from './SpotDetailsModal';

const mockSelectedSpot = {
    id: 1,
    title: "Test Spot",
    price: 5001,
    description: "This is a test spot",
    distance: "0.1 mi",
    image: "https://res.cloudinary.com/spothero/image/upload/v1579704583/front-end/code-challenge/wkabs86wl5zwqaksb6fr.jpg"
};

describe('SpotDetailsModal', () => {
    it('renders the spot title and description', () => {
        render(<SpotDetailsModal selectedSpot={mockSelectedSpot} setSelectedSpot={() => {}} onClickBook={() => {}} />);
        expect(screen.getByText('Test Spot')).toBeInTheDocument();
        expect(screen.getByText('This is a test spot')).toBeInTheDocument();
    });

    it('renders the correct price and button text', () => {
        render(<SpotDetailsModal selectedSpot={mockSelectedSpot} setSelectedSpot={() => {}} onClickBook={() => {}} />);
        expect(screen.getByText('$50.01 | Book now!')).toBeInTheDocument();
    });

    it('calls onClickBook when the book button is clicked', () => {
        const mockOnClickBook = jest.fn();
        render(<SpotDetailsModal selectedSpot={mockSelectedSpot} setSelectedSpot={() => {}} onClickBook={mockOnClickBook} />);
        const bookButton = screen.getByText('$50.01 | Book now!');
        fireEvent.click(bookButton);
        expect(mockOnClickBook).toHaveBeenCalled();
    });

    it('calls setSelectedSpot with null when the close button is clicked', () => {
        const mockSetSelectedSpot = jest.fn();
        render(<SpotDetailsModal selectedSpot={mockSelectedSpot} setSelectedSpot={mockSetSelectedSpot} onClickBook={() => {}} />);
        const closeButton = screen.getByRole('button', {name: "Close alert"});
        fireEvent.click(closeButton);
        expect(mockSetSelectedSpot).toHaveBeenCalledWith(null);
    });
});
