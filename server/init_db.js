const admin = require('firebase-admin');
const dotenv = require('dotenv').config();

const params = {
  type: process.env.type,
  projectId: process.env.project_id,
  privateKeyId: process.env.private_key_id,
  privateKey: process.env.private_key.replace(/\\n/g, '\n'),
  clientEmail: process.env.client_email,
  clientId: process.env.client_id,
  authUri: process.env.auth_uri,
  tokenUri: process.env.token_uri,
  authProviderX509CertUrl: process.env.auth_provider_x509_cert_url,
  clientC509CertUrl: process.env.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(params),
});

const db = admin.firestore();

module.exports = db;
