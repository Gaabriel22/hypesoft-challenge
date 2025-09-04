# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar todos os projetos
COPY Hypesoft.Domain/Hypesoft.Domain.csproj ./Hypesoft.Domain/
COPY Hypesoft.Application/Hypesoft.Application.csproj ./Hypesoft.Application/
COPY Hypesoft.Infrastructure/Hypesoft.Infrastructure.csproj ./Hypesoft.Infrastructure/
COPY Hypesoft.API/Hypesoft.API.csproj ./Hypesoft.API/

# Restaurar dependências
RUN dotnet restore Hypesoft.API/Hypesoft.API.csproj

# Copiar todo o código
COPY . .

# Build e publish
RUN dotnet publish Hypesoft.API/Hypesoft.API.csproj -c Release -o /app/publish

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Hypesoft.API.dll"]
