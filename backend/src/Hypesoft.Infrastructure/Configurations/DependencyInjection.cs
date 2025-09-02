using Hypesoft.Application.Handlers;
using Hypesoft.Domain.Repositories;
using Hypesoft.Infrastructure.Data;
using Hypesoft.Infrastructure.Repositories;
using Hypesoft.Infrastructure.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Hypesoft.Infrastructure.Configurations;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        // DbContext
        services.AddScoped<ApplicationDbContext>();

        // Repositories
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();

        // Services externos
        services.AddScoped<KeycloakService>();

        // MediatR - procura Handlers no assembly de Application
        services.AddMediatR(Assembly.GetAssembly(typeof(ProductHandlers))!);

        return services;
    }
}
