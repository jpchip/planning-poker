# Planning Poker &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/jpchip/planning-poker/blob/master/LICENSE)
> Dead simple planning poker implementation

I wanted an excuse to tinker with Svelte, Snowpack, .NET 6.0, and SignalR. So here is the most basic implementation of a planning poker site. 

## Installing / Getting started

If you just want to see it working locally, spin it up like:

```shell
npm install
npm run build
dotnet restore && dotnet watch run --no-launch-profile
```
Visit site at http://localhost:5000. You can pre-select a room by passing ?room=whatevs in the url.

## Developing

### Built With
Built with Svelte and dotnet 6.0

### Prerequisites
For local development, NodeJS and Dotnet 6.0 SDK are required.


### Setting up Dev

```shell
git clone https://github.com/jpchip/planning-poker.git
```

Spin up dotnet:

```shell
dotnet restore && dotnet watch run --no-launch-profile
```

Compile frontend:

```shell
npm install
npm start
```

Visit site at http://localhost:5000

### Building

Both the front end and back end are watched for changes, code will be re-compiled as you work.

### Deploying / Publishing

Currently the site is deployed to Heroku. You could easily deploy to your own Heroku site or build and deploy the docker image.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags](https://github.com/jpchip/planning-poker/tags).


## Tests

No tests (yet!)

## Api Reference

See `PokerHub.cs` for available SignalR endpoints.

## Licensing

MIT License
