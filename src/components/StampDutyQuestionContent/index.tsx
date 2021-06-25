/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
import React, { useContext } from 'react';
import { Body } from '@lendi-ui/typography';
import Grid from '@lendi-ui/grid';
import { Select } from '@lendi-ui/dropdown';
import { Radio } from '@lendi-ui/radio';
import { Input } from '@lendi-ui/text-input';
import { Wrap, DollarWithMargin, TooltipHelp, RadioWrap, FlexWrap } from './index.style';
import Tooltip from '@lendi-ui/tooltip';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../atom/ButtonWithMargin';
import { FormDataContext } from '../../contexts/FormDataContext';
import { BoldHeading } from '../atom/BoldHeading';
import NumberFormat from 'react-number-format';
import { State } from '@lendi/core-constants';
import { Router } from '../../utils/helpers';
import LendiLeads from '@lendi/lendi-lead-library';

export enum RecentPropertyType {
  NewHome = 'NEW_HOME',
  EstablishedHome = 'ESTABLISHED_HOME',
  VacantLand = 'VACANT_LAND',
}

const propertyType = [
  {
    label: 'Newly built / off the plan',
    value: RecentPropertyType.NewHome,
  },
  {
    label: 'Established home',
    value: RecentPropertyType.EstablishedHome,
  },
  {
    label: 'Vacant land to build on',
    value: RecentPropertyType.VacantLand,
  },
];

export enum RecentPropertyUse {
  OwnerOccupied = 'OWNER_OCCUPIED',
  Investment = 'INVESTMENT',
}

const propertyUseOptions = [
  {
    label: 'Owner occupied',
    value: RecentPropertyUse.OwnerOccupied,
  },
  {
    label: 'Investment',
    value: RecentPropertyUse.Investment,
  },
];

export enum CurrentSituation {
  FirstHomeBuyer = 'First home buyer',
  ForeignInvestor = 'Foreign investor',
}

const currentSituationOptions = [
  {
    label: 'First home buyer',
    value: CurrentSituation.FirstHomeBuyer,
  },
  {
    label: 'Foreign investor',
    value: CurrentSituation.ForeignInvestor,
  },
  {
    label: 'Neither',
    value: 'Neither',
  },
];

interface SelectOption {
  label: string;
  value: string;
}

interface StampDutyQuestionFormData {
  propertyType: RecentPropertyType;
  propertyState: State;
  propertyUse: RecentPropertyUse;
  propertyValue: number;
  estimatedDeposit: number;
  currentSituation: string;
}

interface RecentStampDutyData {
  deposit: number;
  securityValue: number;
  isFirstHomeBuyer: boolean;
  isForeignInvestor: boolean;
  propertyState: State;
  propertyType: RecentPropertyType;
  propertyUse: RecentPropertyUse;
}

const mapFormDataToLeadsData = (formData: StampDutyQuestionFormData): RecentStampDutyData => {
  const { estimatedDeposit, propertyValue, currentSituation, propertyState, propertyType, propertyUse } = formData;

  return {
    deposit: estimatedDeposit,
    securityValue: propertyValue,
    isFirstHomeBuyer: currentSituation === CurrentSituation.FirstHomeBuyer,
    isForeignInvestor: currentSituation === CurrentSituation.ForeignInvestor,
    propertyState,
    propertyType,
    propertyUse,
  };
};

