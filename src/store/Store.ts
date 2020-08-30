import Store from 'electron-store';
import { JSONSchemaType } from 'json-schema-typed';

const schema = {
  sideBarWidth: {
    type: JSONSchemaType.Number,
    maximum: 350,
    minimum: 150,
    default: 200,
  },
  user: {
    type: JSONSchemaType.Object,
    default: {},
    properties: {
      id: {
        type: JSONSchemaType.String,
        default: '',
      },
      name: {
        type: JSONSchemaType.String,
        default: '',
      },
      email: {
        type: JSONSchemaType.String,
        default: '',
      },
    },
  },
};

const store = new Store({ schema, watch: true });
export default store;
