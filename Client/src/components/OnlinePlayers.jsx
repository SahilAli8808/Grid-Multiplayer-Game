import React from 'react';
import { Text, Badge } from '@radix-ui/themes';
import { HiUsers } from 'react-icons/hi2';

const OnlinePlayers = ({ count }) => (
  <Text className="font-medium mb-4 mt-2">
    <HiUsers className="inline" /> Online: <Badge color="green">{count} Players</Badge>
  </Text>
);

export default OnlinePlayers;
