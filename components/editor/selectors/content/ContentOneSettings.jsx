import { useNode } from '@craftjs/core';
import short from 'short-uuid';

import {
  ToolbarSection,
  ToolbarGroup,
  ToolbarItem,
} from 'components/editor/visual/toolbar';
import { Button } from 'components/button';

export const ContentOneSettings = () => {
  const {
    nodePosts,
    actions: { setProp },
  } = useNode((node) => ({
    nodePosts: node.data.props.posts,
  }));

  const handleRemovePost = (arrayId) => {
    setProp((props) => {
      props.posts = nodePosts.filter((post) => post.arrayId !== arrayId);
    }, 500);
  };

  const handleAddPost = () => {
    let uid = short.generate();

    const newPost = {
      arrayId: uid,
      id: `demo-${uid}`,
      title: '4 Simple Tips for Leveraging the Power of Social Media',
      categoryInfo: [{ title: 'Resource' }],
      feature: 'https://dummyimage.com/672x512/f3f4f6/1f2937.jpg',
      url: 'https://leappage.com',
    };

    setProp((props) => {
      props.posts = [...props.posts, newPost];
    }, 500);
  };

  return (
    <>
      <div className='space-y-2'>
        <ToolbarSection title='Text' props={['title']}>
          <ToolbarGroup full={true}>
            <ToolbarItem propKey='title' type='text' label='Title' />
          </ToolbarGroup>
        </ToolbarSection>
        <ToolbarSection title='CTA' props={['ctaText']}>
          <ToolbarGroup full={true}>
            <ToolbarItem propKey='ctaText' type='text' label='Text' />
            <ToolbarItem propKey='ctaLink' type='text' label='Link' />
          </ToolbarGroup>
        </ToolbarSection>
        <ToolbarSection title='Content' props={['posts']}>
          {nodePosts.map((nodePost, i) => (
            <ToolbarGroup key={nodePost.arrayId} full={true}>
              <ToolbarItem
                isGroup={true}
                groupName='posts'
                groupIndex={i}
                type='content'
                content={nodePost}
              />
              {nodePosts.length > 1 && (
                <Button
                  size='sm'
                  variant='ghost'
                  customClassName='justify-center'
                  text='Remove'
                  onClick={() => handleRemovePost(nodePost.arrayId)}
                />
              )}
            </ToolbarGroup>
          ))}
          <Button
            size='sm'
            variant='ghost'
            customClassName='justify-center w-full mt-2 mb-1'
            text='Add'
            onClick={() => handleAddPost()}
          />
        </ToolbarSection>
      </div>
    </>
  );
};
