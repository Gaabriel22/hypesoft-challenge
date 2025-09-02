using Hypesoft.Application.DTOs;
using Hypesoft.Application.Commands;
using Hypesoft.Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Hypesoft.API.Controllers;

internal class DeleteCategoryCommand : IRequest<object>
{
    private Guid id;

    public DeleteCategoryCommand(Guid id)
    {
        this.id = id;
    }
}

internal class UpdateCategoryCommand : IRequest<object>
{
    private CategoryDto dto;

    public UpdateCategoryCommand(CategoryDto dto)
    {
        this.dto = dto;
    }
}

internal class CreateCategoryCommand : IRequest<object>
{
    private CategoryDto dto;

    public CreateCategoryCommand(CategoryDto dto)
    {
        this.dto = dto;
    }
}

internal class GetCategoryByIdQuery : IRequest<object>
{
    private Guid id;

    public GetCategoryByIdQuery(Guid id)
    {
        this.id = id;
    }
}

internal class GetCategoriesQuery : IRequest<object>
{
}

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly IMediator _mediator;

    public CategoriesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    // GET: /api/categories
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll()
    {
        var query = new GetCategoriesQuery();
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    // GET: /api/categories/{id}
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<CategoryDto>> GetById(Guid id)
    {
        var query = new GetCategoryByIdQuery(id);
        var result = await _mediator.Send(query);
        if (result == null) return NotFound();
        return Ok(result);
    }

    // POST: /api/categories
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CategoryDto dto)
    {
        var command = new CreateCategoryCommand(dto);
        await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id = dto.Id }, dto);
    }

    // PUT: /api/categories/{id}
    [HttpPut("{id:guid}")]
    public async Task<ActionResult> Update(Guid id, [FromBody] CategoryDto dto)
    {
        if (id != dto.Id) return BadRequest("ID mismatch");

        var command = new UpdateCategoryCommand(dto);
        await _mediator.Send(command);
        return NoContent();
    }

    // DELETE: /api/categories/{id}
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var command = new DeleteCategoryCommand(id);
        await _mediator.Send(command);
        return NoContent();
    }
}
