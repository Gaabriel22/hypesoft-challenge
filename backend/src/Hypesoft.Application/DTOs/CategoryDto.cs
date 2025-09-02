namespace Hypesoft.Application.DTOs;

public class CategoryDto
{
    public Guid Id { get; set; }  // ID da categoria
    public required string Name { get; set; }  // Nome da categoria
}