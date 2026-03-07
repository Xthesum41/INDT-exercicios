const { getUser } = require("../src/service");

describe("getUser", () => {
  test("chama apiClient.get com a URL correta e retorna data", async () => {
    const apiClient = {
      get: jest.fn().mockResolvedValue({ data: { id: 7, name: "Ana" } }),
    };

    const result = await getUser(apiClient, 7);

    expect(apiClient.get).toHaveBeenCalledTimes(1);
    expect(apiClient.get).toHaveBeenCalledWith("/users/7");
    expect(result).toEqual({ id: 7, name: "Ana" });
  });

  test("propaga erro quando apiClient.get rejeita", async () => {
    const apiClient = {
      get: jest.fn().mockRejectedValue(new Error("NETWORK")),
    };

    await expect(getUser(apiClient, 1)).rejects.toThrow("NETWORK");
    expect(apiClient.get).toHaveBeenCalledWith("/users/1");
  });
});
