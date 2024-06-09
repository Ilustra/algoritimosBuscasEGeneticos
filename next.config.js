const { version } = require('./package.json');

module.exports = (phase) => {

  return {
    reactStrictMode: true,
    publicRuntimeConfig: {
      version: version,
      appTitle: process.env.APP_TITLE?process.env.APP_TITLE:"App",
      logo: process.env.LOGO_CLIENTE?process.env.LOGO_CLIENTE:"",
      proxyPrefix:process.env.API_SERVER?process.env.API_SERVER:"http://localhost:8000",
      homologacao: process.env.HOMOLOGACAO,
      locale: process.env.LOCALE ? process.env.LOCALE : 'pt-BR'
    },

    // temporario: apenas para liberar alguns dominios de teste para images externas (dev only)
    images: {
      domains: ['via.placeholder.com'],
    },
   
    serverRuntimeConfig: {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },

    async rewrites() {
      return [
        {
          source: '/localhost/api/:path*',
          destination: "http://localhost:8000/api/:path*",
   
        }
      ]
    }
  }
} 

