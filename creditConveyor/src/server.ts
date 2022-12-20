import app from './app.js';

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'production';
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${ENV} environment`);
});
