export const openHubspotChat = () => {
  if (window.HubSpotConversations) {
    window.HubSpotConversations.widget.open()
  }
}
