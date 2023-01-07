<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/lvkdotsh/redeez/raw/master/public/redeez_white.webp" />
    <img alt="redeez" src="https://github.com/v3xlabs/redeez/raw/master/public/redeez_black.webp" width="400px" />
  </picture>
</p>

<p align="center">
<img src="https://img.shields.io/bundlephobia/min/redeez.svg" />
<img src="https://img.shields.io/badge/coverage-100%25-brightgreen.svg" />
<img src="https://img.shields.io/github/languages/top/v3xlabs/redeez" />
<img src="https://img.shields.io/badge/dependencies-0-brightgreen.svg" />
<img src="https://img.shields.io/npm/dt/redeez" />
</p>

---

A simplified general-purpose queueing system for node apps.

## Table of Contents

-   [Table of Contents](#table-of-contents)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Documentation](#documentation)
    -   [Handling Tasks](#handling-tasks)
-   [Contributors](#contributors)
-   [LICENSE](#license)

## Installation

Using `npm`:

```sh
npm install redeez redis
```

or if you prefer to use the `yarn` package manager:

```sh
yarn add redeez redis
```

or if you prefer to use the `pnpm` package manager:

```sh
pnpm add redeez redis
```

## Documentation

### Handling Tasks

```ts
import { handleTasks } from 'redeez';

// Do your pre-configuration here, connect to your favourite database etc.
const redis = new RedisClient();

// And handle tasks
handleTasks(redis, {
    resizeAvatar: {
        queue: 'avatars:resize',
        handler: async ({ avatar }) => {
            // Your code here
        },
    },
    resizeImage: {
        queue: 'images:resize',
        handler: async ({ image }) => {
            // Your code here
        },
    },
});
```

## Contributors

[![](https://contrib.rocks/image?repo=v3xlabs/redeez)](https://github.com/v3xlabs/redeez/graphs/contributors)

## LICENSE

This package is licensed under the [GNU Lesser General Public License](https://www.gnu.org/licenses/lgpl-3.0).
