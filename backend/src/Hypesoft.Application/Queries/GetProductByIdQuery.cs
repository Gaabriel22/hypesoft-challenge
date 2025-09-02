using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Queries;

public class GetProductByIdQuery : IRequest<ProductDto>
{
    public Guid Id { get; set; }

    public GetProductByIdQuery(Guid id)
    {
        Id = id;
    }
}
