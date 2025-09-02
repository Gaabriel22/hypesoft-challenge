namespace Hypesoft.Domain.ValueObjects;

public class Price
{
    public decimal Amount { get; private set; }

    public Price(decimal amount)
    {
        if (amount < 0)
            throw new ArgumentException("Price cannot be negative.");

        Amount = amount;
    }

    public Price Add(Price other)
    {
        return new Price(this.Amount + other.Amount);
    }

    public Price Subtract(Price other)
    {
        var result = this.Amount - other.Amount;
        if (result < 0)
            throw new InvalidOperationException("Resulting price cannot be negative.");
        return new Price(result);
    }

    public override bool Equals(object? obj)
    {
        if (obj is Price other)
            return Amount == other.Amount;
        return false;
    }

    public override int GetHashCode() => Amount.GetHashCode();
}