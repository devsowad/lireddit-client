import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import {
  PostsDocument,
  RegularPostFragment,
  useVoteMutation,
} from '../../graphql/generated/graphql';
import { useUserState } from '../../store/user';

const Vote: React.FC<{ post: RegularPostFragment }> = ({ post }) => {
  const [user] = useUserState();
  const [isLiked, setIsLiked] = useState(false);
  const voteByUser = (type: 'likes' | 'deslikes') => {
    return post[type].find((l) => l.author.username === user?.username);
  };

  const [vote, { loading }] = useVoteMutation({
    //   liked => post->id === id
    update(proxy, { data }) {
      console.log(proxy.readQuery({ query: PostsDocument }));
      //   const cachedPost = proxy.readQuery({ query: PostsDocument }) as {
      //     posts: RegularPostFragment[];
      //   } | null;
      //   const likedPost = cachedPost?.posts.find((p) => p.id === post.id);
      //   console.log(cachedPost);
    },
  });

  return (
    <>
      <button
        onClick={() => {
          //   setIsLiked(true);
          vote({ variables: { liked: true, postId: post.id } });
        }}
        disabled={loading}
        className={`${voteByUser('likes') ? 'voted' : ''} vote-button`}
      >
        <ThumbUpIcon />
        {post.likes.length}
      </button>
      <button
        disabled={loading}
        onClick={() => {
          //   setIsLiked(false);
          vote({ variables: { liked: false, postId: post.id } });
        }}
        className={`${voteByUser('deslikes') ? 'voted' : ''} vote-button`}
      >
        <ThumbDownIcon />
        {post.deslikes.length}
      </button>
    </>
  );
};

export default Vote;
