import { ApolloCache } from '@apollo/client';
import { MeDocument, MeQuery } from '../../generated/graphql';

type DataType = {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

type UpdateMeType = {
  proxy: ApolloCache<any>;
  data: DataType | null | undefined;
};

export const updateMe = ({ data, proxy }: UpdateMeType) => {
  const me: MeQuery = {
    me: {
      id: data?.id!,
      username: data?.username!,
      email: data?.email!,
      __typename: 'User',
    },
  };
  proxy.writeQuery({ query: MeDocument, data: data ? me : { me: null } });
};
