function validateParameters(map_parameters) {
  if (!map_parameters || map_parameters.size === 0) {
    throw new Error("No parameters found in sheet");
  }
}
