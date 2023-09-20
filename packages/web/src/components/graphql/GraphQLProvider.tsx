'use client';

import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { ApolloProvider } from '@apollo/client';

// GraphQL
import { client } from '@/graphql';

export interface IGraphQLProviderProps {
  children: ReactNode;
}

const GraphQLProvider: FC<IGraphQLProviderProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default memo(GraphQLProvider);
