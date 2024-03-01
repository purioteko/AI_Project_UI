import io from "socket.io-client";
const URL = process.env.REACT_APP_SOCKET_URL || "https://YOUR_WEBSITE_HERE";

const defaultListeners = [
  {
    message: "connect",
    action: () => {
      console.log("connected");
    },
  },
];

let socket;
let mappedListenerComponents = [];

const initSocket = () => {
  if (socket) {
    return;
  }
  socket = io(URL);

  defaultListeners.forEach((listener) => {
    socket.on(listener.message, listener.action);
  });
};

const enrollListeners = (listeners, component) => {
  const listenersAreMapped = mappedListenerComponents.find(
    (listenerComponent) => listenerComponent === component
  );
  if (listenersAreMapped) {
    return;
  }

  listeners.forEach((listener) => {
    socket.on(listener.message, listener.action);
  });

  mappedListenerComponents.push(component);
};

const getSocketInterface = (listeners, component) => {
  initSocket();
  enrollListeners(listeners, component);

  return socket;
};

export default getSocketInterface;
