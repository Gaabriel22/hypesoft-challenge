using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Queries;

public class GetProductsQuery : IRequest<IEnumerable<ProductDto>>
{
    public string? NameFilter { get; set; }       // Filtro opcional por nome
    public Guid? CategoryIdFilter { get; set; }   // Filtro opcional por categoria
}
