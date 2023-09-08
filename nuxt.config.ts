export default defineNuxtConfig({  modules: [
        '@pinia/nuxt',
    ],
    app: {
        head: {
            title: "Nuxt",
            meta: [
                {charset: "utf-8"},
                {name: "viewport", content: "width=device-width, initial-scale=1"},
                {
                    hid: "description",
                    name: "description",
                    content: "Nuxt"
                }
            ],
            link: [
                {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
                {rel: "stylesheet", href: "/css/bootstrap.min.css"},
                {rel: "stylesheet", href: "/css/style.css"},
            ]
        }
    },
    runtimeConfig: {
        public: {
            mongodbUri: process.env.MANGO_URI,
            AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
            AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
            AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
            TRANSLATE_KEY: process.env.TRANSLATE_KEY,
            UNSPLASH_KEY: process.env.UNSPLASH_KEY,
            PIXABAY_KEY: process.env.PIXABAY_KEY,
        }
    },
    auth: {
        cookie: {
            prefix: 'auth.',
            options: {
                path: '/'
            }
        }
    },
    router: {
        base: '/'
    },
    pinia: {
        autoImports: [
            'defineStore',
            ['defineStore', 'definePiniaStore'],
        ],
    },
    imports: {
        dirs: ['stores'],
    },
    nitro: {
        plugins: ["~/server/index.ts"],
    },
})
