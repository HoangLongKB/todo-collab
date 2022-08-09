import { Rule } from "antd/lib/form";

/* eslint-disable no-template-curly-in-string */
export const EMAIL_VALIDATE: Rule[] = [
  {
    type: 'email',
    message: '${label} is not a valid email!'
  },
  {
    required: true,
    message: 'Please input your ${label}'
  },
  {
    whitespace: true,
    message: '${label} cannot be empty'
  }
];

export const NAME_VALIDATE: Rule[] = [
  {
    required: true,
    message: 'Please input your ${label}'
  },
  {
    min: 6,
    message: '${label} must be at least 6 characters'
  },
  {
    whitespace: true,
    message: '${label} cannot be empty'
  }
];

export const PASSWORD_VALIDATE = [
  {
    required: true,
    message: 'Please input your ${label}'
  },
  {
    min: 6,
    message: '${label} must be at least 6 characters'
  },
  {
    whitespace: true,
    message: '${label} cannot be empty'
  }
];

export const CONFIRM_PASSWORD_VALIDATE = [
  {
    required: true,
    message: 'Please input your ${label}'
  },
  {
    min: 6,
    message: '${label} must be at least 6 characters'
  },
  {
    whitespace: true,
    message: '${label} cannot be empty'
  },
  ({ getFieldValue }: {getFieldValue: Function}) => ({
    validator(_: any, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords that you entered do not match!'));
    },
  }),
];