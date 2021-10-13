import React from 'react';

type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  return <div>{children}</div>;
}
