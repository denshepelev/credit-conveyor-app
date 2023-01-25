import app from './app.js';

const PORT = process.env.PORT || 3006;
const ENV = process.env.NODE_ENV || 'production';
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} in ${ENV} environment`);
});