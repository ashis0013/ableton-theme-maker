import express, { Express, Request, Response } from 'express'
import { join, resolve } from 'path';
import { editTheme } from './themeWriter';

const app: Express = express()
const port = process.env.PORT || 3001

app.get('/theme', (req: Request, res: Response) => {
  editTheme(req.query['bg']?.toString() ?? '', req.query['button']?.toString() ?? '')
  res.download(join(__dirname, '../res/Custom.ask'))
})

app.get('*', (_, res: Response) => {
  res.sendFile(resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
