import gql from 'graphql-tag';

export const CLIENT_CREATE_MUTATION = gql`
  mutation ClientCreate($data: ClientCreateInput!) {
    clientCreate(data: $data) {
      id
    }
  }
`;

export const CLIENT_UPDATE_MUTATION = gql`
  mutation ClientUpdate($data: ClientUpdateInput!) {
    clientUpdate(data: $data) {
      id
    }
  }
`;

export const CLIENT_DELETE_MUTATION = gql`
  mutation ClientDelete($id: ID!) {
    clientDelete(data: { id: $id }) {
      success
    }
  }
`;

export const CLIENT_QUERY = gql`
  query Client($id: ID!) {
    client(id: $id) {
      id
      email
      firstName
      lastName
      phone
      birthday
      orders {
        items {
          id
          address
          deliveryDt
          comment
          status
          orderItems {
            items {
              product {
                name
              }
              quantity
            }
          }
        }
      }
    }
  }
`;

export const CLIENTS_LIST_QUERY = gql`
  query ClientsList {
    clientsList {
      items {
        id
        email
        firstName
        lastName
        phone
        birthday
        orders {
          count
        }
      }
    }
  }
`;

export const ORDER_ITEM_CREATE_MUTATION = gql`
  mutation OrderItemCreate($data: OrderItemCreateInput!) {
    orderItemCreate(data: $data) {
      id
    }
  }
`;

export const ORDER_CREATE_MUTATION = gql`
  mutation OrderCreate($data: OrderCreateInput!) {
    orderCreate(data: $data) {
      id
    }
  }
`;

export const ORDER_UPDATE_MUTATION = gql`
  mutation OrderUpdate($data: OrderUpdateInput!) {
    orderUpdate(data: $data) {
      id
    }
  }
`;

export const ORDER_DELETE_MUTATION = gql`
  mutation OrderDelete($id: ID!) {
    orderDelete(data: { id: $id }) {
      success
    }
  }
`;

export const ORDER_QUERY = gql`
  query Order($id: ID!) {
    order(id: $id) {
      id
      client {
        id
        firstName
        lastName
      }
      address
      deliveryDt
      comment
      status
      orderItems {
        items {
          product {
            name
          }
          quantity
        }
      }
    }
  }
`;

export const ORDERS_LIST_QUERY = gql`
  query OrdersList($orderBy: [OrderOrderBy], $skip: Int, $first: Int) {
    ordersList(orderBy: $orderBy, skip: $skip, first: $first) {
      items {
        id
        client {
          firstName
          lastName
        }
        address
        deliveryDt
        comment
        status
        orderItems {
          items {
            product {
              name
            }
            quantity
          }
        }
      }
    }
  }
`;

export const PRODUCT_DELETE_MUTATION = gql`
  mutation ProductDelete($id: ID!) {
    productDelete(data: { id: $id }) {
      success
    }
  }
`;

export const PRODUCT_CREATE_MUTATION = gql`
  mutation ProductCreate($data: ProductCreateInput!) {
    productCreate(data: $data) {
      id
    }
  }
`;

export const PRODUCT_UPDATE_MUTATION = gql`
  mutation ProductUpdate($data: ProductUpdateInput!) {
    productUpdate(data: $data) {
      id
    }
  }
`;

export const PRODUCTS_LIST_QUERY = gql`
  query ProductsList {
    productsList {
      items {
        id
        picture {
          downloadUrl
        }
        name
        price
        description
      }
    }
  }
`;

export const USER_QUERY = gql`
  query User {
    user {
      email
      firstName
      id
      lastName
      avatar {
        id
        downloadUrl
      }
    }
  }
`;

export const USER_SIGNUP_MUTATIONS = gql`
  mutation UserSignup($authProfileId: ID, $user: UserCreateInput!) {
    userSignUpWithToken(authProfileId: $authProfileId, user: $user) {
      email
      firstName
      id
      lastName
      avatar {
        id
        downloadUrl
      }
    }
  }
`;
