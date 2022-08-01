import * as React from "react";
import styled from "styled-components";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ButtonBlock} from './styled'
import { Logo, Input} from './index'

const SignInButton = styled(ButtonBlock)`
  padding: 0.7rem 0;
`;

const MemberButton = styled.button`
  text-decoration: none;
  background: transparent;
  border: transparent;
  color: var(--primary-500);
  cursor: pointer;
  letter-spacing: var(--letterSpacing);
`;

const Wrapper = styled(Form)`
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: var(--borderRadius);
  border-top: 5px solid var(--primary-500);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  min-width: 320px;
  max-height: 600px;

`;

interface Values {
  name: string;
  email: string;
  password: string;
}

export interface RegisterFormProps {
  isMember: boolean;
  toggleIsMember: () => void;
  onSubmit: (values: Values) => void;
}


export const RegisterForm = ({ isMember = false, onSubmit, toggleIsMember }: RegisterFormProps) => {

  const handleSubmit = async (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    setSubmitting(true);
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={Yup.object({
        isMember: Yup.boolean().default(isMember),
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Please provide a valid email").required("Email is required"),
        password: Yup.string().when("isMember", {
          is: false,
          then: Yup.string().required("Password is required")
        })
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Wrapper>
          <Logo />
          <h3>{isMember ? "Login" : "Register"}</h3>
          <Input label="Name" type="text" name="name" />
          <Input label="Email" type="text" name="email" />
          {!isMember &&
            <Input label="Password" type="password" name="password" />}
          <SignInButton type="submit" disabled={isSubmitting}>
            Submit
          </SignInButton>
          <p>{isMember ? "Don't have an account?" : "Already a member?"} <MemberButton type="button"
              className="member-btn"
              onClick={toggleIsMember}
          >
            {isMember ? "Register" : "Login"}
          </MemberButton></p>
        </Wrapper>
      )}
    </Formik>
  );
};
