import React, { FC } from 'react';

interface Form {
  name: string;
  tel: string;
  city: string;
  state: string;
  address: string;
  zip: string;
}
const defaultForm: Form = {
  name: '',
  tel: '',
  city: '',
  state: '',
  address: '',
  zip: '',
};

const FormContext = React.createContext<{
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}>({
  form: defaultForm,
  setForm: () => {},
});
const FormContextProvider: FC = (props) => {
  const [form, setForm] = React.useState<Form>(defaultForm);
  return (
    <FormContext.Provider value={{ form, setForm }}>
      {props.children}
    </FormContext.Provider>
  );
};

export { FormContextProvider, FormContext };
