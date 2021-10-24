import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/dist/client/router';
import React, { useMemo } from 'react';
import {
  RegularPostFragment,
  useVoteMutation,
  VotedPostFragmentDoc,
} from '../../graphql/generated/graphql';
import { User } from '../../store/user';

const Vote: React.FC<{
  post: RegularPostFragment;
  user: User | null | undefined;
}> = ({ post, user }) => {
  const router = useRouter();

  const voteByUser = (liked: boolean) => {
    return liked
      ? likes?.find((l) => l.user.username === user?.username)
      : deslikes?.find((l) => l.user.username === user?.username);
  };

  const likes = useMemo(() => {
    return post.votes?.filter((v) => v.liked === true);
  }, [post]);

  const deslikes = useMemo(() => {
    return post.votes?.filter((v) => v.liked === false);
  }, [post]);

  const [vote, { loading }] = useVoteMutation({
    update(proxy, { data }) {
      proxy.writeFragment({
        id: 'Post:' + post.id,
        fragment: VotedPostFragmentDoc,
        data: {
          votes: data?.vote,
        },
      });
    },
  });

  const handleVote = (liked: boolean) => {
    if (user) {
      vote({ variables: { liked, postId: post.id } });
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <button
        onClick={() => handleVote(true)}
        disabled={loading}
        className={`${voteByUser(true) ? 'voted' : ''} vote-button`}
      >
        <ThumbUpIcon />
        {likes ? likes.length : 0}
      </button>
      <button
        disabled={loading}
        onClick={() => handleVote(false)}
        className={`${voteByUser(false) ? 'voted' : ''} vote-button`}
      >
        <ThumbDownIcon />
        {deslikes ? deslikes.length : 0}
      </button>
    </>
  );
};

export default Vote;
