import React from 'react';
import { Form, Field } from '@8base-react/forms';
import { Dialog, Grid, Button, SelectField, ModalContext, InputField, DateInputField} from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const CLIENT_CREATE_DIALOG_ID = 'CLIENT_CREATE_DIALOG_ID';

class ClientCreateDialog extends React.Component {
  static contextType = ModalContext;

  onSubmit = async data => {
    await this.props.clientCreate({ variables: { data } });

    this.context.closeModal(CLIENT_CREATE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(CLIENT_CREATE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="New Client" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Field name="firstName" label="First Name" type="text" placeholder="John" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="lastName" label="Last Name" type="text" placeholder="Doe" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            {/*TODO add validation*/}
            <Field name="email" label="Email" type="text" placeholder="user@example.com" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            {/*TODO add validation*/}
            <Field name="phone" label="Phone" type="text" placeholder="+1 (408) 555-7777" component={InputField} />
          </Grid.Box>
          <Grid.Box>
            <Field name="birthday" label="Birthday" component={DateInputField} />
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" loading={submitting}>
          Save
        </Button>
      </Dialog.Footer>
    </form>
  );

  render() {
    return (
      <Dialog id={CLIENT_CREATE_DIALOG_ID} size="sm">
        <Form type="CREATE" tableSchemaName="Clients" onSubmit={this.onSubmit}>
          {this.renderFormContent}
        </Form>
      </Dialog>
    );
  }
}

ClientCreateDialog = graphql(sharedGraphQL.CLIENT_CREATE_MUTATION, {
  name: 'clientCreate',
  options: {
    refetchQueries: ['ClientsList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Client successfuly created',
    },
  },
})(ClientCreateDialog);

ClientCreateDialog.id = CLIENT_CREATE_DIALOG_ID;

export { ClientCreateDialog };
