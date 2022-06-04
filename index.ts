import express, { Express, Request, Response } from 'express'
import { join } from 'path';
import { editTheme } from './themeWriter';

const app: Express = express()
const port = process.env.PORT || 3001

app.get('/', (req: Request, res: Response) => {
  res.json({message: 'Use /theme endpoint to create custom Ableton Themes'});
});

app.get('/theme', (req: Request, res: Response) => {
  editTheme(req.query['bg']?.toString() ?? '', req.query['button']?.toString() ?? '')
  res.download(join(__dirname, '../res/Custom.ask'))
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
