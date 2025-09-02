namespace Hypesoft.Application.DTOs;

public class ProductDto
{
    public Guid Id { get; set; }  // ID do produto
    public required string Name { get; set; }  // Nome
    public required string Description { get; set; }  // Descrição
    public decimal Price { get; set; }  // Preço (para API, converte Price -> decimal)
    public int Quantity { get; set; }  // Quantidade em estoque
    public Guid CategoryId { get; set; }  // Categoria associada
    public string? CategoryName { get; set; }  // Nome da categoria (opcional)
}