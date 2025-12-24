import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, it, expect, vi } from 'vitest';

// Mock Recharts ResponsiveContainer to avoid width/height issues in JSDOM
vi.mock('recharts', async () => {
    const OriginalModule = await vi.importActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
            <div style={{ width: 500, height: 300 }}>{children}</div>
        ),
    };
});

describe('App', () => {
    it('renders dashboard header', () => {
        render(<App />);
        const headerElement = screen.getByText(/團隊健康儀表板/i);
        expect(headerElement).toBeInTheDocument();
    });

    it('renders bottom navigation', () => {
        render(<App />);
        // screen.debug(); // Inspect DOM
        const warRoomTab = screen.getByText('戰情', { selector: 'span' });
        const managementTab = screen.getByText(/團隊動態/i);
        const careTab = screen.getByText(/關懷/i);
        expect(warRoomTab).toBeInTheDocument();
        expect(managementTab).toBeInTheDocument();
        expect(careTab).toBeInTheDocument();
    });
});
