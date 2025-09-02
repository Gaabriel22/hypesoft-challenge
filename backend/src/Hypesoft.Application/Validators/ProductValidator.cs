using FluentValidation;
using Hypesoft.Application.Commands;

namespace Hypesoft.Application.Validators;

public class ProductValidator : AbstractValidator<CreateProductCommand>
{
    public ProductValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("O nome do produto é obrigatório")
            .MaximumLength(100).WithMessage("O nome do produto deve ter no máximo 100 caracteres");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("A descrição é obrigatória")
            .MaximumLength(500).WithMessage("A descrição deve ter no máximo 500 caracteres");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("O preço deve ser maior que zero");

        RuleFor(x => x.Quantity)
            .GreaterThanOrEqualTo(0).WithMessage("A quantidade não pode ser negativa");

        RuleFor(x => x.CategoryId)
            .NotEmpty().WithMessage("A categoria é obrigatória");
    }
}

public class UpdateProductValidator : AbstractValidator<UpdateProductCommand>
{
    public UpdateProductValidator()
    {
        Include(new ProductValidator());
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("O ID do produto é obrigatório");
    }

    private void Include(ProductValidator productValidator)
    {
        throw new NotImplementedException();
    }
}
