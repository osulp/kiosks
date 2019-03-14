export const trackClicked = (google_analytics, label) => {
  if (typeof google_analytics != "undefined") {
    google_analytics("send", "event", "PatronUse", "click", label)
  }
}
