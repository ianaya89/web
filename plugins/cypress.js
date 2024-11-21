export default ({ app }) => {
  if (window.Cypress) {
    app.$toast.options.duration = 500
    window.__app__ = app
  }
}
