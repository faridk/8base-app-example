import React from 'react';
import * as R from 'ramda';
import { Form, Field } from '@8base-react/forms';
import { Dialog, Grid, Button, InputField, SelectField, DateInputField, ModalContext } from '@8base/boost';
import { Query, graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';


let productFieldCount = 1;
const getProductOptions = (product = []) =>
  product.map(product => ({
    value: product.id, // GQL Query field
    label: `${R.propOr('Unititled', 'name', product)} ${R.propOr('Unititled', 'price', product)}$`,
  }));

const getClientOptions = (clients = []) =>
  clients.map(client => ({
    value: client.id, // GQL Query field
    label: `${R.propOr('Unititled', 'firstName', client)} ${R.propOr('Unititled', 'lastName', client)}`,
  }));

const ORDER_CREATE_DIALOG_ID = 'ORDER_CREATE_DIALOG_ID';

class OrderCreateDialog extends React.Component {
  static contextType = ModalContext;

  onSubmit = async data => {
    const incompleteData = data;
    // let response.data.orderCreate.id


    data = {
      product: {
        connect: {
          id: 'ckiktd1ot00fg07jwe8bidrhr',
        },
      },
      quantity: 9,
    };

    const orderItem = await this.props.orderItemCreate({ variables: { data } });
    const connectId = orderItem.data.orderItemCreate.id;

    data = {
      orderItems: {
        connect: {
          id: connectId,
        },
      },
      ...incompleteData,
    };
    const order = await this.props.orderCreate({ variables: { data } })
    console.log(data);
    console.log("Order:", order);

    this.context.closeModal(ORDER_CREATE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(ORDER_CREATE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="New Order" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Query query={sharedGraphQL.PRODUCTS_LIST_QUERY}>
              {({ data, loading }) => {
                let fields = [];
                for (let i = 0; i < productFieldCount; i++) {
                  fields.push(
                    <Field
                      name={`product${i}`}
                      label={`Product ${i + 1}`}
                      placeholder="Select a product"
                      component={SelectField}
                      loading={loading}
                      options={loading ? [] : getProductOptions(data.productsList.items)}
                      onChange={(inputText, e) => {
                        console.log(inputText, e);
                      }}
                      onInputChange={(inputText, e) => {
                        if (e.action === 'set-value') {
                          productFieldCount++;
                        }
                      }}
                      stretch
                    />

                  );
                }
                return fields;
              }}
            </Query>
          </Grid.Box>
          <Query query={sharedGraphQL.CLIENTS_LIST_QUERY}>
            {({ data, loading }) => (
              <React.Fragment>
                <Grid.Box>
                  <Field
                    name="client"
                    label="Client"
                    placeholder="Select a client"
                    component={SelectField}
                    loading={loading}
                    options={loading ? [] : getClientOptions(data.clientsList.items)}
                    stretch
                  />
                </Grid.Box>
              </React.Fragment>
            )}
          </Query>
          <Grid.Box>
            <Field
              name="status"
              label="Status"
              placeholder="Select a status"
              component={SelectField}
              options={[
                { label: 'Opened', value: 'Opened' },
                { label: 'Closed', value: 'Closed' },
              ]}
              stretch
            />
          </Grid.Box>
          <Grid.Box>
            <Field name="address" label="Address" type="text" placeholder="Address" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="deliveryDt" label="Delivery Date & Time" component={DateInputField} withTime />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" loading={submitting}>
          Create Order
        </Button>
      </Dialog.Footer>
    </form>
  );

  render() {
    return (
      <Dialog id={ORDER_CREATE_DIALOG_ID} size="sm">
        <Form type="CREATE" tableSchemaName="Orders" onSubmit={this.onSubmit}>
          {this.renderFormContent}
        </Form>
      </Dialog>
    );
  }
}

OrderCreateDialog = compose(
  graphql(sharedGraphQL.ORDER_CREATE_MUTATION, {
    name: 'orderCreate',
    options: {
      refetchQueries: ['OrdersList'],
      context: {
        [TOAST_SUCCESS_MESSAGE]: 'Order successfully created',
      },
    },
  }),
  graphql(sharedGraphQL.ORDER_ITEM_CREATE_MUTATION, {
    name: 'orderItemCreate',
    options: {
      refetchQueries: [],
      context: {
        [TOAST_SUCCESS_MESSAGE]: 'Order successfully created',
      },
    },
  }),
)(OrderCreateDialog);

OrderCreateDialog.id = ORDER_CREATE_DIALOG_ID;

export { OrderCreateDialog };
