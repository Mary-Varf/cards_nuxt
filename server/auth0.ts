import { Auth0Client } from "@auth0/auth0-spa-js";

const auth0 = () => {
    const config = useRuntimeConfig();

    return new Auth0Client({
        domain: config.public.AUTH0_DOMAIN,
        clientId: config.public.AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: config.public.AUTH0_CALLBACK_URL,
        }
    })
}

export default auth0;