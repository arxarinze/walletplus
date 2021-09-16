export default {
    port: process.env.PORT ?? 10000,
    secret: process.env.JSON_PRIVATE_KEY || 'PLEASE MAKE SURE YOU SET THESE IN YOUR .ENV AND MAKE SURE NOT TO PUSH A LIVE .ENV TO GIT SOURCE'
}