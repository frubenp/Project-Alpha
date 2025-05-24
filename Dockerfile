# Build stage for backend (F# Giraffe)
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-backend
WORKDIR /app
COPY ./backend ./backend
WORKDIR /app/backend
RUN dotnet publish -c Release -o /out

# Build stage for frontend (Next.js)
FROM node:18-alpine AS build-frontend
WORKDIR /app
COPY ./frontend ./frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
COPY --from=build-backend /out ./
COPY --from=build-frontend /app/frontend/.next ./wwwroot
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "Backend.dll"]