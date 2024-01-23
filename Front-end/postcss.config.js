module.exports = {
    map: {
        inline: true
    },
    plugins: [
        require('autoprefixer'),
        require('postcss-preset-env')({
            stage: 2
        }),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};