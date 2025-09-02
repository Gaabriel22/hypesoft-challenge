using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Repositories;

public interface ICategoryRepository
{
    Task<Category?> GetByIdAsync(Guid id);
    Task<IEnumerable<Category>> GetAllAsync();
    Task CreateAsync(Category category);
    Task UpdateAsync(Category category);
    Task DeleteAsync(Guid id);
}
