import { createElement } from 'react';
import { Editor, NodeProvider } from '@craftjs/core';
import _ from 'lodash';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Body } from 'components/editor/selectors/body';
import {
  LogoCloudOne,
  LogoCloudTwo,
  LogoCloudThree,
} from 'components/editor/selectors/logo';
import { StepOne, StepTwo } from 'components/editor/selectors/step';
import { ContentOne, ContentTwo } from 'components/editor/selectors/content';
import {
  TitleOne,
  TitleTwo,
  TitleThree,
  TitleFour,
} from 'components/editor/selectors/titles';
import {
  TestimonialOne,
  TestimonialTwo,
} from 'components/editor/selectors/testimonial';
import { LinkOne, LinkTwo } from 'components/editor/selectors/link';
import { HeroOne, HeroTwo } from 'components/editor/selectors/hero';
import { DividerOne } from 'components/editor/selectors/divider';

const queryClient = new QueryClient();

const RESOLVERS = {
  Body,
  LogoCloudOne,
  LogoCloudTwo,
  LogoCloudThree,
  ContentOne,
  ContentTwo,
  StepOne,
  StepTwo,
  TitleOne,
  TitleTwo,
  TitleThree,
  TitleFour,
  TestimonialOne,
  TestimonialTwo,
  HeroOne,
  HeroTwo,
  LinkOne,
  LinkTwo,
  DividerOne,
};

export const deserializeNodes = (nodes, id = 'ROOT', sorted = []) => {
  const node = nodes[id];

  if (!node) {
    throw new Error(`Could not find node ${id}`);
  }

  sorted.push({ id, ...node });

  _.each(node.nodes, (n) => {
    sorted.push(...deserializeNodes(nodes, n));
  });

  return sorted;
};

export const getNodeById = (nodes, id) => {
  return _.find(nodes, (node) => node.id === id);
};

export const getDescendants = (nodes, id, deep = false, includeOnly) => {
  function appendChildNode(id, descendants = [], depth = 0) {
    if (deep || (!deep && depth === 0)) {
      const node = getNodeById(nodes, id);

      if (!node) {
        return descendants;
      }

      if (includeOnly !== 'childNodes') {
        // Include linkedNodes if any
        const linkedNodes = node.linkedNodes;

        _.each(linkedNodes, (nodeId) => {
          descendants.push(nodeId);
          descendants = appendChildNode(nodeId, descendants, depth + 1);
        });
      }

      if (includeOnly !== 'linkedNodes') {
        const childNodes = node.nodes;

        _.each(childNodes, (nodeId) => {
          descendants.push(nodeId);
          descendants = appendChildNode(nodeId, descendants, depth + 1);
        });
      }

      return descendants;
    }
    return descendants;
  }
  return _.compact(
    _.map(appendChildNode(id), (nid) => getNodeById(nodes, nid))
  );
};

export const renderNode = (nodes, resolver, nodeId) => {
  const node = getNodeById(nodes, nodeId);

  if (!node) {
    throw new Error(`Could not find node with id ${nodeId}`);
  }

  const resolvedComponent = _.get(resolver, node.type.resolvedName);
  const descendants = getDescendants(nodes, nodeId);
  const children = _.map(descendants, (descendant) =>
    renderNode(nodes, resolver, descendant.id)
  );

  return (
    <NodeProvider key={node.id} id={node.id}>
      {createElement(
        resolvedComponent,
        { ...node.props, isSSR: true },
        children
      )}
    </NodeProvider>
  );
};

export const renderNodesToJSX = (
  nodes,
  resolver = RESOLVERS,
  nodeId = 'ROOT'
) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Editor enabled={false} resolver={{ resolver }}>
        {renderNode(nodes, resolver, nodeId)}
      </Editor>
    </QueryClientProvider>
  );
};
