<h1 align="center">
    Anime List
</h1>

<p align="center">
    A static site where you can view a list of anime, view the details of a single anime and search for anime. It has 100% test coverage on all major React components. This site is deployed and can be accessed here: <a href="https://anime-list-vdy4.onrender.com/" target="_blank">Manga API</a>
</p>

### Installation & Setup:

Fork & clone the repo then install dependencies:

```
git clone https://github.com/<github username>/Anime-List.git
cd Anime-List
npm install
```

Create a .env.local file with the following variables:

```
touch .env.local
VITE_API_KEY=<your Rapid-Api key>
```

To run project type command:

```
npm run dev
```

### Run tests:

To run tests or view coverage the following commands are available:

```
npm run test
npm run coverage
```

### Technical Stack

- **React**: Runtime for JavaScript outside the browser, ideal for restful API's.
- **Vite**: Minimalist Node.js web framework used to run server.
- **Vitest**: Jest for JavaScript testing and Supertest for HTTP server testing.

Api from Rapid Api: [anime-db](https://rapidapi.com/brian.rofiq/api/anime-db)

**Enjoy!**
