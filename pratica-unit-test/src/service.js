async function getUser(apiClient, id) {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
}

module.exports = { getUser };
