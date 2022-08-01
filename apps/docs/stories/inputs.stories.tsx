import * as React from "react";
import withFormik from "@bbbtech/storybook-formik";
import * as Yup from "yup";
import { useField } from "formik";
import { Input} from 'ui'

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .max(128)
    .required(
      "Field may not be less than 2 letters or include numeric values/symbols."
    ),
  email: Yup.string()
    .required('Must include the "@" symbol and valid domain (e.g. .com, .net).')
    .email('Must include the "@" symbol and valid domain (e.g. .com, .net).'),
  password: Yup.string()
    .required('Must include the "@" symbol and valid domain (e.g. .com, .net).')
    .email('Must include the "@" symbol and valid domain (e.g. .com, .net).'),
});

const PersonalInfoSubform = () => {
  const [firstNameField] = useField("name");
  const [emailField] = useField("email");
  const [passwordField] = useField('password')
  return (
    <>
      <Input
        label={'Name'} type={'text'} {...firstNameField}      />
      <Input
        type={"email"}
        label='Email'
        {...emailField}
      />
      <Input
        type={"password"}
        label='Password'
        {...passwordField}
      />
    </>
  );
};
export default {
  title: "Form/TextInputs",
  component: PersonalInfoSubform,
  decorators: [withFormik],
  parameters: {
    formik: {
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: FormSchema,
      onSubmit: (v) => console.log("I want to log these... ", v),
    },
  },
};

// const Template = (args) => <PersonalInfoSubform {...args} />;
// export const Default = Template.bind({});