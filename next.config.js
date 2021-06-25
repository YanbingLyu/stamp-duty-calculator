module.exports = {
  reactStrictMode: true,
  // webpack5: false,
  // webpack: (config, options) => {
  //   console.log('options', options)

  //   if (options.isServer) {
  //     // bundle LUI packages into the server bundle created with webpack, so that images and any other assets
  //     // are transpiled by webpack and not require()'d nodejs which can't load for non-js/json files
  //     config.externals = config.externals.map((external) => {
  //       if (typeof external === 'function') {
  //         return (context, request, callback) => {
  //           if (/^@lendi(-ui)?\//.test(request)) {
  //             callback();
  //           } else {
  //             external(context, request, callback);
  //           }
  //         };
  //       } else {
  //         return external;
  //       }
  //     });
  //   }
  //   return config;
  // },
};
