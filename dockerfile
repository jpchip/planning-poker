FROM node:lts AS nodejs-builder
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS dotnet-builder
COPY ./PlanningPoker /PlanningPoker
COPY --from=nodejs-builder /app/PlanningPoker/wwwroot/ /PlanningPoker/wwwroot
WORKDIR /PlanningPoker
RUN dotnet publish -c Release

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS release
RUN mkdir /service
COPY --from=dotnet-builder /PlanningPoker/bin/Release/net5.0/publish /service
WORKDIR /service
EXPOSE 80
CMD [ "dotnet", "PlanningPoker.dll" ]
