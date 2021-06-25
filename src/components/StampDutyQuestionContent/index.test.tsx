import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StampDutyQuestionContent from './index';
import { renderWithContext } from '../../utils/helpers';

describe('<StampDutyQuestionContent />', () => {
  afterEach(cleanup);

  it('should render elements correctly', () => {
    const { getByTestId } = renderWithContext(<StampDutyQuestionContent />);

    expect(getByTestId('stamp-duty-heading')).toBeTruthy();
    expect(getByTestId('stamp-duty-form')).toBeTruthy();
  });

  it('should display required error when Property type is not selected when clicked away', () => {
    const { findByTestId, getByLabelText } = renderWithContext(<StampDutyQuestionContent />);
    getByLabelText('property-type-select-input').focus();
    fireEvent.blur(getByLabelText('property-type-select-input'));

    expect(findByTestId('field-error-message')).toBeTruthy();
  });

  it('should display required error when State is not selected when clicked away', () => {
    const { findByTestId, getByLabelText } = renderWithContext(<StampDutyQuestionContent />);
    getByLabelText('state-select-input').focus();
    fireEvent.blur(getByLabelText('state-select-input'));

    expect(findByTestId('field-error-message')).toBeTruthy();
  });

  it('should display min error when Expected property value and Estimated deposit are less than min amount', async () => {
    const { findAllByTestId, getByLabelText } = renderWithContext(<StampDutyQuestionContent />);

    userEvent.type(getByLabelText('property-value-input'), '999');
    userEvent.type(getByLabelText('estimated-deposit-input'), '999');

    const errors = await findAllByTestId('field-error-message');

    expect(errors).toHaveLength(2);
    errors.map((error) => {
      expect(error).toHaveTextContent('Loan amount must be equal to or greater than $1,000');
    });
  });

  it('should display max error when Expected property value and Estimated deposit are more than max amount', async () => {
    const { findAllByTestId, getByLabelText } = renderWithContext(<StampDutyQuestionContent />);

    userEvent.type(getByLabelText('property-value-input'), '199999999');
    userEvent.type(getByLabelText('estimated-deposit-input'), '199999999');

    const errors = await findAllByTestId('field-error-message');

    expect(errors).toHaveLength(2);
    errors.map((error) => {
      expect(error).toHaveTextContent('Loan amount must be less than 100 million');
    });
  });
});
