const { isValidEmail, requireMinLength } = require("../src/validate");

describe("isValidEmail", () => {
  test("retorna false para entradas que nao sao string", () => {
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
    expect(isValidEmail(123)).toBe(false);
    expect(isValidEmail({})).toBe(false);
  });

  test("retorna false para formatos de email invalidos", () => {
    expect(isValidEmail("plainaddress")).toBe(false);
    expect(isValidEmail("missing@domain")).toBe(false);
    expect(isValidEmail("missing.domain@")).toBe(false);
    expect(isValidEmail("with space@domain.com")).toBe(false);
    expect(isValidEmail("user@domain")).toBe(false);
  });

  test("retorna true para emails validos", () => {
    expect(isValidEmail("user@domain.com")).toBe(true);
    expect(isValidEmail("first.last@sub.domain.io")).toBe(true);
  });
});

describe("requireMinLength", () => {
  test("dispara INVALID_TYPE para valores que nao sao string", () => {
    expect(() => requireMinLength(10, 2)).toThrow("INVALID_TYPE");
    expect(() => requireMinLength(null, 2)).toThrow("INVALID_TYPE");
  });

  test("dispara MIN_LENGTH quando o valor e menor que o minimo", () => {
    expect(() => requireMinLength("a", 2)).toThrow("MIN_LENGTH");
    expect(() => requireMinLength("", 1)).toThrow("MIN_LENGTH");
  });

  test("retorna true quando o tamanho atende ou excede o minimo", () => {
    expect(requireMinLength("ab", 2)).toBe(true);
    expect(requireMinLength("abcd", 3)).toBe(true);
  });
});
