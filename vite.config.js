import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '@solana-mobile': false, // Temporarily disable @solana-mobile
        },
    },
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
});
