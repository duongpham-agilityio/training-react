import { useCallback } from 'react';
import { Meta, Story } from '@storybook/react';

// Components
import Form, { FormProps } from 'components/Form';

// Hooks
import { FormData } from 'hooks';

export const Template: Story<FormProps> = () => {
  const onSubmit = useCallback(async (book: FormData) => {
    Promise.resolve(book);
  }, []);

  return (
    <Form
      value={{
        author: 'John',
        name: 'HTML/CSS',
        description: 'HTML/CSS with styles',
        imageURL: '',
        publishDate: new Date().getTime(),
      }}
      onSubmit={onSubmit}
    />
  );
};

export default {
  title: 'Practice/components/Form',
  component: Form,
} as Meta;
