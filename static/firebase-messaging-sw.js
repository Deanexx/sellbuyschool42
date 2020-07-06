
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyDRV3JoacIOFK4T7HQrZu4t5TaP3u30Jtw","authDomain":"sellbuyschool42.firebaseapp.com","databaseURL":"https:\u002F\u002Fsellbuyschool42.firebaseio.com","projectId":"sellbuyschool42","storageBucket":"sellbuyschool42.appspot.com","messagingSenderId":"372751462960","appId":"1:372751462960:web:4f13fdb715eb530fc733f5","measurementId":"G-8L12WKM790"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"goToUrl","url":"https:\u002F\u002Fgithub.com\u002Flupas"}]
  const action = actions.find(x => x.id === e.action.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})
