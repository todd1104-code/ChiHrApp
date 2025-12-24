import { render, screen, fireEvent } from '@testing-library/react';
import WheelColumn from '../WheelColumn';
import { describe, it, expect, vi } from 'vitest';

describe('WheelColumn', () => {
    const options = [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
        { value: 3, label: 'Option 3' },
    ];

    it('renders all options', () => {
        const handleChange = vi.fn();
        render(<WheelColumn options={options} value={1} onChange={handleChange} />);

        options.forEach(opt => {
            expect(screen.getByText(opt.label)).toBeInTheDocument();
        });
    });

    it('highlights the selected option', () => {
        const handleChange = vi.fn();
        render(<WheelColumn options={options} value={1} onChange={handleChange} />);

        const selectedOption = screen.getByText('Option 1');
        expect(selectedOption).toHaveClass('text-primary');

        const unselectedOption = screen.getByText('Option 2');
        expect(unselectedOption).toHaveClass('text-gray-400');
    });
});
