import React from 'react';
import { compose } from 'recompose';
import { Table, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

let ProductsTable = ({ products, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(4, 1fr) 60px">
      <Table.HeaderCell>Pictures</Table.HeaderCell>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell>Description</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body
      loading={products.loading}
      data={products}
    >
      {product => (
        <Table.BodyRow columns="repeat(4, 1fr) 60px" key={product.id}>
          <Table.BodyCell>
            <img src={product.picture.downloadUrl} alt="" style={{ width: '5rem', height: '5rem' }} />
          </Table.BodyCell>
          <Table.BodyCell>{product.name}</Table.BodyCell>
          <Table.BodyCell>{product.price}</Table.BodyCell>
          <Table.BodyCell>{product.description}</Table.BodyCell>
        </Table.BodyRow>
      )}
    </Table.Body>
  </Table>
);

ProductsTable = compose(
  withModal,
  graphql(sharedGraphQL.PRODUCTS_LIST_QUERY, {
    props: ({ data: { productsList: { items } = {} } }) => {
      return {
        products: items || [],
      };
    },
  })
)(ProductsTable);

export { ProductsTable };
