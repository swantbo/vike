import app from './app';
import config from './config';

app.listen(config.port, async () => {
  console.log(`server listing on http://localhost:${config.port}/`);
});
