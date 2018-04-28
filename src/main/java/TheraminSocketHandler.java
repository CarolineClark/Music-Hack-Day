import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;


@WebSocket
public class TheraminSocketHandler {
    private String sender, msg;

    @OnWebSocketConnect
    public void onConnect(Session user) throws Exception {
        String username = "User" + Theramin.nextUserNumber++;
        Theramin.userUsernameMap.put(user, username);
        Theramin.broadcastMessage(sender = Theramin.userUsernameMap.get(user), msg = "", "newuser");
    }

    @OnWebSocketClose
    public void onClose(Session user, int statusCode, String reason) {
        String username = Theramin.userUsernameMap.get(user);
        Theramin.userUsernameMap.remove(user);
        Theramin.broadcastMessage(sender = username, msg = "", "deleteuser");
    }

    @OnWebSocketMessage
    public void onMessage(Session user, String message) {
        Theramin.broadcastMessage(sender = Theramin.userUsernameMap.get(user), msg = message, "music");
    }
}
