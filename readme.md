![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![npm](https://img.shields.io/npm/v/@cascadiajs/discord-mirror)

<p align="center" >
  <img src="cjs-logo.png" alt="CascadiaJS Logo" width="200" />
</p>

# CascadiaJS Discord Mirror

A web component for displaying current activity within a Discord Channel.

## About

This component reads chat messages that are stored within a Firebase Realtime Database and displays them within a website. It's useful for building immersive audience experience during web based events.

> This repository only handles the display of messages that are already loaded to a Realtime Database. For an example of how to load messages from Discord into Firebase, see our Abbot based [Discord Bot](https://github.com/bniedermeyer/CascadiaJS-Discord-Mirror-Bot).

# Getting Started

## Firebase

This component fetches data from a Firebase Realtime Database. Data within your database should be within a `messages` collection in the following format:

```ts
export interface Message {
  /* The datetime the message was sent */
  created: string;
  /* The content of the message */
  text: string;
  /* The users nickname within the channel at the time the message was sent */
  username: string;
  /* Whether the message should be displayed in the component. 
  Useful for remove inappropriate content while preserving data about it being sent  */
  visible: boolean;
}
```

This isn't to say you can't add additional data to what's being stored, but these are the only values that this component currently interacts with.

Additionally, the component needs the url of the database to connect to. This can be supplied via the `url` prop

```tsx
<discord-mirror id="discord-mirror" url="<your database url>"></discord-mirror>
```

or by setting the value directly on the component object

```js
const mirror = document.getElementById('discord-mirror');
mirror.url = '<your database url>';
```

#### Authentication

It's a best practice to secure your database via authentication. This component supports [anonymous auth](https://firebase.google.com/docs/auth/web/anonymous-auth) with Firebase. To enable it first update the rule for the database so that it requires authentication to read data.

```json
{
  "rules": {
    ".read": "auth.uid != null"
  }
}
```

Then pass your Web API Key from your Firebase project settings to the `token` prop.

```tsx
<discord-mirror id="discord-mirror" url="<your database url>" token="<your web api key>"></discord-mirror>
```

Like with `url` you can also set this value directly.

```js
const mirror = document.getElementById('discord-mirror');
mirror.token = '<your web api key>';
```

> Note: per [Firebase documentation](https://firebase.google.com/docs/projects/api-keys), it's totally fine to use the Web API Key in a public setting. This only identifies your Firebase app and doesn't grant any additional permissions.

## Putting it all together

Once your Firebase realtime Database is setup and ready to be read, you can connect this component to it.

There are two strategies we recommend for using this component.

### Script tag

- Put a script tag similar to this in the head of your index.html

```html
<script type="module" src="https://unpkg.com/@cascadiajs/discord-mirror/dist/discord-mirror/discord-mirror.esm.js"></script>
```

- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules

- Run `npm install my-component --save`
- Put a script tag similar to this `<script src='node_modules/my-component/dist/my-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

After you have setup the script tag, add the component to your template, JSX, html, etc...

```jsx
<discord-mirror id="discord" url="<your url>" token="<your token>"></discord-mirror>
```

> View an demo setup [here](https://codesandbox.io/s/cjs-discord-demo-q66yo?file=/index.html).

# Contributing

The CascadiaJS [code of conduct](https://2021.cascadiajs.com/code-of-conduct) applies to all particpants contributing to this repository.

## Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.
To start building a new web component using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/ionic-team/stencil-component-starter.git my-component
cd my-component
git remote rm origin
```

and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

Need help? Check out Stencil docs [here](https://stenciljs.com/docs/my-first-component).

## Commits

Please keep commit messages formatted in the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard. We use commit messages to determine the release and generate changelog via [semantic release](https://semantic-release.gitbook.io/semantic-release/). For ease of use this repo is setup to work with [https://commitizen.github.io/cz-cli/](commitizen). Run `npx cz` or `npm run commit` to invoke commitizen and have it walk you though building the commit message.
