import { JsonServiceClient } from '@servicestack/client';
import Vue from 'vue';

export var client = new JsonServiceClient('/');

export {
    errorResponse, errorResponseExcept, splitOnFirst, toPascalCase
} from '@servicestack/client';

export {
    ResponseStatus, ResponseError,
    Authenticate, AuthenticateResponse,
    Register,
    Hello, HelloResponse,
} from './dtos';

import {
    ResponseStatus, ResponseError,
    Authenticate, AuthenticateResponse,
} from './dtos';


// Shared state between all Components
interface Store {
    isAuthenticated: boolean;
    userSession: AuthenticateResponse | null;
}
export const store:Store = {
    isAuthenticated: false,
    userSession: null,
};

class EventBus extends Vue {
    store = store
}
export var bus = new EventBus({ data: store });

bus.$on('signout', async () => {
    
    bus.$set(store, 'isAuthenticated', false);
    bus.$set(store, 'userSession', null);

    await client.post(new Authenticate({ provider: "logout" }));
})

bus.$on('signin', (userSession:AuthenticateResponse) => {
    bus.$set(store, 'isAuthenticated', true);
    bus.$set(store, 'userSession', userSession);
})

export const checkAuth = async () => {
    try {
        bus.$emit('signin', await client.post(new Authenticate()));
    } catch (e) {
        bus.$emit('signout');
    }
}
