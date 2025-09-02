using System.Net.Http.Headers;
using System.Text.Json;

namespace Hypesoft.Infrastructure.Services;

public class KeycloakService
{
    private readonly HttpClient _httpClient;
    private readonly string _realmUrl; // URL do Keycloak Realm

    public KeycloakService(HttpClient httpClient, string realmUrl)
    {
        _httpClient = httpClient;
        _realmUrl = realmUrl;
    }

    // Exemplo: valida token e retorna se é válido
    public async Task<bool> ValidateTokenAsync(string token)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, $"{_realmUrl}/protocol/openid-connect/userinfo");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await _httpClient.SendAsync(request);
        return response.IsSuccessStatusCode;
    }

    // Exemplo: pega roles do usuário
    public async Task<IEnumerable<string>> GetUserRolesAsync(string token)
    {
        var request = new HttpRequestMessage(HttpMethod.Get, $"{_realmUrl}/protocol/openid-connect/userinfo");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await _httpClient.SendAsync(request);
        if (!response.IsSuccessStatusCode)
            return Array.Empty<string>();

        var json = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);
        if (doc.RootElement.TryGetProperty("roles", out var rolesElement) && rolesElement.ValueKind == JsonValueKind.Array)
        {
            return rolesElement.EnumerateArray().Select(r => r.GetString()!).ToList();
        }

        return Array.Empty<string>();
    }
}