const StampDutyQuestionContent: React.FC = () => {
  const { submitData } = useContext(FormDataContext);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: 'all', reValidateMode: 'onSubmit' });

  const onSubmit = (data: StampDutyQuestionFormData) => {
    const leadsData = mapFormDataToLeadsData(data);
    if (leadsData) {
      const L3 = new LendiLeads('STAMP_DUTY_CALCULATOR');
      L3.set(leadsData);
    }

    submitData(data);
    Router.push({ pathname: '/result', query: Router.query() });
  };

  const requiredErrMsg = (field?: string) => {
    if (!field) return 'Please select an option';
    return `Please enter a ${field === 'propertyValue' ? 'property value' : 'deposit amount'}`;
  };
  const minErrMsg = 'Loan amount must be equal to or greater than $1,000';
  const maxErrMsg = 'Loan amount must be less than 100 million';

  const renderErrorMessage = (field: string) => {
    const fieldError = errors[field];
    if (!fieldError) return;

    return (
      <Body data-testid="field-error-message" size="xs" color="error.500" align="left" mt="xxs" mb="md">
        {fieldError.message}
      </Body>
    );
  };

  return (
    <Grid halign="center">
      <Grid.Unit size={{ xs: 1, md: 1 / 2 }}>
        <Wrap>
          <BoldHeading
            size="md"
            as="h1"
            color="shade.700"
            mt="sm"
            mb="sm"
            align="center"
            data-testid="stamp-duty-heading"
          >
            Stamp duty calculator
          </BoldHeading>
          <Body size="sm" color="shade.1000" align="center" mb="lg">
            Stamp duty is a one-off government tax you'll need to pay when buying a property. It's one of the biggest
            upfront costs to purchasing so it's important to factor it into your budget.
          </Body>
          <form data-testid="stamp-duty-form" onSubmit={handleSubmit(onSubmit)}>
            <Body size="md" color="shade.700" align="left" mb="xxs">
              Property type
            </Body>
            <Controller
              name="propertyType"
              control={control}
              rules={{ required: requiredErrMsg() }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <Select
                  size="md"
                  options={propertyType}
                  placeholder="Please select"
                  isFullWidth
                  hideSelectedOptions={false}
                  onChangeItem={(option: SelectOption) => onChange(option.value)}
                  onBlur={onBlur}
                  value={propertyType[value]}
                  isError={error}
                  aria-label="property-type-select-input"
                />
              )}
            />
            {renderErrorMessage('propertyType')}

            <Body size="md" color="shade.700" align="left" mt="md" mb="xxs">
              State
            </Body>
            <Controller
              name="propertyState"
              control={control}
              rules={{ required: requiredErrMsg() }}
              render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
                <Select
                  size="md"
                  options={Object.values(State).map((s) => ({ label: s, value: s }))}
                  placeholder="Please select"
                  isFullWidth
                  hideSelectedOptions={false}
                  onChangeItem={(option: SelectOption) => onChange(option.value)}
                  onBlur={onBlur}
                  isError={error}
                  aria-label="state-select-input"
                />
              )}
            />
            <Body size="xs" color="shade.700" align="left" mt="xxs" mb="md">
              Different states calculate stamp duty differently
            </Body>
            {renderErrorMessage('state')}

            <Body size="md" color="shade.700" align="left">
              Property use
            </Body>
            <Controller
              name="propertyUse"
              control={control}
              rules={{ required: requiredErrMsg() }}
              render={({ field: { onChange, value } }) => (
                <RadioWrap>
                  {propertyUseOptions.map((propertyUse) => {
                    return (
                      <Radio
                        key={propertyUse.label}
                        label={propertyUse.label}
                        value={propertyUse.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                        isChecked={value === propertyUse.value}
                      />
                    );
                  })}
                </RadioWrap>
              )}
            />
            {renderErrorMessage('propertyUse')}

            <Body size="md" color="shade.700" align="left" mt="md" mb="xxs">
              Expected property value
            </Body>
            <Controller
              name="propertyValue"
              control={control}
              rules={{
                required: requiredErrMsg('propertyValue'),
                min: {
                  value: 1000,
                  message: minErrMsg,
                },
                max: {
                  value: 99999999,
                  message: maxErrMsg,
                },
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <NumberFormat
                  decimalScale={0}
                  thousandSeparator={true}
                  customInput={Input}
                  isFullWidth
                  isError={errors.propertyValue}
                  before={<DollarWithMargin color="primary.500" height="1.5rem" width="1.5rem" />}
                  aria-label="property-value-input"
                  onValueChange={(value) => onChange(value.floatValue)}
                  value={value}
                  onBlur={onBlur}
                />
              )}
            />
            {renderErrorMessage('propertyValue')}

            <Body size="md" color="shade.700" align="left" mt="md" mb="xxs">
              Estimated deposit
            </Body>
            <Controller
              name="estimatedDeposit"
              control={control}
              rules={{
                required: requiredErrMsg('estimatedDeposit'),
                min: {
                  value: 1000,
                  message: minErrMsg,
                },
                max: {
                  value: 99999999,
                  message: maxErrMsg,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <NumberFormat
                  decimalScale={0}
                  thousandSeparator={true}
                  customInput={Input}
                  isFullWidth
                  isError={errors.estimatedDeposit}
                  before={<DollarWithMargin color="primary.500" height="1.5rem" width="1.5rem" />}
                  aria-label="estimated-deposit-input"
                  onValueChange={(value) => onChange(value.floatValue)}
                  value={value}
                  onBlur={onBlur}
                />
              )}
            />
            {renderErrorMessage('estimatedDeposit')}

            <Body size="md" color="shade.700" align="left" mt="md">
              Current situation
            </Body>
            <Controller
              name="currentSituation"
              defaultValue="Neither"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioWrap>
                  {currentSituationOptions.map((situation) => {
                    const radioElm = (
                      <Radio
                        key={situation.label}
                        label={situation.label}
                        value={situation.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                        isChecked={value === situation.value}
                      />
                    );

                    if (situation.label === 'First home buyer') {
                      return (
                        <FlexWrap key={situation.label}>
                          {radioElm}
                          <Tooltip
                            content="The first home owner grant scheme was established to assist eligible first home owners to purchase a new home or build their home by offering a grant. Talk to one of our experts to find out more."
                            position="top"
                          >
                            <TooltipHelp color="secondary.500" height="20px" width="20px" />
                          </Tooltip>
                        </FlexWrap>
                      );
                    }
                    return radioElm;
                  })}
                </RadioWrap>
              )}
            />
            <Grid halign="center">
              <Grid.Unit size={{ xs: 1, md: 3 / 5 }}>
                <Button
                  mt="lg"
                  isDisabled={!isValid}
                  type="submit"
                  size="md"
                  variant="primary"
                  isFullWidth
                  aria-label="stamp-duty-next-button"
                >
                  NEXT
                </Button>
              </Grid.Unit>
            </Grid>
          </form>
        </Wrap>
      </Grid.Unit>
    </Grid>
  );
};

export default StampDutyQuestionContent;
