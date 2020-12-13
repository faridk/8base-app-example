import React from 'react';
import * as R from 'ramda';
import { Query } from 'react-apollo';
import { useState } from 'react';

import * as sharedGraphQL from 'shared/graphql';

let OrderProfile = () => {
  const [id, setId] = useState(
    window.location
      .toString()
      .split('/')
      .pop()
  );
  return (
    <div>
      <h1>Profile</h1>
      <Query query={sharedGraphQL.ORDER_QUERY} variables={{ id: id }}>
        {({ data, loading }) => {
          if (loading) {
            return (<h1>Loading...</h1>)
          }
          console.log(data.client.orders.items.length);
          return (
            <div>
              <p>Name: {R.pathOr('N/A', ['client', 'firstName'], data) +
              ' ' + R.pathOr('N/A', ['client', 'lastName'], data)}</p>
              <p>Email: {R.pathOr('N/A', ['client', 'email'], data)}</p>
              <p>Phone: {R.pathOr('N/A', ['client', 'phone'], data)}</p>
              <p>Birthday: {R.pathOr('N/A', ['client', 'birthday'], data)}</p>
              <br/>

              {data.client.orders.items.map(order =>
                <div>
                  <h2>Order</h2>
                  <p>Address: {order.address}</p>
                  <p>Delivery Date & Time: {order.deliveryDt}</p>
                  <p>Comment: {order.comment}</p>
                  <p>Status: {order.status}</p>
                  {order.orderItems.items.map(item =>
                    <div>
                      <p>Product: {item.product.name} x{item.quantity}</p>
                    </div>
                  )}
                  <br/>
                </div>
              )}
            </div>
          )}
        }
      </Query>
    </div>
  );
}

export { OrderProfile };
