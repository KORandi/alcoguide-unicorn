export function setFailedRequest(res) {
  return res.status(400).json({ success: false });
}

export function setSuccessfulRequest(res, data) {
  return res.status(200).json({ success: true, data });
}
