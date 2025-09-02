using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Commands;

public class CreateProductCommand : IRequest<Guid>
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public Guid CategoryId { get; set; }

    public CreateProductCommand() { }

    public CreateProductCommand(ProductDto dto)
    {
        Name = dto.Name;
        Description = dto.Description;
        Price = dto.Price;
        Quantity = dto.Quantity;
        CategoryId = dto.CategoryId;
    }
}
