import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ExternalLink from '../index';
import * as trackModule from '../../../utils/track';
import userEvent from '@testing-library/user-event';

jest.mock('../../../utils/track', () => ({
  trackExternallink: jest
    .fn()
    .mockImplementation(() => 'https://www.amazon.com')
}));

describe('ExternalLink', () => {
  const component = (
    <ExternalLink href="https://www.amazon.com" className="footer-link">
      Click Here!
    </ExternalLink>
  );

  it('should render the ExternalLink component', async () => {
    render(component);
    const externalLink = await screen.findByText('Click Here!');
    expect(externalLink).toBeInTheDocument();
  });

  it('should trackExternalLink on click', async () => {
    jest.spyOn(trackModule, 'trackExternalLink');
    render(component);
    const externalLink = await screen.findByText('Click Here!');
    userEvent.click(externalLink);

    await waitFor(() => {
      expect(trackModule.trackExternalLink).toHaveBeenCalled();
    });
  });
});
