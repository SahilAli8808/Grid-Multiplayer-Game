import React from 'react';
import { Callout } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

const CalloutMessage = ({ message }) => (
  <Callout.Root>
    <Callout.Icon>
      <InfoCircledIcon />
    </Callout.Icon>
    <Callout.Text>{message}</Callout.Text>
  </Callout.Root>
);

export default CalloutMessage;
