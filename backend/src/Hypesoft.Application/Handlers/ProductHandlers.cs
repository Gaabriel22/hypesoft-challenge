using Hypesoft.Domain.Entities;
using Hypesoft.Domain.Repositories;
using Hypesoft.Application.DTOs;
using MediatR;
using AutoMapper;
using Hypesoft.Application.Commands;
using Hypesoft.Application.Queries;

namespace Hypesoft.Application.Handlers;

public class ProductHandlers :
    IRequestHandler<CreateProductCommand, Unit>,
    IRequestHandler<UpdateProductCommand, Unit>,
    IRequestHandler<DeleteProductCommand, Unit>,
    IRequestHandler<GetProductsQuery, IEnumerable<ProductDto>>,
    IRequestHandler<GetProductByIdQuery, ProductDto?>
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public ProductHandlers(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository,
        IMapper mapper)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
        _mapper = mapper;
    }

    // ====================
    // Commands
    // ====================
    public async Task<Unit> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Product(
            request.Name,
            request.Description,
            request.Price,
            request.Quantity,
            request.CategoryId
        );

        await _productRepository.CreateAsync(product);
        return Unit.Value;
    }

    public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.Id);
        if (product == null) throw new Exception("Product not found");

        product.UpdateDetails(
            request.Name,
            request.Description,
            request.Price,
            request.CategoryId
        );

        await _productRepository.UpdateAsync(product);
        return Unit.Value;
    }

    public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        await _productRepository.DeleteAsync(request.Id);
        return Unit.Value;
    }

    // ====================
    // Queries
    // ====================
    public async Task<IEnumerable<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<Product> products;

        if (!string.IsNullOrEmpty(request.NameFilter))
            products = await _productRepository.GetByNameAsync(request.NameFilter);
        else
            products = await _productRepository.GetAllAsync();

        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }

    public async Task<ProductDto?> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.Id);
        if (product == null) return null;

        return _mapper.Map<ProductDto>(product);
    }
}
