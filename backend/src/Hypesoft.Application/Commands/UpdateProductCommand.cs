using Hypesoft.Application.DTOs;
using MediatR;

namespace Hypesoft.Application.Commands;

public class UpdateProductCommand : IRequest<Unit>
{
    public Guid Id { get; set; }           // ID do produto a ser atualizado
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public Guid CategoryId { get; set; }

    public UpdateProductCommand() { }

    public UpdateProductCommand(ProductDto dto)
    {
        Id = dto.Id;
        Name = dto.Name;
        Description = dto.Description;
        Price = dto.Price;
        Quantity = dto.Quantity;
        CategoryId = dto.CategoryId;
    }
}
