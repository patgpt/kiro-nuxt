import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    ssr: true,
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
    },

    typescript: {
        typeCheck: true,
    },

    css: ['~/assets/css/app.css'],

    vite: {
        plugins: [tailwindcss()],
    },

    content: {
        watch: {
            enabled: true,
            port: 4000,
            showURL: false,
        },

        // // Aliases will be used to replace markdown components and render custom components instead of default ones.
        // renderer: {
        //   alias: {}
        // },

        build: {
            markdown: {
                remarkPlugins: {},
                rehypePlugins: {},
                toc: {
                    depth: 3, // include h3 headings
                },
            },
        },
    },
    modules: [
        '@nuxt/content',
        '@nuxt/image',
        '@nuxt/scripts',
        '@nuxt/test-utils',
        '@nuxt/ui',
        '@nuxt/eslint',
        '@pinia/nuxt',
 
    ],
})
