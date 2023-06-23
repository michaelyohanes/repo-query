# Github query tool

## Requirements
- Docker Desktop 4.x.x


## Installation
- `git clone https://gitlab.com/michaelyohanes/repo-query.git`
- `docker-compose build`
- `docker-compose up -d`

   Site will be accessible on http://localhost:3000


## Notes
| #  | Notes                                                                                                            |
|----|------------------------------------------------------------------------------------------------------------------|
| 1  | Uses docker imaeg LTS node 18                                                                                    |
| 2  | No fancy db, nginx, etc just plain express and react                                                             |
| 3  | Uses React 18, webpack 5, express 4.18, material UI scss                                                         |
| 4  | Only minimum SSR feature of React 18 used, as not particular routes, SEO, etc that require more intensive usage  |
| 5  | Github user search engine utilizes [Algolia](https://www.algolia.com/). (AI powered search engine)               |
| 6  | RestAPI only used for querying the repository from user, tho can actually use algolia too                        |
| 7  | No submit button needed, as using "search as you type" method                                                    |
| 8  | No fancy effect or UI, as focuses on prototyping                                                                 |

