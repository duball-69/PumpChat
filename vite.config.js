import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString();
                    }
                },
            },
        },
    },
    resolve: {
        alias: {
            '@solana-mobile/mobile-adapter': './empty-module.js', // Redirect to an empty module
        },
    },
});
