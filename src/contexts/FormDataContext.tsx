import React, { useState, createContext } from 'react';

export type FormDataContextType = {
  formData: FormData;
  submitData: (newData: FormData) => void;
};

export interface FormData {
  propertyType?: string;
  state?: string;
  propertyUse?: string;
  propertyValue?: number;
  estimatedDeposit?: number;
  currentSituation?: string;
}

export const FormDataContext = createContext<FormDataContextType>({} as FormDataContextType);

export const FormDataContextProvider: React.FC = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({});

  const submitData = (newData: FormData): void => {
    setFormData((prevData) => ({ ...prevData, newData }));
  };

  return (
    <FormDataContext.Provider
      value={{
        formData,
        submitData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
