const asyncHandler = (fnAction) => (req, res, next) => {
  Promise.resolve(fnAction(req, res, next)).catch(next);
};

module.exports = asyncHandler;
