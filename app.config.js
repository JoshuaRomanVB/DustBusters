import 'dotenv/config';


export default
{
  "expo": {
    "name": "DustBuster",
    "slug": "dustbusters",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/logoapp.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff",
       
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    android: {
      "package": "com.uteq.dustbusters",// Agrega aquí el identificador del paquete
      versionCode: 1,
    },
    extra: {
   
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      baseUrl: process.env.BASE_URL,
      "eas":{
        "projectId": "c705e07d-b0a6-4ef7-a966-7f8227a80621"
      },
    }
  }
}
