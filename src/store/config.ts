import Store from 'electron-store';
import { JSONSchemaType } from 'json-schema-typed';

const schema = {
  sideBarWidth: {
    type: JSONSchemaType.Number,
    maximum: 350,
    minimum: 150,
    default: 200,
  },
  showLoginDialog: {
    type: JSONSchemaType.Boolean,
    default: false,
  },
  searchText: {
    type: JSONSchemaType.String,
    default: '',
  },
  saveRequest: {
    type: JSONSchemaType.Object,
    default: {},
    properties: {
      id: {
        type: JSONSchemaType.Boolean,
        default: false,
      },
      lastSave: {
        type: JSONSchemaType.String,
        default: new Date().toLocaleTimeString('pt-BR'),
      },
      deletedNotes: {
        type: JSONSchemaType.Array,
        default: [],
      },
    },
  },
  selected: {
    type: JSONSchemaType.Object,
    default: {},
    properties: {
      id: {
        type: JSONSchemaType.String,
        default: '',
      },
      title: {
        type: JSONSchemaType.String,
        default: '',
      },
      description: {
        type: JSONSchemaType.String,
        default: '',
      },
      created_at: {
        type: JSONSchemaType.String,
        default: '',
      },
      updated_at: {
        type: JSONSchemaType.String,
        default: '',
      },
      toDos: {
        type: JSONSchemaType.Array,
        default: [],
        items: {
          properties: {
            id: {
              type: JSONSchemaType.String,
              default: '',
            },
            label: {
              type: JSONSchemaType.String,
              default: '',
            },
            checked: {
              type: JSONSchemaType.Boolean,
              default: false,
            },
          },
        },
      },
    },
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
  notes: {
    type: JSONSchemaType.Array,
    default: [],
    items: {
      properties: {
        id: {
          type: JSONSchemaType.String,
          default: '',
        },
        title: {
          type: JSONSchemaType.String,
          default: '',
        },
        description: {
          type: JSONSchemaType.String,
          default: '',
        },
        created_at: {
          type: JSONSchemaType.String,
          default: '',
        },
        updated_at: {
          type: JSONSchemaType.String,
          default: '',
        },
        toDos: {
          type: JSONSchemaType.Array,
          default: [],
          items: {
            properties: {
              id: {
                type: JSONSchemaType.String,
                default: '',
              },
              label: {
                type: JSONSchemaType.String,
                default: '',
              },
              checked: {
                type: JSONSchemaType.Boolean,
                default: false,
              },
            },
          },
        },
      },
    },
  },
};

const store = new Store({ schema, watch: true });
export default store;
