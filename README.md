# Planning Poker
> Simple planning poker site

Planning poker site built as an excuse to play around with signalR and snowpack

## Installing / Getting started

Spin up dotnet:

```shell
docker-compose up
```

Compile frontend:

```shell
npm install
npm run build
```

Vist site at localhost:8080

## Production Build

```shell
docker build -t planning-poker -f dockerfile .
docker run -dp 80:8080 planning-poker
```

Vist site at localhost:80