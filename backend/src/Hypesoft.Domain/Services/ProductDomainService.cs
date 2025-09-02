using Hypesoft.Domain.Entities;

namespace Hypesoft.Domain.Services;

public class ProductDomainServices
{
    public static bool IsStockLow(Product product)
    {
        if (product == null) throw new ArgumentNullException(nameof(product));
        return product.Quantity < 10;
    }
}