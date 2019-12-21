const dev = {
  STRIPE_KEY: "YOUR_STRIPE_DEV_PUBLIC_KEY",
  s3: {
    REGION: "us-east-2",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-17pjws5l5yw0u"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://oys23puxt2.execute-api.us-east-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_a3V2eypbo",
    APP_CLIENT_ID: "s7asnltbtr5600s1lrs1k6sg0",
    IDENTITY_POOL_ID: "us-east-2:fa697af4-5c32-47a5-859e-c8527d5f60b5"
  }
};

const prod = {
  STRIPE_KEY: "YOUR_STRIPE_PROD_PUBLIC_KEY",
  s3: {
    REGION: "us-east-2",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1ew6weva4f4vy"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://e08fu0wit0.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_o9YRR6Zzj",
    APP_CLIENT_ID: "40ttjop8s2cl0u6t6396jfan4a",
    IDENTITY_POOL_ID: "us-east-2:379f7e6e-977a-4d98-9a54-bf8253ddd709"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
