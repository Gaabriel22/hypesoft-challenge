using Hypesoft.Application.DTOs;

namespace Hypesoft.Application.Interfaces;

public interface IProductService
{
    Task<ProductDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<ProductDto>> GetAllAsync();
    Task<IEnumerable<ProductDto>> GetByNameAsync(string name);
    Task CreateAsync(ProductDto dto);
    Task UpdateAsync(ProductDto dto);
    Task DeleteAsync(Guid id);
}
