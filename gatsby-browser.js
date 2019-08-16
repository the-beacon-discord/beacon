export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    'There is a newer version of the webpage. Reload?'
  )
  if (answer === true) {
    window.location.reload();
  }
}
