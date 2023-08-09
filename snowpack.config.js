module.exports = {
    mount: {
        src: "/",
        public: "/"
    },
    optimize: {
        bundle: true
    },
    plugins:
        [
            '@snowpack/plugin-sass'
           
        ]

}

// module.exports = {
//     plugins: [
//       [
//         '@snowpack/plugin-sass',
//         {
//           /* see options below */
//         },
//       ],
//     ],
//   };