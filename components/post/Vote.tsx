import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import React from 'react';
import {
  RegularPostFragment,
  useVoteMutation,
  VotedPostFragmentDoc,
} from '../../graphql/generated/graphql';
import { User, useUserState } from '../../store/user';

const Vote: React.FC<{
  post: RegularPostFragment;
  user: User | null | undefined;
}> = ({ post, user }) => {
  const voteByUser = (type: 'likes' | 'deslikes') => {
    return post[type].find((l) => l.author.username === user?.username);
  };

  const [vote, { loading }] = useVoteMutation({
    update(proxy, { data }) {
      proxy.writeFragment({
        id: 'Post:' + post.id,
        fragment: VotedPostFragmentDoc,
        data: {
          likes: data?.vote.likes,
          deslikes: data?.vote.deslikes,
        },
      });
    },
  });

  return (
    <>
      <button
        onClick={() => vote({ variables: { liked: true, postId: post.id } })}
        disabled={loading}
        className={`${voteByUser('likes') ? 'voted' : ''} vote-button`}
      >
        <ThumbUpIcon />
        {post.likes.length}
      </button>
      <button
        disabled={loading}
        onClick={() => vote({ variables: { liked: false, postId: post.id } })}
        className={`${voteByUser('deslikes') ? 'voted' : ''} vote-button`}
      >
        <ThumbDownIcon />
        {post.deslikes.length}
      </button>
    </>
  );
};

export default Vote;
